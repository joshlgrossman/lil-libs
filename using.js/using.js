function using(obj){
  var emptyRes = {
    when:empty,
    otherwise:fill,
    finally:fill,
    then:empty,
    pipe:empty,
    reset:empty,
    end:end
  };
  var res = {
    when:when,
    otherwise:empty,
    finally:fill,
    then:then,
    pipe:pipe,
    reset:reset,
    end:end
  };
  var val;
  function fill(){ return res; }
  function empty(){ return emptyRes; }
  function call(fun){
    var args = val === undefined ? [obj] : [val,obj];
    return fun.apply(obj, args);
  }
  function then(fun){
    call(fun);
    return res;
  }
  function pipe(fun){
    val = call(fun);
    return res;
  }
  function reset(){
    val = undefined;
    return res;
  }
  function when(cond){
    cond = typeof cond === 'function' ? call(cond) : cond;
    return cond ? res : emptyRes;
  }
  function end(){ return val || obj; }
  return res;
}
