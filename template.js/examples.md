Allows one way data binding from variables -> a templated string.

    var myTemplate = template('#{greeting | Hello} my name is #{name | anonymous}', string => {
      console.log(string);
    });

    // console will log 'Hello my name is anonymous'

    myTemplate.name = 'Josh'; // console will log 'Hello my name is Josh'
    myTemplate.greeting = 'Hey'; // console will log 'Hey my name is Josh'

    template(myTemplate, {
      greeting: 'Hi',
      name: ''
    });

    // console will log 'Hi my name is anonymous'

Variable format:

    #{variableName | default value}

When assigned falsey value, variable will revert to default value.
