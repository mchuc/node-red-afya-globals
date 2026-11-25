'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { createRED, sleep } = require('./helper');
const globals = require('../globals.js');

function setup(config) {
  const RED = createRED();
  globals(RED);
  const node = RED.create('AFYA-globals', config);
  return { RED, node };
}

test('convert: types', () => {
  const clone = (v) => structuredClone(v);
  assert.equal(globals.convert('str', 42, clone), '42');
  assert.equal(globals.convert('str', { a: 1 }, clone), '{"a":1}');
  assert.equal(globals.convert('int', '3,7', clone), 3);
  assert.equal(globals.convert('int', 3.7, clone), 3);
  assert.equal(globals.convert('float', ' 21,5 ', clone), 21.5);
  assert.equal(globals.convert('float', 2, clone), 2);
  assert.equal(globals.convert('bool', '+', clone), true);
  assert.equal(globals.convert('bool', 'FALSE', clone), false);
  assert.equal(globals.convert('bool', 1, clone), true);
  assert.equal(globals.convert('bool', true, clone), true);
  assert.deepEqual(globals.convert('JSON', '{"a":[1,2]}', clone), { a: [1, 2] });
  assert.deepEqual(globals.convert('JSON', { a: 1 }, clone), { a: 1 });
  assert.deepEqual(globals.convert('undefined', [1], clone), [1]);
  assert.throws(() => globals.convert('float', 'abc', clone), /not a number/);
  assert.throws(() => globals.convert('int', '', clone), /not a number/);
  assert.throws(() => globals.convert('bool', 'maybe', clone), /wrong boolean/);
  assert.throws(() => globals.convert('JSON', '{bad', clone));
});

test('deploy: sets a typed global variable', () => {
  const { RED, node } = setup({
    globalVariableName: 'pi',
    globalVariableScope: 'global',
    globalVariableType: 'float',
    globalVariableValue: '3,14',
  });
  assert.equal(RED.context.global.get('pi'), 3.14);
  assert.equal(node.lastStatus().fill, 'green');
  assert.match(node.lastStatus().text, /global\.pi = 3\.14/);
});

test('deploy: flow scope and a named context store', () => {
  const { RED } = setup({
    globalVariableName: '#:(file)::config',
    globalVariableScope: 'flow',
    globalVariableType: 'JSON',
    globalVariableValue: '{"on":true}',
  });
  assert.deepEqual(RED.context.flow.get('config', 'file'), { on: true });
  assert.equal(RED.context.global.get('config', 'file'), undefined);
});

test('type "undefined": nothing set on deploy, value comes from msg.payload', async () => {
  const { RED, node } = setup({ globalVariableName: 'x', globalVariableScope: 'global', globalVariableType: 'undefined' });
  assert.equal(RED.context.global.get('x'), undefined);
  assert.equal(node.lastStatus().fill, 'grey');

  const payload = { deep: { a: 1 } };
  const { error } = await node.receive({ payload, topic: 't' });
  assert.equal(error, undefined);
  assert.deepEqual(RED.context.global.get('x'), payload);
  assert.notEqual(RED.context.global.get('x'), payload); // stored as a copy
  assert.equal(node.sent[0].topic, 't');
});

test('input: plain values are converted, errors go to done(err)', async () => {
  const { RED, node } = setup({
    globalVariableName: 'temp',
    globalVariableScope: 'global',
    globalVariableType: 'float',
    globalVariableValue: '20',
  });
  let r = await node.receive({ payload: '21,5' });
  assert.equal(r.error, undefined);
  assert.equal(RED.context.global.get('temp'), 21.5);
  assert.equal(node.sent.at(-1).payload, 21.5);

  r = await node.receive({ payload: 'warm' });
  assert.match(r.error.message, /not a number/);
  assert.equal(RED.context.global.get('temp'), 21.5); // unchanged
  assert.equal(node.lastStatus().fill, 'red');
  assert.equal(node.sent.length, 1);
});

test('emit on init sends the stored value', async () => {
  const { node } = setup({
    globalVariableName: 'answer',
    globalVariableScope: 'global',
    globalVariableType: 'int',
    globalVariableValue: '42',
    globalEmitOnInit: true,
  });
  await sleep(150);
  assert.equal(node.sent.length, 1);
  assert.equal(node.sent[0].payload, 42);
  assert.equal(node.sent[0].topic, 'global.answer');
  await node.close();
});

test('missing variable name → red status and error on input', async () => {
  const { node } = setup({ globalVariableName: '', globalVariableType: 'str', globalVariableValue: 'a' });
  assert.equal(node.lastStatus().fill, 'red');
  const { error } = await node.receive({ payload: 1 });
  assert.match(error.message, /variable name is empty/);
});
