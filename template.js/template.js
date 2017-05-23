function template(str, onChange){

  var callbacks = onChange ? [onChange] : [];
  var re = /\#\{(\s*[a-zA-Z_$][a-zA-Z_$0-9]*\s*(\|[^}]*)?)\}/g;
  var vars = str.match(re);
  var obj = function(arg){
    if(typeof arg === 'function')
      callbacks.push(arg);
    else if(typeof arg === 'object')
      for(var i in arg) obj[i] = arg[i];
  };

  function change(){
    for(var i = 0; i < callbacks.length; i++)
      callbacks[i](obj.template);
  }

  function parse(v){
    return v.replace(re,'$1').split('|').map(part => part.trim());
  }

  function prop(def){
    var val = def || 0;
    return function(newVal){
      if(newVal !== undefined) {
        val = newVal || def;
        change();
      }
      return val;
    }
  }

  for(var v in vars){
    var arr = parse(vars[v]);
    var p = prop(arr[1]);
    Object.defineProperty(obj, arr[0], {get:p, set:p});
  }

  Object.defineProperty(obj, 'template', {
    get: function(){
      var res = str;
      for(var v in vars){
        var val = obj[parse(vars[v])[0]];
        res = res.replace(vars[v], val);
      }
      return res;
    }
  });

  change();

  return obj;

}
