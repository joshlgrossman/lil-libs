Mini dependency injection lib

    di(require => { // module without name is considered entry point
        var x = require('x')
        var func = require('func')

        console.log(func(x))
    })

    di('func', require => {
        var y = require('y') // imports module y from below
        return function(x){  // the exported value of the module
            return `${x} + ${y} = ${x+y}`
        }
    })

    di('x', require => 10)
    di('y', require => 5)
    
When run, this will print "10 + 5 = 15"
