# AFYA Globals Node for Node-RED

**AFYA Globals** is a custom Node-RED node designed to manage global and flow variables with type handling and flexible value setting.  

**AFYA Globals** to niestandardowy węzeł Node-RED do zarządzania zmiennymi globalnymi i flow, z obsługą typów i elastycznym ustawianiem wartości.  

---

## Installation / Instalacja

This package requires Node-RED. You can install this package using npm:

Ten pakiet wymaga Node-RED. Możesz zainstalować go za pomocą npm:

```bash
npm install node-red-contrib-afya-globals
```

## Node Configuration / Konfiguracja węzła

| Option / Opcja       | Type / Typ      | Default Value / Domyślna wartość | Description / Opis |
|----------------------|-----------------|----------------------------------|---------------------|
| **Variable Name**    | String          | `undefined`                      | Name of the global or flow variable. Required. / Nazwa zmiennej globalnej lub flow. Wymagana. |
| **Variable Scope**   | String          | `global`                         | Scope of the variable: `global` or `flow`. / Zakres zmiennej: `global` lub `flow`. |
| **Variable Type**    | String          | `undefined`                      | Variable type: `str`, `int`, `float`, `bool`, `JSON`, `undefined`. / Typ zmiennej: `str`, `int`, `float`, `bool`, `JSON`, `undefined`. |
| **Variable Value**   | Mixed           | `undefined`                      | Initial value of the variable, dependent on the type. / Wartość inicjalizacyjna zmiennej, zależna od typu. |
| **Name**             | String          |                                  | Optional name for the node, displayed in Node-RED. / Opcjonalna nazwa dla węzła, wyświetlana w Node-RED. |

---

## Variable Types / Typy zmiennych

| Type / Typ   | Description / Opis                                                                                               |
|--------------|------------------------------------------------------------------------------------------------------------------|
| `str`        | String, converted with `String(variableValue)`. / Łańcuch znaków, konwertowany za pomocą `String(variableValue)`. |
| `int`        | Integer, converted with `Math.floor(Number(variableValue))`. / Liczba całkowita, konwertowana za pomocą `Math.floor(Number(variableValue))`. |
| `float`      | Floating-point number, value remains `Number(variableValue)`. / Liczba zmiennoprzecinkowa, pozostaje jako `Number(variableValue)`. |
| `bool`       | Boolean value: `true` or `false`. Accepted values: `true`, `false`, `1`, `0`, `+`, `-`. / Wartość logiczna: `true` lub `false`. Obsługiwane wartości wejściowe: `true`, `false`, `1`, `0`, `+`, `-`. |
| `JSON`       | JSON object, parsed with `JSON.parse(variableValue)`. / Obiekt JSON, parsowany za pomocą `JSON.parse(variableValue)`. |
| `undefined`  | Uninitialized value. Set the variable, waiting for the value from `payload`. / Nie zainicjalizowana wartość. Ustawienie zmiennej w oczekiwaniu na nadanie wartości przez `payload`. |

---

## Node Statuses / Statusy węzła

| Color / Kolor | Status        | Description / Opis                                                                 |
|---------------|---------------|-----------------------------------------------------------------------------------|
| Green         | OK            | Variable successfully set or updated. / Zmienna została poprawnie ustawiona lub zaktualizowana. |
| Red           | ERR           | An error occurred while setting or processing the variable. / Wystąpił błąd w trakcie ustawiania zmiennej lub przetwarzania wartości. |

---

## Examples

