Allows one way data binding from variables -> a templated string.

    template( template:string | options:object [, change:function(string)])
    
    options = {
        template:string // templated string to compile
        throttled:boolean // whether or not to throttle changes [optional - default: false]
        change:function(string) // on-change callback [optional - default:undefined]
    }
    
    templateObj( properties:object | change:function(string) )
    
Examples:

    var myTemplate = template('#{greeting | Hello} my name is #{name | anonymous}', string => {
      console.log(string);
    });

    // console will log 'Hello my name is anonymous'

    myTemplate.name = 'Josh'; // console will log 'Hello my name is Josh'
    myTemplate.greeting = 'Hey'; // console will log 'Hey my name is Josh'

    myTemplate({
      greeting: 'Hi',
      name: ''
    });
    // console will log 'Hi my name is Josh'
    // then
    // console will log 'Hi my name is anonymous'
    // to avoid this behavior use the 'throttle' option as seen below
    
    myTemplate(string => {
        console.log('this is a second onChange listener ' + string);
    });

When assigned falsey value, variable will revert to default value.  Variable format:

    #{variableName | default value}

Throttled changes wait to trigger the callback functions until all changes are applied.

    var myTemplate2 = template({
        template: '<div class="#{className}">#{text}</div>',
        throttle: true,
        change: function(string){
            myDOMNode.innerHTML = string;
        }
    });
    
    myTemplate2({
        className: 'shown',
        text: 'These updates will both be applied at the same time'
    });

    
