    function example(x, callback){
      callback(x + 10);
    }
    
    var promised = promisify(example);
    
    promised(10)
    .then(function(result){
      console.log(result);
    });

is the same as

    example(10, function(result){
        console.log(result);
    });
