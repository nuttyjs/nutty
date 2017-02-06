//Import nutty
var nutty = require('../index.js');

//Set the CLI name
nutty.set('name', 'hello');

//Set the CLI description
nutty.set('description', 'My test app');

//Set the CLI version
nutty.set('version', '1.0.0');

//Use a middleware
nutty.use(function(args, body, next)
{
  //Get the name
  var name = args.arguments[0];

  //Get the hello word
  var hello = (args.options.idiom === 'english') ? 'Hello' : 'Hola';

  //Display in console
  console.log('>>>>>>> ' + hello + ' ' + name + '!');
});

//Run the CLI
nutty.run();
