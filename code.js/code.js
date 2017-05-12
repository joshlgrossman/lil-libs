var code = function(){

  function Code(keySequence){
    var initKeySequence = keySequence.slice();
    var callback = function(){};
    var timeout;

    function reset(){ keySequence = initKeySequence.slice(); }

    this.then = function(callbackFunc){ callback = callbackFunc };
    this.check = function(keyEvent){
      clearTimeout(timeout);
      if(keyEvent.keyCode == keySequence[0]){
        timeout = setTimeout(reset, 750);
        keySequence.shift();
        if(!keySequence.length) callback();
      } else reset();
    }
  }

  function init(keySequence){
    var code = new Code(keySequence);
    window.addEventListener('keyup', code.check);
    return code;
  }

  return init;

}();
