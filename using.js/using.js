function using(obj){
  var res = {then:then, pipe:pipe, reset:reset, end:end};
  var val;
  function then(fun){
    fun.call(obj, val === undefined ? obj : val, obj);
    return res;
  }
  function pipe(fun){
    val = fun.call(obj, val === undefined ? obj : val, obj);
    return res;
  }
  function reset(){
    val = undefined;
    return res;
  }
  function end(){ return val || obj; }
  return res;
}
