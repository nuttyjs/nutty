//Import libs
var args_parser = require('./lib/args.js');
var storage = require('./lib/storage.js');

//nutty object
var nutty = {};

//Middlewares list
nutty._middlewares = [];

//Settings
nutty._settings = { name: '', description: '', version: '' };

//Add the storage object
nutty.storage = storage;

//Add a setting value
nutty.set = function(key, value)
{
  //Check for undefined key or value
  if(typeof key !== 'string' || typeof value === 'undefined'){ return; }

  //Change the setting value
  nutty._settings[key] = value;
};

//get a setting value
nutty.get = function(key)
{
  //Check for undefined
  if(typeof key !== 'string'){ return; }

  //Return the settings value
  return nutty._settings[key];
};

//Use a middleware
nutty.use = function(fn)
{
  //Check for function
  if(typeof fn !== 'function'){ return; }

  //Save as a middleware
  nutty._middlewares.push(fn);

  //Continue
  return;
};

//Add a new command
nutty.add = function(list)
{
  //Check the list of commands
  if(typeof list !== 'object'){ return; }

  //Check for array
  if(Array.isArray(list) === false){ list = [ list ]; }

  //Read all the commands
  for(var i = 0; i < list.length; i++)
  {
    //Parse the command
    var obj = Commands.parse(list[i]);

    //Check for undefined
    if(typeof obj === 'undefined'){ continue; }

    //Get the name
    var name = obj.command;

    //Save to the commands list
    config.commands[name] = obj;
  }

  //Exit
  return;
};

//Run the cli
nutty.run = function()
{
  //Parse the arguments
  var args = args_parser();

  //Middlewares recursive caller
  var middlewares_recursive = function(index)
  {
    //Check the index value
    if(index >= nutty._middlewares.length){ return help(args.arguments, opt.options); }

    //Call the middleware
    nutty._middlewares[index](args.arguments, args.options, function()
    {
      //Next middleware on the list
      return middlewares_recursive(index + 1);
    });
  };

  //Read all the middlewares recursive
  return middlewares_recursive(0);
};

//Exports to node
module.exports = nutty;
