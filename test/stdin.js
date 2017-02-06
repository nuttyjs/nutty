//Import nutty
var nutty = require('../index.js');

//Set the CLI name
nutty.set('name', 'stdin');

//Set the CLI description
nutty.set('description', 'My test app');

//Set the CLI version
nutty.set('version', '1.0.0');

//Use a middleware
nutty.use(function(args, body, next)
{
  //Display in console
  console.log('Data from stdin: ');
  console.log(body);
});

//Run the CLI
nutty.run();
