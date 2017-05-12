var bind = function(){

  function wrap(obj, notify){

    function wrapProp(k,val){
      return function(v){
        if(v !== undefined && val !== v){
          val = v;
          notify(obj,k,v);
        }
        return val;
      }
    }

    function wrapFunc(k,f){
      return function(){
        f.apply(obj,arguments);
        notify(obj,k,arguments);
      }
    }

    for(var i in obj){
      var prop = obj[i];
      if(typeof prop === 'function') obj[i] = wrapFunc(i,prop);
      else {
        prop = wrapProp(i,prop);
        Object.defineProperty(obj, i, {
          get: prop,
          set: prop
        })
      }
    }

    return obj;

  }

  function bind(obj){
    var res = {to: to, using: using};
    var propMap;
    var objs = [];
    function notify(o, k, v){
      for(var i in objs){
        var key = k;
        if(propMap && propMap[k]) key = propMap[k];
        if(objs[i] != o) objs[i][key] = v;
      }
    }
    function add(o){
      if(Array.isArray(o)) for(var i in o) objs.push(wrap(o[i],notify));
      else objs.push(wrap(o,notify));
    }
    add(obj);
    function to(objB){ add(objB); return res; }
    function using(pm){ propMap = pm; return res; }
    return res;

  }

  return bind;

}();
