function template(str, onChange){

  if(typeof str === 'object' && typeof onChange === 'object'){
    for(var i in onChange){
      str[i] = onChange[i];
    }
    return;
  }

  var re = /\#\{(\s*[a-zA-Z_$][a-zA-Z_$0-9]*\s*(\|[^}]*)?)\}/g;
  var vars = str.match(re);
  var obj = {};
  onChange = onChange.bind(obj) || function(){};

  function parse(v){
    return v.replace(re,'$1').split('|').map(part => part.trim());
  }

  function prop(def){
    var val = def || 0;
    return function(newVal){
      if(newVal !== undefined) {
        val = newVal || def;
        onChange(obj.template);
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

  onChange(obj.template);

  return obj;

}
