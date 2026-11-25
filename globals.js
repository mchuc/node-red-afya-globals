/**
 * AFYA Globals – set a typed flow/global context variable.
 * (C) 2024–2026 Marcin Chuć · MIT
 */
'use strict';

const TYPES = ['str', 'int', 'float', 'bool', 'JSON', 'undefined'];

/** "12:03:07" – short time for the node status. */
function hhmmss(d = new Date()) {
  return [d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, '0')).join(':');
}

/** Short, single-line preview of a value for the status / label. */
function preview(value, max = 32) {
  let txt;
  if (value === undefined) txt = 'undefined';
  else if (typeof value === 'string') txt = JSON.stringify(value);
  else {
    try {
      txt = JSON.stringify(value);
    } catch (_) {
      txt = String(value);
    }
  }
  return txt.length > max ? txt.slice(0, max - 1) + '…' : txt;
}

function toNumber(value) {
  if (typeof value === 'number') return value;
  if (typeof value === 'boolean') return value ? 1 : 0;
  const txt = String(value).trim().replace(/,/g, '.');
  const num = txt === '' ? NaN : Number(txt);
  if (Number.isNaN(num)) throw new Error(`"${value}" is not a number`);
  return num;
}

/**
 * Converts a value to the configured type.
 * Objects/arrays are kept as they are (deep copy) – only plain values are converted.
 */
function convert(type, value, clone) {
  const plain = value === null || ['string', 'number', 'boolean'].includes(typeof value);
  switch (type) {
    case 'str':
      if (plain) return value === null ? '' : String(value);
      return JSON.stringify(value);
    case 'int':
      return Math.floor(toNumber(value));
    case 'float':
      return toNumber(value);
    case 'bool':
      if (typeof value === 'boolean') return value;
      if (typeof value === 'number') return Math.floor(value) === 1;
      if (typeof value === 'string') {
        const v = value.trim().toLowerCase();
        if (['true', '1', '+'].includes(v)) return true;
        if (['false', '0', '-'].includes(v)) return false;
      }
      throw new Error(`wrong boolean value "${value}" – use true/false, 1/0 or +/-`);
    case 'JSON':
      if (typeof value === 'string') return JSON.parse(value);
      return clone(value);
    case 'undefined':
    case undefined:
    case '':
      return clone(value);
    default:
      throw new Error(`unsupported variable type: ${type}`);
  }
}

module.exports = function (RED) {
  function AFYAGlobalsNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    const clone = (v) => (v === undefined ? undefined : RED.util.cloneMessage(v));

    const scope = config.globalVariableScope === 'flow' ? 'flow' : 'global';
    const type = TYPES.includes(config.globalVariableType) ? config.globalVariableType : 'undefined';
    const { key, store } = RED.util.parseContextStore(String(config.globalVariableName || '').trim());
    const ctx = () => node.context()[scope];
    const fullName = `${scope}.${key}`;
    let emitTimer = null;

    const ok = (value) =>
      node.status({ fill: 'green', shape: 'dot', text: `${fullName} = ${preview(value)} · ${hhmmss()}` });
    const fail = (err) => node.status({ fill: 'red', shape: 'ring', text: `${err.message} · ${hhmmss()}` });

    if (!key) {
      node.status({ fill: 'red', shape: 'ring', text: 'set the variable name' });
      node.on('input', (msg, send, done) => done(new Error('AFYA globals: variable name is empty')));
      return;
    }

    // initialisation (on start / deploy)
    if (type === 'undefined') {
      node.status({ fill: 'grey', shape: 'ring', text: `${fullName} – waiting for msg.payload` });
    } else {
      try {
        const value = convert(type, config.globalVariableValue, clone);
        ctx().set(key, value, store);
        ok(value);
      } catch (err) {
        fail(err);
        node.error(`${fullName}: ${err.message}`);
      }
    }

    if (config.globalEmitOnInit) {
      emitTimer = setTimeout(() => {
        emitTimer = null;
        node.send({ payload: clone(ctx().get(key, store)), topic: fullName });
      }, 100);
    }

    // every message sets a new value
    node.on('input', (msg, send, done) => {
      try {
        const value = convert(type, msg.payload, clone);
        ctx().set(key, value, store);
        ok(value);
        msg.payload = clone(value);
        send(msg);
        done();
      } catch (err) {
        fail(err);
        done(err);
      }
    });

    node.on('close', () => {
      if (emitTimer) clearTimeout(emitTimer);
    });
  }

  RED.nodes.registerType('AFYA-globals', AFYAGlobalsNode);
};

module.exports.convert = convert;
