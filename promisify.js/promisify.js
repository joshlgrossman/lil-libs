function promisify(func){
  return function(){
    var args = arguments;
    var self = this;
    return new Promise(function(resolve, reject){
      var as = [];
      for(var i = 0; i < args.length; i++) as.push(args[i]);
      as.push(resolve);
      try {
        func.apply(self, as);
      } catch (e) {
        reject();
      }
    });
  }
}
