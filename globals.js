module.exports = function (RED) {
    function AFYAGlobalsNode(config) {

        RED.nodes.createNode(this, config);
        var node = this;
        const variableType = config.globalVariableType;
        const variableName = config.globalVariableName;
        const variableValue = config.globalVariableValue;
        const variableScope = config.globalVariableScope;
        //initialize
        setVariable(node, variableScope, variableType, variableName, variableValue)


        // onMessage
        node.on('input', function (in_msg) {
            try {
                const value = in_msg.payload;
                let _variableType;
                let msg = {};
                msg.payload = in_msg.payload;

                if (value instanceof String) {
                    _variableType = 'str';
                } else if (value instanceof Number) {
                    _variableType = Number.isInteger(num) ? 'int' : 'float';
                } else if (value instanceof Boolean) {
                    _variableType = 'bool';
                } else {
                    _variableType = 'JSON'
                }
                setVariable(node, variableScope, _variableType, variableName, value)
                node.status(genOKStatus(`data changed to: ${value}`));
                node.send(msg);
            } catch (err) {
                node.status(genERRStatus(`data error: ${err.message}`));
            }
        });


    }

    RED.nodes.registerType("AFYA-globals", AFYAGlobalsNode);
}

function genOKStatus(txt) {
    return {
        fill: "green",
        shape: "dot",
        text: getCurrDateTime() + ` OK ${txt}`
    };
}

function genERRStatus(txt) {
    return {
        fill: "red",
        shape: "dot",
        text: getCurrDateTime() + ` ERR ${txt}`
    };
}

function getCurrDateTime() {
    const d = new Date();
    return [
        d.getFullYear(),
        String(d.getMonth() + 1).padStart(2, '0'),
        String(d.getDate()).padStart(2, '0')
    ].join('/') + ' ' + [
        String(d.getHours()).padStart(2, '0'),
        String(d.getMinutes()).padStart(2, '0'),
        String(d.getSeconds()).padStart(2, '0')
    ].join(':');
}

function setVariable(node, variableScope, variableType, variableName, variableValue) {
    if (variableType === 'undefined') {
        node.status(genOKStatus("not initialised, waiting for payload"));
    } else {
        let val;
        try {
            if (variableType === 'str') {
                val = String(variableValue);
            } else if (variableType === 'int') {
                val = Math.floor(Number(variableValue.replace(/,/g, '.')));
            } else if (variableType === 'float') {
                val = Number(variableValue.replace(/,/g, '.'));
            } else if (variableType === 'bool') {
                if (typeof variableValue === 'number') {
                    val = Math.floor(variableValue) === 1;
                } else if (typeof variableValue === 'string') {
                    switch (variableValue.toLowerCase()) {
                        case 'true':
                        case '1':
                        case '+':
                            val = true;
                            break;
                        case 'false':
                        case '0':
                        case '-':
                            val = false;
                            break;
                        default:
                            throw new Error(`Wrong variable value for boolean "${variableValue}", use 0, 1, +, -, true, or false instead`);
                    }
                } else if (typeof variableValue === 'boolean') {
                    val = variableValue;
                } else {
                    throw new Error(`Wrong variable value for boolean "${variableValue}", use 0, 1, +, -, true, or false instead`);
                }
            } else if (variableType === 'JSON') {
                val = JSON.parse(variableValue);
            } else {
                throw new Error(`Unsupported variable type: ${variableType}`);
            }
        } catch (err) {
            node.status(genERRStatus(`data error: ${err.message}`));
            return;
        }

        // Ustawienie wartości zmiennej globalnej
        if (variableScope === 'global') {
            node.context().global.set(variableName, val);
            node.status(genOKStatus(` G -> ${val}`));
        } else {
            node.context().flow.set(variableName, val);
            node.status(genOKStatus(` F -> ${val}`));
        }

    }
}



