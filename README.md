# node-red-contrib-afya-globals

[![npm](https://img.shields.io/npm/v/node-red-contrib-afya-globals)](https://www.npmjs.com/package/node-red-contrib-afya-globals)
[![license: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Node-RED node that sets **typed global or flow context variables** – once on deploy and then with every incoming message.

**[English](#english) · [Polski](#polski)**

---

## English

### What it does

* On deploy it sets `global.<name>` (or `flow.<name>`) to the configured value, converted to the chosen type.
* Every incoming `msg.payload` overwrites the variable – plain values are converted to that type
  (e.g. `"21,5"` → `21.5` for *float*), objects and arrays are stored as they are.
* Optionally sends the value to the output right after deploy – handy for start-up initialisation.

### Install

```bash
cd ~/.node-red
npm install node-red-contrib-afya-globals
```

Requires Node-RED ≥ 3.0 and Node.js ≥ 18. The node appears in the **AFYA** palette group as **set variable**.

### Configuration

| Field | Description |
|---|---|
| **Variable** | Name and scope (`global` / `flow`). If more context stores are configured in `settings.js` (e.g. a persistent `file` store), you can pick the store here too. |
| **Value** | Initial value with its type: `string`, `integer`, `float`, `boolean`, `JSON` or `none` (nothing is set on deploy, the node waits for `msg.payload`). |
| **Send the value after deploy** | Emits `msg.payload` = value (and `msg.topic` = variable name) 100 ms after start. |
| **Name** | Optional label; when empty the node shows `scope.name = value`. |

Type conversion:

| Type | Conversion |
|---|---|
| string | `String(value)`; objects as JSON text |
| integer | `Math.floor(Number(value))`, comma or dot as decimal separator |
| float | `Number(value)`, comma or dot as decimal separator |
| boolean | `true/false`, `1/0`, `+/-` |
| JSON | `JSON.parse(text)`; objects are kept |
| none | value stored as it comes |

### Input / output

* **Input** `msg.payload` – new value.
* **Output** – the same message with `msg.payload` = stored (converted) value.
* Conversion errors (e.g. `"abc"` for *float*) leave the variable unchanged, turn the status red and are passed to a *Catch* node.

### Reading the variable

```js
// function node
const pi = global.get("pi");
```

…or in *change*, *switch* and *inject* nodes via `global.pi`.

### Example

**Menu → Import → Examples → node-red-contrib-afya-globals → AFYA Globals Examples**

### What's new in 1.1.0

Native global/flow picker with context stores, value field with a type picker (JSON editor included),
fixed handling of incoming messages, modern edit dialog. Existing flows keep working without changes.
See [change.log](change.log).

---

## Polski

### Co robi

* Po wdrożeniu (deploy) ustawia `global.<nazwa>` lub `flow.<nazwa>` na podaną wartość, zamienioną na wybrany typ.
* Każde `msg.payload` nadpisuje zmienną – wartości proste są zamieniane na ten typ
  (np. `"21,5"` → `21.5` dla *float*), obiekty i tablice zapisywane bez zmian.
* Opcjonalnie wysyła wartość na wyjście zaraz po starcie – do inicjalizacji po restarcie.

### Instalacja

```bash
cd ~/.node-red
npm install node-red-contrib-afya-globals
```

Wymaga Node-RED ≥ 3.0 i Node.js ≥ 18. Węzeł **set variable** jest w grupie palety **AFYA**.

### Konfiguracja

| Pole | Opis |
|---|---|
| **Variable** | Nazwa i zakres (`global` / `flow`), opcjonalnie magazyn kontekstu (np. trwały `file`). |
| **Value** | Wartość początkowa z typem: `string`, `integer`, `float`, `boolean`, `JSON` lub `none` (nic nie jest ustawiane, węzeł czeka na `msg.payload`). |
| **Send the value after deploy** | Wysyła `msg.payload` = wartość (i `msg.topic` = nazwa zmiennej) 100 ms po starcie. |
| **Name** | Opcjonalna nazwa; gdy pusta, węzeł pokazuje `zakres.nazwa = wartość`. |

Błąd zamiany (np. `"abc"` dla *float*) nie zmienia zmiennej, daje czerwony status i trafia do węzła *Catch*.
Zmienną odczytasz w dowolnym flow: `global.get("nazwa")`.

### Nowości w 1.1.0

Wybór global/flow z magazynami kontekstu, jedno pole wartości z typem (z edytorem JSON), poprawiona obsługa
wiadomości wejściowych, nowoczesny formularz. Istniejące flow działają bez zmian.

---

Marcin Chuć · ORCID [0000-0002-8430-9763](https://orcid.org/0000-0002-8430-9763) · [MIT](LICENSE)
