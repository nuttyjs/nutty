//Import dependencies
var json = require('ujson')
var mkdirp = require('mkdirp');
var path = require('path');
var pstat = require('pstat');

//Config class
var config = {};

//Get the cli package.json
var pkg = json.readSync(path.join(process.cwd(), 'package.json'));

//Set the cli name
config.name = (typeof pkg.cli === 'undefined') ? pkg.cli : pkg.name;

//Check for empty name
if(typeof config.name === 'undefined' || config.name === '')
{
  //Set error
  console.error('ERROR: you must set the cli name on the package.json file. Read the documentation for more info.');

  //Exit
  process.exit(1);
}

//Set the cli description
config.description = (typeof pkg.description === 'undefined') ? '' : pkg.description;

//Set the cli version
config.version = (typeof pkg.version === 'undefined') ? '1.0.0' : pkg.version;

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

//Set the storage object
config.storage = { path: storage_file, content: json.readSync(storage_file, 'utf8') };

//Initialize the commands list
config.commands = {};

//Exports to node
module.exports = config;
