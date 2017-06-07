function di(name, def){
  function req(n){
    var module = {exports:{}};
    return di[n](module) || module.exports;
  }
  if(typeof name === 'function'){
    setTimeout(name.bind(null, req), 0);
  } else {
    if(def){
      if(di[name]) throw new Error("Duplicate module definitions for " + name);
      else di[name] = def.bind(null, function(n){
        if(n !== name) return req(n);
        else throw new Error("Cannot require same module " + n);
      });
    } else return req(name);
  }
}
