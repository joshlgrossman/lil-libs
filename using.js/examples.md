ES5 w/ binding

    var myObj = {a: 3, b: 4};

    using(myObj)
      .then(function(){
        this.c = this.a + this.b; // myObj.c == 7
      })
      .pipe(function(){
        return 'a: ' + this.a;  // pipe to next
      })
      .then(function(val){
        console.log(val); // logs 'a: 3'
      })
      .pipe(function(){
        return 'c: ' + this.c;
      })
      .then(function(val){
        console.log(val); // logs 'c: 7'
      })
      .end(); // returns last piped value or myObj if undefined

ES6 w/ arrow functions

    const myObj = {a: 3, b: 4};

    using(myObj)
      .then(o => o.c = o.a + o.b)
      .pipe(o => `a: ${o.a}`)
      .then(v => console.log(v))
      .reset()  // resets piped value to myObj
      .pipe(o => `c: ${o.c}`)
      .then(v => console.log(v))
      .end();
