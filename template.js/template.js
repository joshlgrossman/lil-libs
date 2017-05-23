function template(o, f){
  var str = typeof o === 'string' ? o : o.template;
  var change = f || o.change;
  var throttle = o.throttle;

  var callbacks = change ? [change] : [];
  var re = /\#\{(\s*[a-zA-Z_$][a-zA-Z_$0-9]*\s*(\|[^}]*)?)\}/g;
  var vars = str.match(re);
  var timeout;
  var obj = function(arg){
    if(typeof arg === 'function')
      callbacks.push(arg);
    else if(typeof arg === 'object')
      for(var i in arg) obj[i] = arg[i];
    return obj;
  };

  function _change(){
    timeout = undefined;
    for(var i = 0; i < callbacks.length; i++)
      callbacks[i](obj.compiled);
  }

  function _parse(v){
    return v.replace(re,'$1').split('|').map(function(part){ return part.trim() });
  }

  function _prop(def){
    var val = def || '';
    return function(newVal){
      if(newVal !== undefined && newVal !== val) {
        val = newVal || def;
        if(throttle) !timeout && (timeout = setTimeout(_change, 0));
        else _change();
      }
      return val;
    }
  }

  for(var v in vars){
    var arr = _parse(vars[v]);
    var p = _prop(arr[1]);
    Object.defineProperty(obj, arr[0], {get:p, set:p});
  }

  Object.defineProperty(obj, 'compiled', {
    get: function(){
      var res = str;
      for(var v in vars){
        var val = obj[_parse(vars[v])[0]];
        res = res.replace(vars[v], val);
      }
      return res;
    }
  });

  _change();

  return obj;

}
