var stream = function(){

  function Stream(element, event, handlers){
    var _this = this;
    var once = false;

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
            case 'when':
              func(val);
              break;
          }
          err = null;
        } catch(ex) {
          err = ex;
        }
      }
      if(once) _this.close();
    }

    this['if'] = this.filter = function(func){
      handlers.push({
        type: 'filter',
        func: func
      });
      return _this;
    };

    this.pipe = this.map = function(func){
      handlers.push({
        type: 'map',
        func: func
      });
      return _this;
    };

    this.each = this.forEach = function(func){
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

    this.until = this.when = function(evt){
      var init = {
        type: 'map',
        func: function(val){ return val; }
      };
      var stream = new Stream(null, null, [init]);
      stream.once(evt);
      handlers.push({
        type: 'when',
        func: function(val){
          init.func = function(){ return val; }
          stream.from(element);
          return stream;
        }
      });
      return stream;
    };

    this.throttle = function(ms){
      var throttled = false;
      handlers.push({
        type: 'filter',
        func: function(){
          if(throttled) {
            return false;
          } else {
            throttled = true;
            setTimeout(function () {
              throttled = false;
            }, +ms);
            return true;
          }
        }
      });
      return _this;
    };

    function addHandlers() {
      if(element && event) element.addEventListener(event, handle);
    }

    function removeHandlers() {
      if(element && event) element.removeEventListener(event, handle);
    }

    this.off = this.close = function(){
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

    this.once = function(evt){
      once = true;
      return _this.on(evt);
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