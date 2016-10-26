//Import dependencies
var json = require('ujson');

//Import libs
var Args = require('./lib/args.js');
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

//Set the nutty values
Nutty.set = function(opt)
{
  //Check the opt data
  if(typeof opt !== 'object'){ var opt = {}; }

  //Check the CLI name
  if(typeof opt.name === 'string'){ Nutty.name(opt.name); }

  //Check the CLI description
  if(typeof opt.description === 'string'){ Nutty.description(opt.description); }

  //Check the CLI version
  if(typeof opt.version === 'string'){ Nutty.version(opt.version); }
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
  if(typeof middleware !== 'function'){ var middleware = function(c,a,o,n){ return n(); }; }

  //Input cases
  // myapp   -> display help
  // myapp help  -> display help
  // myapp <cmd> <args>  -> Run the command
  // myapp <args>  -> Run the default command if exists, else display error

  //Get the arguments
  var args = Args();

  //Get the command
	var command = (args.arguments.length === 0) ? 'help' : args.arguments[0];

  //Check for help
  if(command === 'help'){ return Help(args.arguments); }

  //Check if has default command
  var has_default = Commands.default.has();

  //Check if command exists
  var has_command = Commands.has(command);

  //Find the command to execute
  if(has_default === true || has_command === true)
  {
    //Check if the command exists
    if(has_command === true)
    {
      //Remove the first argument
      args.arguments.shift();
    }
    else
    {
      //Get the default command
      command = Commands.default.get();
    }

    //Get the command object
    var obj = config.commands[command];

    //Parse the options
    var parsed = Options(args.options, obj.options);

    //Check for error
    if(parsed.error === true){ return ; }

    //Run the middleware
    return middleware(command, args.arguments, parsed.options, function()
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
