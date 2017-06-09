Mini dependency injection lib

    di(require => { // module without name or with name 'main' is considered entry point
        var x = require('x')
        var func = require('func')

        console.log(func(x))
    })

    di('func', require => {
        var z = require('z') // imports module z from below
        return function(x){  // the exported value of the module
            return `${x} + ${z} = ${x+z}`
        }
    })

    di('x', require => 10)
    di('y', (require, module) => {
        module.exports = 5 // also supports CommonJS module.exports
    })
    
    di(function z(require, module){ // named functions can be used in place of a string for module name
        module.exports = require('y')
    })
    
When run, this will print "10 + 5 = 15"
