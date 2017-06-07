Mini dependency injection lib

    di(function(require){
      var x = require('x')
      var func = require('func')
      
      console.log(func(x))
    })
    
    di('func', function(require){
      return function(val){
        return 'The value is ' + val;
      }
    })
    
    di('x', function(){
        return 10;
    })
