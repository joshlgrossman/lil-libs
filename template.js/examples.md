Allows one way data binding from variables -> a templated string.

    var myTemplate = template('Hello my name is ${myName|anonymous}', string => {
      console.log(string);
    });
    
    // console will log 'Hello my name is anonymous'
    
    myTemplate.myName = 'Josh'; // console will log 'Hello my name is Josh'
    
    
