function module(nm, def){
  if(!nm && !def) return;
  function req(n){
    try {
      var mdl = {exports:{}};
      return module[n].cache || (module[n].cache = module[n](mdl) || mdl.exports)
    } catch(e) { throw new Error("Module " + n + " could not be imported"); }
  }
  if(typeof nm === 'function') nm = (def = nm).name;
  if(!nm ||(nm === 'main' && def)){
    def = def.bind(null,req);
    if(document.readyState === 'complete') setTimeout(def, 0);
    else window.addEventListener('load', def);
  } else {
    if(def){
      if(module[nm]) throw new Error("Duplicate module definitions for " + nm);
      else module[nm] = def.bind(null, function(n){
        if(n !== nm) return req(n);
        else throw new Error("Cannot require same module " + n);
      });
    } else return req(nm);
  }
}
