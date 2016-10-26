//Import dependencies
var colors = require('colors');

//Display class
var Display =
{
  //Display a done message
  done: function(text){ console.log('  DONE   '.black.bgGreen.bold + ' ' + text.green.bold); },

  //Display a warning message
  warning: function(text){ console.log(' WARNING '.black.bgYellow.bold + ' ' + text.yellow.bold); },

  //Display an error message
  error: function(text){ console.log('  ERROR  '.black.bgRed.bold + ' ' + text.red.bold); },

  //Display an info message
  info: function(text){ console.log('  INFO   '.black.bgBlue.bold + ' ' + text.blue.bold); }
};

//Exports to node
module.exports = Display;
