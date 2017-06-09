Tiny front-end implementation of CommonJS module pattern
===

In file `main.js`:

    module(main)
    function main(require, module){
      const myFunction = require('myFunction');
      const myValueB = require('myValueB');

      console.log(myFunction(myValueB));
    }

In file `myFunction.js`:

    module(myFunction)
    function myFunction(require, module){
      const myValueA = require('myValueA');
      module.exports = function(x){
        return myValueA + ' ' + y;
      };
    }

In file `myValueA.js`:

    module(myValueA)
    function myValueA(require, module){
      module.exports = 'Hello';
    }

In file `myValueB.js`:

    module(myValueB)
    function myValueB(require, module){
      module.exports = 'World';
    }

When these files are put on a page (in any order, so long as `module.js` comes before all of them), the console will log 'Hello World'