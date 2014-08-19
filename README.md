customs.js [![Build Status](https://travis-ci.org/firstopinion/customs.js.png)](https://travis-ci.org/firstopinion/customs.js)
========================

Flexible agnostic javascript validation with built in bindings (standalone, jquery, backbone).

* Seperation of concerns. Core lib has no dependencies on the DOM.
* Flexibility to create your own bindings.
* Binding for backbone.

### Why?

I often find client side validation to be a messy process involving monkey patching, overwriting, and/or forking. Many existing libraries have heavy DOM dependencies. Forms and individual elements are validated. The idea behind customs.js is to create a very lighweight and flexible solution that validates json objects. Use or create your own bindings based on your requirements.. 



## TESTS

**Install Dependencies**

```
npm install
```

**Run/View**

```
npm test
```



## License

The MIT License (MIT) Copyright (c) 2014 First Opinion

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.