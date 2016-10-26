//Import config
var config = require('../config.js');

//Commands object
var Commands = {};

//Parse a command
Commands.parse = function(obj)
{
  //Check the command name
  if(typeof obj.command === 'undefined'){ return console.error('Undefined command name...'); }

  //Check the callback
  if(typeof obj.callback === 'undefined'){ return console.error('Undefined callback...'); }

  //Check the command description
  if(typeof obj.description === 'undefined'){ obj.description = ''; }

  //Check the options
  if(typeof obj.options === 'undefined'){ obj.options = []; }

  //Check the default command
  if(typeof obj.default === 'undefined'){ obj.default = false; }

  //Check for default command
  if(obj.default === true && Commands.default.has() === true){ return console.error('Only one default command is allowed'); }

  //Read all the options
  for(var i = 0; i < obj.options.length; i++)
  {
    //Check the option name
    if(typeof obj.options[i].name === 'undefined'){ return console.error('Undefined option name...'); }

    //Check the option description
    if(typeof obj.options[i].description === 'undefined'){ return console.error('Undefined option description...'); }

    //Check the option mandatory
    if(typeof obj.options[i].mandatory === 'undefined'){ obj.options[i].mandatory = false; }

    //Check the option type
    if(typeof obj.options[i].type === 'undefined'){ obj.options[i].type = 'string'; }

    //Parse the option type
    obj.options[i].type = obj.options[i].type.toLowerCase();
  }

  //Return the parsed command
  return obj;
};

//Check if command exists
Commands.has = function(name)
{
  //Return if command exists
  return typeof config.commands[name] !== 'undefined';
};

//Default command actions
Commands.default = {};

//Get the default command
Commands.default.get = function()
{
  //Read all the commands
  for(var key in config.commands)
  {
    //Check the default command
    if(config.commands[key].default === true){ return key; }
  }

  //Default
  return false;
};

//Check if has a default command
Commands.default.has = function()
{
  //Read all the commands
  for(var key in config.commands)
  {
    //Check the default command
    if(config.commands[key].default === true){ return true; }
  }

  //Default, return false
  return false;
};

//Exports to node
module.exports = Commands;
