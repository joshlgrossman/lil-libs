var stream = function(){

  function Stream(element, event, handlers){
    var _this = this;
    this.then = function(func){
      handlers.push({catcher: false, func: func, pipe: false});
      return _this;
    };
    this['catch'] = function(func){
      handlers.push({catcher: true, func: func, pipe: false});
      return _this;
    };
    this.pipe = function(func){
      handlers.push({catcher: false, func: func, pipe: true});
      return _this;
    };
    this.reset = this.off = function(){
      element.removeEventListener(event, handlers.all);
      return _this;
    };
    Object.defineProperty(this, 'and', {
      configurable: false,
      enumerable: false,
      get: function(){ return stream(element); }
    });
  }

  function on(event){
    var _this = this;
    var handlers = [];
    var stream = new Stream(this, event, handlers);
    this.addEventListener(event, handlers.all = function(evt){
      var err = null;
      var val = evt;
      for(var i = 0; i < handlers.length; i++){
        var handler = handlers[i];
        var catcher = handler.catcher;
        var pipe = handler.pipe;
        if((catcher && err) || (!catcher && !err)){
          try {
            val = handler.func.call(_this, pipe ? val : (err || evt)) || evt;
            err = null;
          } catch (ex) {
            err = ex;
          }
        }
      }
    });
    return stream;
  }

  function stream(element){
    return {
      on: on.bind(element)
    };
  }

  return stream;

}();