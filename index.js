//Import dependencies
var getArgs = require('get-args');

//Import libs
var Display = require('./lib/display.js');
var Help = require('./lib/help.js');

//Main class
var Nutty =
{
  //List with all the commands
  commands: {},

  //CLI options
  options: { version: '', name: '', description: '', homepage: '' },

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
    Nutty.commands[name] = obj;
  },

  //Set CLI options
  set: function(key, value)
  {
    //Check for object
    if(typeof key === 'object')
    {
      //Get the options keys
      var keys = Object.keys(key);

      //Read all the keys
      for(var i = 0; i < keys.length; i++)
      {
        //Set the options
        Nutty.options[keys[i]] = key[keys[i]];
      }

      //Exit
      return;
    }

    //Check for undefined value
    if(typeof value === 'undefined'){ return; }

    //Set the key
    Nutty.options[key] = value;
  },

  //Run the cli
  run: function()
  {
    //Get the arguments
    var args = getArgs();

    //Get the command
		var command = (args.command === '') ? 'help' : args.command;

    //Check for help
    if(command === 'help'){ return Nutty.help(args.arguments); }

    //Find the command to execute
    if(typeof Nutty.commands[command] !== 'undefined')
    {
      //Get the command object
      var obj = Nutty.commands[command];

      //Parse the options
      var parsed = Nutty.parse(args.options, obj.options);

      //Check for error
      if(parsed.error === true)
      {
        //Show error and exit
        return console.log('ERROR: option "' + parsed.name + '" is mandatory...');
      }

      //Run the callback
      return obj.callback(args.arguments, parsed.options);
    }

    //Show error in console
    console.log('ERROR: unknow command "' + command + '"');
    console.log('Use help command to display the list with all the available commands.');

    //Exit
    return;
  },

  //Parse arguments
  parse: function(used, expected)
  {
    //Output options
    var opt = {};

    //Read all the expected options
    for(var i = 0; i < expected.length; i++)
    {
      //Get the expected option
      var o = expected[i];

      //Chek if is not used
      if(typeof used[o.name] === 'undefined')
      {
        //Check for undefined default value
        if(o.mandatory === true){ return { error: true, name: o.name }; }

        //Set the default value
        if(typeof o.default === 'undefined'){ opt[o.name] = o.default; }

        //Continue
        continue;
      }

      //Save the option
      opt[o.name] = used[o.name];

      //Check for integer value
      if(o.type === 'integer'){ opt[o.name] = parseInt(opt[o.name]); }

      //Check for number value
      else if(o.type === 'number'){ opt[o.name] = Number(opt[o.name]); }

      //Check for boolean
      else if(o.type === 'boolean')
      {
        //Get the value
        var v = opt[o.name];

        //Parse the value
        opt[o.name] = ( v === 'true' || v === '1' || v === 'on' || v === 'yes' || v === 'y' ) ? true : false;
      }
    }

    //Return the parsed options
    return { error: false, options: opt };
  }
};

//Exports to node
module.exports = { add: Nutty.add, run: Nutty.run, set: Nutty.set, display: Display };
