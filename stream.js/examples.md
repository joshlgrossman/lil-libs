Functional-style event handlers
===

Example 1:
--
```js
var myButton = document.getElementById('myButton');
stream(myButton)  // create stream from element
    .on('click')  // stream specific event
    .then(function(evt){
      this.classList.add('clicked'); // `this` bound to DOM element
    })
    .map(evt => evt.pageX) // map and pipe data
    .filter(x => x > 100) // filter stream
    .forEach(x => { // iterate over streamed events
      console.log(x);
      throw new Error('an error');
    })
    .then(() => {
      console.log('this will not execute');
    })
    .catch(err => console.log(`The error was ${err}`)) // catch errors
    .then(evt => { // resume from initial event emitted
      console.log(evt.pageY);
    })
    .and
    .on('keydown') // stream new event
    .filter(ke => ke.which === 65)
    .forEach(() => console.log('A was pressed'));
```

Example 2:
--
```js
var time;
var myButton = document.querySelector('#myButton');
stream(myButton)
    .on('mousedown')
    .then(() => time = Date.now())
    .when('mouseup')   // listen for sequence of events
    .filter(() => (Date.now() - time) > 1000)
    .then(function(){
      this.classList.add('slow-clicked');
    })
    .when('keypress')
    .map(ke => ke.which)
    .filter(k => k === 65 || k === 97)
    .then(() => {
      console.log(
        'this will only log if clicked for more than 1 sec and then A pressed'
      );
    });
```

Example 3:
--
```js
var myButton1 = document.querySelector('#myButton1');
var myButton2 = document.querySelector('#myButton2');
stream('click') // create stream from event type
    .then(function(){
      this.classList.add('clicked');
    })
    .from(myButton1) // stream from element
    .or
    .from(myButton2); // and another element
    
```