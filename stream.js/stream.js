var stream = function(){

  function Stream(element, event, handlers){
    var _this = this;
    this.filter = function(func){
      handlers.push({
        type: 'filter',
        func: func
      });
      return _this;
    };

    this.map = function(func){
      handlers.push({
        type: 'map',
        func: func
      });
      return _this;
    };

    this.forEach = function(func){
      handlers.push({
        type: 'forEach',
        func: func
      });
      return _this;
    };

    this.then = function(func){
      handlers.push({
        type: 'then',
        func: func
      });
      return _this;
    };

    this['catch'] = function(func){
      handlers.push({
        type: 'catch',
        func: func
      });
      return _this;
    };

    function handle(evt){
      var err = null, val = evt;
      loop: for(var i = 0; i < handlers.length; i++) {
        var handler = handlers[i];
        var type = handler.type;
        var func = handler.func;
        try {
          if(err) {
            if(type === 'catch'){
              func.call(element, err);
            } else continue;
          }
          switch(type) {
            case 'filter':
              if (func.call(element, val)) break;
              else break loop;
            case 'map':
              val = func.call(element, val);
              break;
            case 'forEach':
              func.call(element, val);
              break;
            case 'then':
              func.call(element, evt);
              val = evt;
              break;
          }
          err = null;
        } catch(ex) {
          err = ex;
        }
      }
    }

    function addHandlers() {
      if(element && event) element.addEventListener(event, handle);
    }

    function removeHandlers() {
      if(element && event) element.removeEventListener(event, handle);
    }

    this.close = function(){
      removeHandlers();
      return _this;
    };

    this.from = function(el){
      element = el;
      addHandlers();
      return _this;
    };

    this.on = function(evt){
      event = evt;
      addHandlers();
      return _this;
    };

    Object.defineProperty(this, 'and', {
      configurable: false,
      enumerable: false,
      get: function(){ return new Stream(element, event, []); }
    });

    Object.defineProperty(this, 'or', {
      configurable: false,
      enumerable: false,
      get: function(){ return new Stream(element, event, handlers); }
    });
  }

  function stream(elementOrEvent){
    if(typeof elementOrEvent === 'string') return new Stream(null, elementOrEvent, []);
    else return new Stream(elementOrEvent, null, []);
  }

  return stream;

}();