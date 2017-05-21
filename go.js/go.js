function go(func){
  var re = /^((function\s*(\s+[a-zA-Z_$][a-zA-Z0-9_$]*)?\s*\(.*\))|(\(.*\)\s*=>))\s*{([\s\S]*)}$/g
  return eval((func+'').replace(re, '$5'));
}
