//Import dependencies
var json = require('ujson');
var pstat = require('pstat');
var path = require('path');

//Import config
var config = require('../config.js');

//Storage class
var Storage =
{
  //Storage content
  content: json.readSync(config.storage, 'utf8'),

  //Get from storage
  get: function(key)
  {
    //Get from the storage
    return Storage.content[key];
  },

  //set on storage
  set: function(key, value)
  {
    //Set on the local storage
    Storage.content[key] = value;

    //Save to a file
    json.writeSync(Storage.content, { encoding: 'utf8', jsonSpace: '  ' });
  }
};


//Exports to node
module.exports = { get: Storage.get, set: Storage.set };
