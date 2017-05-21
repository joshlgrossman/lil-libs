Based off of the proposed "do block" to convert any statement into an expression.

    let x = go(()=>{
      if(something()) 5;
      else if(somethingElse()) 10;
      else 'nope';
    });
