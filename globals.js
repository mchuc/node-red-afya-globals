module.exports = function (RED) {
    function AFYAGlobalsNode(config) {

        RED.nodes.createNode(this, config);
        var node = this;
        const variableName = config.globalVariableName;
        const variableType = config.globalVariableType;
        const variableValue = config.globalVariableValue;
        //uruchomienie węzła
        if (variableType === 'undefined') {
            node.status(genOKStatus("not initialised, waiting for payload"));
        } else {
            let val;
            try {
                if (variableType === 'str') {
                    val = String(variableValue);
                } else if (variableType === 'int') {
                    val = Math.floor(Number(variableValue));
                } else if (variableType === 'bool') {
                    if (variableValue instanceof Boolean) {
                        val = variableValue;
                    } else if (variableValue instanceof Number) {
                        val = Math.floor(variableValue) === 1;
                    } else if (variableValue instanceof String) {
                        switch (variableValue) {
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
                                throw new Error(`Wrong variable value for boolean ${variableValue}, use 0,1,+,-,true,false instead`);
                        }
                    } else {
                        throw new Error(`Wrong variable value for boolean ${variableValue}, use 0,1,+,-,true,false instead`);
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
            node.context().global.set(variableName, val);
            node.status(genOKStatus(`${variableName} [${variableType}] -> ${val}`));
        }


        // onMessage
        node.on('input', function (in_msg) {
            let msg ={};
            msg.payload = in_msg.payload;
            node.status(genOKStatus(`data changed to: ${msg.payload}`));
            node.send(msg);
        });

        RED.events.on('node-started', () => {

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
