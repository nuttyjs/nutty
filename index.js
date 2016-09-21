//Import dependencies
var getargs = require('get-args');
var json = require('ujson');

//Import libs
var Commands = require('./lib/commands.js');
var Display = require('./lib/display.js');
var Help = require('./lib/help.js');
var Options = require('./lib/options.js');

//Import config
var config = require('./config.js');

//Nutty object
var Nutty = { display: Display };

//Nutty storage object
Nutty.storage =
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
  },

  //Get the storage path
  path: function(){ return config.storage.path; } 
};

//Set the CLI name
Nutty.name = function(value)
{
  //Check for undefined
  if(typeof value === 'undefined'){ return config.name; }

  //Set the name
  config.name = value;

  //Initialize the storage
  config.storage.init();
};

//Set the CLI description
Nutty.description = function(value)
{
  //Check for undefined
  if(typeof value === 'undefined'){ return config.description; }

  //Set the description
  config.description = value;
};

//Set the CLI version
Nutty.version = function(value)
{
  //Check for undefined
  if(typeof value === 'undefined'){ return config.version; }

  //Set the version
  config.version = value;
};

//Add a new command
Nutty.add = function(list)
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
Nutty.run = function(middleware)
{
  //Check the middleware
  if(typeof middleware !== 'function'){ var middleware = function(c,n){ return n(); }; }

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
    var parsed = Options(args.options, obj.options);

    //Check for error
    if(parsed.error === true){ return ; }

    //Run the middleware
    return middleware(command, function()
    {
      //Run the command function
      obj.callback(args.arguments, parsed.options);
    });
  }

  //Show error in console
  Display.error('Unknow command "' + command + '"');

  //Exit
  return;
};

//Exports to node
module.exports = Nutty;
