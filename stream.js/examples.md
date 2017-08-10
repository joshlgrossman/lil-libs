Functional-style event handlers
===

```js
var myButton = document.getElementById('myButton');
var myStream = stream(myButton)
    .on('click')
    .then(function(evt){
      this.classList.add('clicked'); // 'this' bound to element
      console.log(evt.pageX, evt.pageY);
      return {x: evt.pageX, y: evt.pageY}; // event is standard JS event
    })
    .pipe(function(point){ // pipe value in from previous
      var x = point.x;
      var y = point.y;
      return Math.sqrt(x*x + y*y);
    })
    .pipe(function(dist){
      if(dist > 10) throw new Error('too big!');
    })
    .catch(function(err){ // catch errors
      console.error(err);
    })
    .then(function(evt){ // resume from initial event
      console.log(evt.pageX, evt.pageY);
    })
    .and.on('keydown')  // stream different event
    .then(function(evt){
      if(evt.which === 65) {
        console.log('A pressed on button');
        myStream.off(); // kill event stream
      }
    });
```