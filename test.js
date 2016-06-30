//Import nutty
var nutty = require('./index.js');

//Get hello function
function GetHello(args, options)
{
  //Get the name
  var name = args[0];

  //Get the hello word
  var hello = (options.idiom === 'english') ? 'Hello' : 'Hola';

  //Display
  console.log('>>>>>>> ' + hello + ' ' + name + '!');

  //Display done message
  nutty.display.done('');
}

//Set the CLI name
nutty.name('myapp');

//Set the CLI description
nutty.description('My test app');

//Set the CLI version
nutty.version('1.0.0');

//Add a basic command
nutty.add({
  command: 'hello',
  description: 'Get hello with your name',
  usage: 'myapp hello [your_name][options]',
  callback: GetHello,
  options: [
    { name: 'idiom', description: 'Set the idiom. Available idioms: english|spanish', default: 'english', mandatory: true }
  ]
});

//Run the CLI
nutty.run();
