//Parse the arguments
module.exports = function()
{
  //Get the node args
  var args = process.argv.slice(2);

  //Output arguments
  var out = { arguments: [], options: {} };

  //Read all the arguments
  for(var i = 0; i < args.length; i++)
  {
    //Get the argument
    var a = args[i].trim();

    //Check if argument starts with -
    if(a.charAt(0) !== '-')
    {
      //Save as an argument
      out.arguments.push(a);

      //Continue with the next argument
      continue;
    }

    //Replace the -
    a = (a.charAt(1) === '-') ? a.substring(2) : a.substring(1);

    //Check for invalid argument
    if(a.replace(/\s/, '') === ''){ throw new Error('Invalid argument ' + args[i]); }

    //Check the number of arguments
    if(i + 1 >= args.length){ out.options[a] = true; }

    //Check the newxt argument value
    else if(args[i + 1].substring(0, 1) === '-'){ out.options[a] = true; }

    //Default, save the value of the next argument
    else{ out.options[a] = args[++i]; }
  }

  //Return the arguments
  return out;
};
