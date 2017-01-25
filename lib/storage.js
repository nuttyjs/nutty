//Import dependencies
var json = require('ujson');
var mkdirp = require('mkdirp');
var path = require('path');
var pstat = require('pstat');

//Storage object
var storage = { _file: '', _active: false, _content: {} };

//Storage directory
storage._directory = path.resolve(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], '.nutty');

//Cath the process exit event
process.on('exit', function(code){ return storage.close(); });

//Function to initialize the storage
storage.open = function(name)
{
  //Get the storage file path
  storage._file = path.resolve(storage._directory, name + '.json');

  //Check if storage folder exists
  if(pstat.isDirSync(storage._directory) === false)
  {
    //Create the storage folder
    mkdirp.sync(storage._directory);
  }

  //Check if file exists
  if(pstat.isFileSync(storage._file) === true)
  {
    //Getthe storage content
    storage._content = json.readSync(storage._file, 'utf8');
  }

  //Set storage active as true
  storage._active = true;
};

//Close the storage object
storage.close = function()
{
  //Check if storage is active
  if(storage._active === false){ return; }

  //Write the file
  json.writeSync(storage._path, storage._content);

  //Reset the storage content
  storage._content = {};

  //Set storage active as false
  storage._active = false;
};

//Get the storage path
storage.path = function(){ return storage._file; };

//Get a key
storage.get = function(key){ return storage._content[key]; };

//Set a key value
storage.set = function(key, value){ storage._content[key] = value; };

//Exports to node
module.exports = storage;