```
[
    {
        "id": "1",
        "type": "tab",
        "label": "AFYA Globals Examples",
        "disabled": false,
        "info": ""
    },
    {
        "id": "example1",
        "type": "inject",
        "z": "1",
        "name": "Set global string",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "Hello World",
        "payloadType": "str",
        "x": 120,
        "y": 60,
        "wires": [
            [
                "globals1"
            ]
        ]
    },
    {
        "id": "globals1",
        "type": "AFYA-globals",
        "z": "1",
        "name": "",
        "globalVariableName": "greeting",
        "globalVariableScope": "global",
        "globalVariableType": "str",
        "globalVariableValue": "Hello World",
        "x": 380,
        "y": 60,
        "wires": [
            [
                "debug1"
            ]
        ]
    },
    {
        "id": "debug1",
        "type": "debug",
        "z": "1",
        "name": "Debug String",
        "active": true,
        "console": "false",
        "complete": "true",
        "x": 630,
        "y": 60,
        "wires": []
    },
    {
        "id": "example2",
        "type": "inject",
        "z": "1",
        "name": "Set global integer",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "42",
        "payloadType": "num",
        "x": 120,
        "y": 120,
        "wires": [
            [
                "globals2"
            ]
        ]
    },
    {
        "id": "globals2",
        "type": "AFYA-globals",
        "z": "1",
        "name": "",
        "globalVariableName": "answer",
        "globalVariableScope": "global",
        "globalVariableType": "int",
        "globalVariableValue": "42",
        "x": 350,
        "y": 120,
        "wires": [
            [
                "debug2"
            ]
        ]
    },
    {
        "id": "debug2",
        "type": "debug",
        "z": "1",
        "name": "Debug Integer",
        "active": true,
        "console": "false",
        "complete": "true",
        "x": 640,
        "y": 120,
        "wires": []
    },
    {
        "id": "example3",
        "type": "inject",
        "z": "1",
        "name": "Set global float",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "3.14",
        "payloadType": "num",
        "x": 120,
        "y": 180,
        "wires": [
            [
                "globals3"
            ]
        ]
    },
    {
        "id": "globals3",
        "type": "AFYA-globals",
        "z": "1",
        "name": "",
        "globalVariableName": "pi",
        "globalVariableScope": "global",
        "globalVariableType": "float",
        "globalVariableValue": "3,14",
        "x": 340,
        "y": 180,
        "wires": [
            [
                "debug3"
            ]
        ]
    },
    {
        "id": "debug3",
        "type": "debug",
        "z": "1",
        "name": "Debug Float",
        "active": true,
        "console": "false",
        "complete": "true",
        "x": 630,
        "y": 180,
        "wires": []
    },
    {
        "id": "example4",
        "type": "inject",
        "z": "1",
        "name": "Set global boolean",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 120,
        "y": 240,
        "wires": [
            [
                "globals4"
            ]
        ]
    },
    {
        "id": "globals4",
        "type": "AFYA-globals",
        "z": "1",
        "name": "",
        "globalVariableName": "is_active",
        "globalVariableScope": "global",
        "globalVariableType": "bool",
        "globalVariableValue": "1",
        "x": 350,
        "y": 240,
        "wires": [
            [
                "debug4"
            ]
        ]
    },
    {
        "id": "debug4",
        "type": "debug",
        "z": "1",
        "name": "Debug Boolean",
        "active": true,
        "console": "false",
        "complete": "true",
        "x": 640,
        "y": 240,
        "wires": []
    },
    {
        "id": "example5",
        "type": "inject",
        "z": "1",
        "name": "Set global JSON",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "{\"name\": \"John\", \"age\": 30}",
        "payloadType": "json",
        "x": 120,
        "y": 300,
        "wires": [
            [
                "globals5"
            ]
        ]
    },
    {
        "id": "globals5",
        "type": "AFYA-globals",
        "z": "1",
        "name": "Global JSON",
        "globalVariableName": "user_info",
        "globalVariableScope": "global",
        "globalVariableType": "JSON",
        "globalVariableValue": "{\"name\": \"John\", \"age\": 30}",
        "x": 330,
        "y": 300,
        "wires": [
            [
                "debug5"
            ]
        ]
    },
    {
        "id": "debug5",
        "type": "debug",
        "z": "1",
        "name": "Debug JSON",
        "active": true,
        "console": "false",
        "complete": "true",
        "x": 630,
        "y": 300,
        "wires": []
    }
]
```

---
## Author / Autor

**Marcin Chuć**  
ORCID: 0000-0002-8430-9763  
E-mail: marcin...change it to at...afya.pl

