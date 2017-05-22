function template(str, onChange){
  var re = /\$\{([a-zA-Z_$][a-zA-Z_$0-9]*(\|[^}]*)?)\}/g;
  var vars = str.match(re);
  var obj = {};

  function prop(def){
    var val = def || 0;
    return function(newVal){
      if(newVal !== undefined) {
        val = newVal;
        onChange(obj.template);
      }
      return val;
    }
  }

  for(var v in vars){
    var arr = vars[v].replace(re, '$1').split('|');
    var p = prop(arr[1]);
    Object.defineProperty(obj, arr[0], {get:p, set:p});
  }

  Object.defineProperty(obj, 'template', {
    get: function(){
      var res = str;
      for(var v in vars){
        var arr = vars[v].replace(re, '$1').split('|');
        var val = obj[arr[0]];
        res = res.replace(vars[v], val);
      }
      return res;
    }
  });

  onChange(obj.template);
  
  return obj;

}
