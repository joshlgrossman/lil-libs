Functional-style event handlers
===

API:
--
`stream(element: HTMLElement | event: string): Stream`

Creates a stream from an HTMLElement or an event type. Returns a new Stream object.

`Stream#on(event: string): Stream`

Sets the event type for the stream. Returns the same stream.

`Stream#once(event: string): Stream`

Same as `Stream#on` except that also puts the stream into a state such that it will close itself when it completes. Returns the same stream.

`Stream#from(element: HTMLElement): Stream`

Sets the element to stream events from.  Returns the same stream.

`Stream#close(): Stream` _`[alias: Stream#off]`_

Closes stream. Removes event listeners.

`Stream#then(func: Event => any): Stream`

Sets a function to be called which takes in the event that caused the stream to fire. Within the function passed to `then`, `this` is bound to the HTML Element that the event was triggered on.

`Stream#map(func: any => any): Stream` _`[alias: Stream#pipe]`_

Sets a function to map streamed data.  If no previous map functions were set, the initial data will be the event itself.  Pipes the result to next function in sequence.

`Stream#filter(func: any => boolean): Stream` _`[alias: Stream#if]`_

Sets a function to filter the stream. Takes in piped data (if no map/pipe function has been previously called then the data will be the event itself).

`Stream#forEach(func: any => any): Stream` _`[alias: Stream#each]`_

Sets a function to be called on each streamed event.  Takes in piped data (if no map/pipe function has been previously called then the data will be the event itself).

`Stream#throttle(ms: number): Stream`

Throttles the event stream.  The stream will only pass the throttle a maximum of one time per `ms` milliseconds.

`Stream#catch(func: Error => any): Stream`

Sets a function to catch errors thrown by previously chained functions.

`Stream#when(event: String): Stream` _`[alias: Stream#until]`_

Creates a stream branching off of the previous stream.  Used to define a sequence of events that a stream should listen for.

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
    .throttle(1000) // throttle stream
    .then(ke => console.log(ke.which));
```

Example 2:
--
```js
var myButton = document.querySelector('#myButton');
stream(myButton)
    .on('mousedown')
    .pipe(() => Date.now()) // pipe data between events
    .when('mouseup')   // listen for sequence of events
    .filter(time => (Date.now() - time) > 1000)
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