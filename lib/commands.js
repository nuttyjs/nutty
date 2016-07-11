//Commands object
var Commands =
{
  //Parse a command
  parse: function(obj)
  {
    //Check the command name
    if(typeof obj.command === 'undefined'){ return console.error('Undefined command name...'); }

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

    //Return the parsed command
    return obj;
  }
};

//Exports to node
module.exports = Commands;
