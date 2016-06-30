//Import dependencies
var json = require('ujson')
var mkdirp = require('mkdirp');
var path = require('path');
var pstat = require('pstat');

//Config class
var config = {};

//Initialize the cli name
config.name = '';

//Initialize the cli description
config.description = '';

//Initialize the cli version
config.version = '';

//Set the storage object
config.storage = { path: '', content: {} };

//Function to initialize the storage
config.storage.init = function()
{
  //Get the storage folder path
  var storage_dir = path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], '.nutty');

  //Get the storage file path
  var storage_file = path.join(storage_dir, config.name + '.json');

  //Check if storage folder exists
  if(pstat.isDirSync(storage_dir) === false)
  {
    //Create the storage folder
    mkdirp.sync(storage_dir);
  }

  //Check if file exists
  if(pstat.isFileSync(storage_file) === false)
  {
    //Initialize the storage file
    json.writeSync(storage_file, {}, 'utf8');
  }

  //Set the storage path
  config.storage.path = storage_file;

  //Set the storage content
  config.storage.content = json.readSync(storage_file, 'utf8');
};

//Initialize the commands list
config.commands = {};

//Exports to node
module.exports = config;
