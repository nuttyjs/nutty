//Import libs
var display = require('./display.js');

//Parse the options
module.exports = function(used, expected)
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
      //Set the default value
      if(typeof o.default !== 'undefined')
      {
        //Set the default value
        opt[o.name] = o.default;
      }

      //Check for undefined default value
      else if(o.mandatory === true)
      {
        //Show error in console
        display.error('Option "' + o.name + '" is mandatory.');

        //Exit process with error
        process.exit(1);
      }

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
      opt[o.name] = ( v === true || v === 'true' || v === '1' || v === 'on' || v === 'yes' || v === 'y' ) ? true : false;
    }
  }

  //Return the parsed options
  return opt;
};
