Tiny front-end implementation of CommonJS module pattern
===

In file `main.js`:

    dependency(main)
    function main(require, module){
      const myFunction = require('myFunction');
      const myValueB = require('myValueB');

      console.log(myFunction(myValueB));
    }

In file `myFunction.js`:

    dependency(myFunction)
    function myFunction(require, module){
      const myValueA = require('myValueA');
      module.exports = function(x){
        return myValueA + ' ' + y;
      };
    }

In file `myValueA.js`:

    dependency(myValueA)
    function myValueA(require, module){
      module.exports = 'Hello';
    }

In file `myValueB.js`:

    dependency(myValueB)
    function myValueB(require, module){
      module.exports = 'World';
    }

When these files are put on a page (in any order, so long as `dependency.js` comes before all of them), the console will log 'Hello World'
