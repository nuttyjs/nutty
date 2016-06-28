//Import dependencies
var getargs = require('get-args');
var json = require('ujson');

//Import libs
var Display = require('./lib/display.js');
var Help = require('./lib/help.js');
var Options = require('./lib/options.js');

//Import config
var config = require('./config.js');

//Main class
var Nutty =
{
  //Display class
  display: Display,

  //Storage class
  storage:
  {
    //Get from storage
    get: function(key)
    {
      //Get from the storage
      return config.storage.content[key];
    },

    //set on storage
    set: function(key, value)
    {
      //Set on the local storage
      config.storage.content[key] = value;

      //Save to a file
      json.writeSync(config.storage.path, config.storage.content, { encoding: 'utf8', jsonSpace: '  ' });
    }
  },

  //Add a new command
  add: function(obj)
  {
    //Check the command name
    if(typeof obj.command === 'undefined'){ return console.error('Undefined command...'); }

    //Save the command name
    var name = obj.command;

    //Check the callback
    if(typeof obj.callback === 'undefined'){ return console.error('Undefined callback...'); }

    //Check the options
    if(typeof obj.options === 'undefined'){ obj.options = []; }

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

    //Save to the commands list
    config.commands[name] = obj;
  },

  //Run the cli
  run: function()
  {
    //Get the arguments
    var args = getargs();

    //Get the command
		var command = (args.command === '') ? 'help' : args.command;

    //Check for help
    if(command === 'help'){ return Help(args.arguments); }

    //Find the command to execute
    if(typeof config.commands[command] !== 'undefined')
    {
      //Get the command object
      var obj = config.commands[command];

      //Parse the options
      var parsed = ParseOptions(args.options, obj.options);

      //Check for error
      if(parsed.error === true){ return ; }

      //Run the callback
      return obj.callback(args.arguments, parsed.options);
    }

    //Show error in console
    Display.error('Unknow command "' + command + '"');

    //Exit
    return;
  }
};

//Exports to node
module.exports = Nutty;
