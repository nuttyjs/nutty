//Import dependencies
var colors = require('colors');

//Display object
var display = {};

//Display a done message
display.done = function(text){ console.log('  DONE   '.black.bgGreen.bold + ' ' + text.green.bold); },

//Display a warning message
display.warning = function(text){ console.log(' WARNING '.black.bgYellow.bold + ' ' + text.yellow.bold); },

//Display an error message
display.error = function(text){ console.error('  ERROR  '.black.bgRed.bold + ' ' + text.red.bold); },

//Display an info message
display.info = function(text){ console.log('  INFO   '.black.bgBlue.bold + ' ' + text.blue.bold); };

//Exports to node
module.exports = display;
