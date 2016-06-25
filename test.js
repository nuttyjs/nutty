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
}

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

//Set the CLI options
nutty.set({ version: '1.0.0', name: 'myapp' });

//Run the CLI
nutty.run();
