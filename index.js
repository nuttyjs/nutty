//Import dependencies
var getArgs = require('get-args');

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
  },

  //Display help
  help: function(arguments)
  {
    //Check the arguments
    if(typeof arguments === 'undefined'){ var arguments = []; }

    //Check the arguments length
    if(arguments.length === 0)
    {
      //Show the default help
      return Nutty.help_global();
    }

    //Show the specific documentation
    return Nutty.help_specific(arguments[0]);
  },

  //Display the global help
  help_global: function()
  {
    //Get the CLI options
    var opt = Nutty.options;

    //Display the package info
    if(opt.name !== '' && opt.version !== '')
    {
      //Display a line break
      console.log('');

      //Show the package info
      console.log(opt.name + ' v' + opt.version);

      //Check the package description
      if(opt.description !== ''){ console.log(opt.description); }

      //Check the package homepage
      if(opt.homepage !== ''){ console.log(opt.homepage); }
    }

    //Display a line break
		console.log('');

		//Commands available
		console.log('Commands available:');

    //Get the list with all the commands
    var commands = Object.keys(Nutty.commands);

    //Read all the commands
    for(var i = 0; i < commands.length; i++)
    {
      //Get the command object
      var obj = Nutty.commands[commands[i]];

      //Get the space
			var space = '';

			//Add the spaces
			for(var k = obj.command.length; k < 18; k++){ space = space + ' '; }

			//Show the command info
			console.log('  ' + obj.command + space + obj.description);
    }

    //Display an empty line
    console.log('');

    //Show help
    console.log('Run "help <command>" to get more information about a command.');

    //display an empty line
    console.log('');
  },

  //Display the help specific
  help_specific: function(command)
  {
    //Find the command on the list
    if(typeof Nutty.commands[command] === 'undefined'){ return console.log('ERROR: unknow command "' + command + '"'); }

    //Get the command object
    var obj = Nutty.commands[command];

    //Check the usage
    if(typeof obj.usage !== 'undefined' && typeof obj.description !== 'undefined')
    {
      //Display a line break
  		console.log('');

      //Check the usage
      if(typeof obj.usage !== 'undefined'){ console.log('Usage:        ' + obj.usage); }

  		//Check the command description
  		if(typeof obj.description !== 'undefined'){ console.log('Description:  ' + obj.description); }
    }

		//Check for no options
		if(obj.options.length === 0){ return; }

		//Display a line break
		console.log('');

		//Display the options
		console.log('Options: ');

		//Read the full options list
		for(var i = 0; i < obj.options.length; i++)
		{
			//Get the option
			var opt = obj.options[i];

			//Get the space
			var space = '';

			//Add the spaces
			for(var k = opt.name.length; k < 15; k++){ space = space + ' '; }

			//Show the option
			console.log('  --' + opt.name + space + opt.description);
		}

    //Display an empty line
    console.log('');
  }
};

//Exports to node
module.exports = { add: Nutty.add, run: Nutty.run, set: Nutty.set };
