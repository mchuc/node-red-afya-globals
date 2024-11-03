# AFYA Globals Node for Node-RED v1.0.6

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

| Option / Opcja     | Type / Typ | Default Value / Domyślna wartość | Description / Opis                                                                                                                                                                                           |
|--------------------|------------|----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Variable Name**  | String     | `undefined`                      | Name of the global or flow variable. Required. / Nazwa zmiennej globalnej lub flow. Wymagana.                                                                                                                |
| **Variable Scope** | String     | `global`                         | Scope of the variable: `global` or `flow`. / Zakres zmiennej: `global` lub `flow`.                                                                                                                           |
| **Variable Type**  | String     | `undefined`                      | Variable type: `str`, `int`, `float`, `bool`, `JSON`, `undefined`. / Typ zmiennej: `str`, `int`, `float`, `bool`, `JSON`, `undefined`.                                                                       |
| **Variable Value** | Mixed      | `undefined`                      | Initial value of the variable, dependent on the type. / Wartość inicjalizacyjna zmiennej, zależna od typu.                                                                                                   |
| **Emit on init**   | Boolean    | `false`                          | Outputs payload with variable value, right after node-red initialization (after running / deploy) / Wysyła na wyjście payload z wartością zmiennej, tuż po inicjalizacji node-red (po uruchomieniu / deploy) |
| **Name**           | String     |                                  | Optional name for the node, displayed in Node-RED. / Opcjonalna nazwa dla węzła, wyświetlana w Node-RED.                                                                                                     |

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
                "d9f37f7ae1706d60"
            ]
        ]
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
                "d9f37f7ae1706d60"
            ]
        ]
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
                "d9f37f7ae1706d60"
            ]
        ]
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
                "d9f37f7ae1706d60"
            ]
        ]
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
        "name": "",
        "globalVariableName": "user_info",
        "globalVariableScope": "global",
        "globalVariableType": "JSON",
        "globalVariableValue": "{\"name\": \"John\", \"age\": 30}",
        "globalEmitOnInit": false,
        "x": 350,
        "y": 300,
        "wires": [
            [
                "d9f37f7ae1706d60"
            ]
        ]
    },
    {
        "id": "8acd6e590be8d3f1",
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
        "y": 360,
        "wires": [
            [
                "cc4c2daec15a5eb8"
            ]
        ]
    },
    {
        "id": "cc4c2daec15a5eb8",
        "type": "AFYA-globals",
        "z": "1",
        "name": "autoemit",
        "globalVariableName": "start_me",
        "globalVariableScope": "global",
        "globalVariableType": "str",
        "globalVariableValue": "node-red-init",
        "globalEmitOnInit": true,
        "x": 320,
        "y": 360,
        "wires": [
            [
                "d9f37f7ae1706d60",
                "3252158596a8d390"
            ]
        ]
    },
    {
        "id": "d9f37f7ae1706d60",
        "type": "debug",
        "z": "1",
        "name": "debug 1",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 740,
        "y": 200,
        "wires": []
    },
    {
        "id": "7c0f4ed50ae82e9f",
        "type": "comment",
        "z": "1",
        "name": "about autoemit",
        "info": "now you can start emitting a signal, after initializing node-red - e.g. to set some initial data, download them. server, or set data, after restart\nteraz możesz rozpocząć emisję sygnału, po inicjalizacji node-red - np. dla ustawienia jakichś danych początkowych, pobrania ich. serwera, czy ustawienia danych, po restarcie",
        "x": 340,
        "y": 420,
        "wires": []
    },
    {
        "id": "3252158596a8d390",
        "type": "link out",
        "z": "1",
        "name": "link_out_EMIT",
        "mode": "link",
        "links": [
            "0b335beb1d6269c7",
            "3cd3360e0a5c13c4",
            "e455d74b4e1cda2c"
        ],
        "x": 605,
        "y": 360,
        "wires": []
    },
    {
        "id": "3cd3360e0a5c13c4",
        "type": "link in",
        "z": "1",
        "name": "link in 1",
        "links": [
            "3252158596a8d390"
        ],
        "x": 735,
        "y": 320,
        "wires": [
            [
                "c8919efcc73f3ad0"
            ]
        ]
    },
    {
        "id": "e455d74b4e1cda2c",
        "type": "link in",
        "z": "1",
        "name": "link in 2",
        "links": [
            "3252158596a8d390"
        ],
        "x": 735,
        "y": 380,
        "wires": [
            [
                "c8919efcc73f3ad0"
            ]
        ]
    },
    {
        "id": "0b335beb1d6269c7",
        "type": "link in",
        "z": "1",
        "name": "link in 3",
        "links": [
            "3252158596a8d390"
        ],
        "x": 735,
        "y": 440,
        "wires": [
            [
                "c8919efcc73f3ad0"
            ]
        ]
    },
    {
        "id": "c8919efcc73f3ad0",
        "type": "debug",
        "z": "1",
        "name": "debug 2",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 920,
        "y": 360,
        "wires": []
    }
]
```

---
## Author / Autor

**Marcin Chuć**  
ORCID: 0000-0002-8430-9763  
E-mail: marcin...change it to at...afya.pl

