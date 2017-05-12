    var obj1 = {x: 10, txt: 'blah'};
    var obj2 = {x: 3, text: 'hello'};
    
    bind(obj1).to(obj2).using({txt: 'text', text: 'txt'});
    
    obj1.txt = 'boop';
    obj2.text == 'boop'; // true
    
    obj2.x = 0;
    obj1.x == 0; // true
    
Alternate:

    bind([obj1,obj2]).using({txt: 'text', text: 'txt'});

