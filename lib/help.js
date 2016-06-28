//Import dependencies
var colors = require('colors');

//Import libs
var Display = require('./display.js');

//Import config
var config = require('../config.js');

//Help class
var Help =
{
  //Main help function
  Main: function(arguments)
  {
    //Check the arguments
    if(typeof arguments === 'undefined'){ var arguments = []; }

    //Check the arguments length
    if(arguments.length === 0)
    {
      //Show the default help
      return Help.Global();
    }

    //Show the specific documentation
    return Help.Specific(arguments[0]);
  },

  //Global help
  Global: function()
  {
    //Display a line break
    console.log('');

    //Show the package info
    console.log(config.name + ' v' + config.version);

    //Check the package description
    if(config.description !== ''){ console.log(config.description); }

    //Get the list with all the commands
    var keys = Object.keys(config.commands);

    //Check the commands length
    if(keys.length > 0)
    {
      //Display a line break
      console.log('');

      //Commands available
      console.log('Commands available:');

      //Read all the commands
      for(var i = 0; i < keys.length; i++)
      {
        //Get the command object
        var obj = config.commands[keys[i]];

        //Get the space
        var space = '';

        //Add the spaces
        for(var k = obj.command.length; k < 18; k++){ space = space + ' '; }

        //Show the command info
        console.log('  ' + obj.command + space + obj.description);
      }
    }

    //Display an empty line
    console.log('');

    //Show help
    console.log('Run "' + config.name + ' help <command>" to get more information about a command.');

    //display an empty line
    console.log('');
  },

  //Display the help specific
  Specific: function(command)
  {
    //Find the command on the list
    if(typeof config.commands[command] === 'undefined'){ return Display.error('Unknow command "' + command + '"'); }

    //Get the command object
    var obj = config.commands[command];

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

    //Check for options
    if(obj.options.length > 0)
    {
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
    }

    //Display an empty line
    console.log('');
  }
};

//Exports to node
module.exports = Help.Main;
