customs.js [![Build Status](https://travis-ci.org/firstopinion/customs.js.png)](https://travis-ci.org/firstopinion/customs.js) [![Selenium Test Status](https://saucelabs.com/buildstatus/fo-customs)](https://saucelabs.com/u/fo-customs)
==========
Flexible agnostic javascript validation with built in bindings (standalone, jquery, backbone).

* Seperation of concerns. Core lib has no dependencies on the DOM.
* Flexibility to create your own bindings.
* Built in bindings using vanilla js, jquery, and backbone.
* Built in bindings are event based. Very easy integration with UI.

---


Why?
----
Client validation is messy. I often find myself monkey-patching/overwriting library methods, or creating entirely seperate forks to satisfy my needs. I have found that many existing libraries have heavy DOM dependencies. Forms and individual methods are validated. The idea behind customs.js is to create a very lighweight and flexible solution to fit anyones needs. Use a built in binding or create your own. 

---


Installation
------------
```
bower install endpoints.js
```

```
npm install endpoints.js
```

---


Core
----

### Example Usage

```
// Setup rules
var rules = {
  first: 'required|alpha|minLength[2]'
}

// Check
var result = customs.check({
  first: ''
}, rules);

// View results
console.log(result.isValid);
// {
//   isValid: false,
//   errs: {
//     first: [
//       { rule: 'required', msg: 'The value is required.' },
//       { rule: 'minLength', msg: 'The value must be greater than the specified value.' }
//     ]
//   }
// }

```

### API

#### customs.check(data, rules)
Check data against specified rules.

**params**

* **data (required):** The data object run checks on.
* **rules (required):** The rules object to check data against. Checks are defined in a pipe seperated string. Ex: `required|minLength[3]`

**returns** (Object)

* 'isValid': Boolean indicating if the data object passed the checked.
* 'errs': (Object)
    * [NAME]: (Array of Objects)
        * rule: The specific rule that did not pass.
        * msg: Text describing the specific rule that did not pass.

### Checks

* **required**: passes if the value is not empty.
* **default[STR]**: passes if the value is not equal to the default specified value.
* **email**: passes if the value is a valid email address.
* **emails**: passes if every value provided in a comma separated list is a valid email address.
* **minLength[INT]**: passes if the value is longer or equal to the specified param.
* **maxLength[INT]**: passes if the value is shorter or equal to the specified param.
* **exactLength[INT]**: passes if the value is equal to the specified param.
* **greaterThan[NUM]**: passes if the value is greater than the specified param.
* **lessThan[NUM]**: passes if the value is less than the specified param.
* **alpha**: passes if the value contains only alphabetical chars.
* **alphaNumeric**: passes if the value contains only alphabetical and numerical chars.
* **alphaDash**: passes if the value contains only alphabetical chars, numerical chars, underscores, and dashes.
* **numeric**: passes if the value contains only numeric chars.
* **integer**: passes if the value contains an integer (negative allowed -).
* **decimal**: passes if the value contains a decimal.
* **natural**: passes if the value contains only natural number (0, 1, 2, 3..).
* **naturalNoZero**: passes if the value contains only natural number excluding 0 (1, 2, 3..).
* **url**: passes if the value is a valid url.
* **creditCard**: passes if the value passes the credit card luhn check.
* **fileType[EXT,EXT]**: passes if the value extension matches an extension in the specified comma seperated list.

---


Backbone Binding (Coming Soon)
------------------------------

### Example Usage

```
NA
```

---


JQuery Binding (Coming Soon)
----------------------------

### Example Usage

```
NA
```

---


Standalone Binding (Coming Soon)
------------------------------

### Example Usage

```
NA
```

---


Test
----
Run on sacuelabs against the following browsers:

[![Selenium Test Status](https://saucelabs.com/browser-matrix/fo-customs.svg)](https://saucelabs.com/u/fo-customs)

### Local

**Install Dependencies**

```
npm install
```

```
bower install
```

**Run/View**

```
grunt test-local
```

### On Push
Travis will run sauce labs test on push.

---


Todos
-----

* backbone binding
* standalone binding
* jquery binding

---


License
-------

The MIT License (MIT) Copyright (c) 2013 First Opinion

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.