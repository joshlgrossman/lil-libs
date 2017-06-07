function di(name, def){
  if(typeof name === 'function'){
    setTimeout(name.bind(null, function(n){ return di[n](); }), 0);
  } else {
    if(def){
      if(di[name]) throw new Error("Duplicate module definitions for " + name);
      else di[name] = def.bind(null, function(n){
        if(n !== name) return di[n]();
        else throw new Error("Cannot require same module " + n);
      });
    } else return di[name]();
  }
}
