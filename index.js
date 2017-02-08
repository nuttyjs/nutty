//Import dependencies
var log = require('nutty-log');

//Import libs
var parse_args = require('./lib/args.js');

//nutty object
var nutty = {};

//Middlewares list
nutty._middlewares = [];

//Settings
nutty._settings = { name: '', description: '', version: '', body: true };

//Add a setting value
nutty.set = function(key, value)
{
  //Check for undefined key or value
  if(typeof key !== 'string' || typeof value === 'undefined'){ return; }

  //Change the setting value
  nutty._settings[key] = value;
};

//get a setting value
nutty.get = function(key)
{
  //Check for undefined
  if(typeof key !== 'string'){ return; }

  //Return the settings value
  return nutty._settings[key];
};

//Use a middleware
nutty.use = function(fn)
{
  //Check for function
  if(typeof fn !== 'function'){ return; }

  //Save as a middleware
  nutty._middlewares.push(fn);

  //Continue
  return;
};

//Run the cli
nutty.run = function()
{
  //Check the number of middlewares
  if(nutty._middlewares.length === 0)
  {
    //Display error in console and exit
    return log.error('No middlewares on CLI');
  }

  //Parse the arguments
  var args = parse_args();

  //Middlewares recursive caller
  var middlewares_recursive = function(index)
  {
    //Check the index value
    if(index >= nutty._middlewares.length){ return; }

    //Call the middleware
    nutty._middlewares[index](args, function(error)
    {
      //Check for undefined error
      if(typeof error === 'undefined'){ var error = null; }

      //Check for error
      if(error && error instanceof Error)
      {
        //Throw the error
        throw error;
      }

      //Next middleware on the list
      return middlewares_recursive(index + 1);
    });
  };

  //Read all the middlewares recursive
  return middlewares_recursive(0);
};

//Exports to node
module.exports = nutty;
