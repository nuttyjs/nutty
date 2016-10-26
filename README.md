# nutty

[![npm](https://img.shields.io/npm/v/nutty.svg?style=flat-square)](https://www.npmjs.com/package/nutty)
[![npm](https://img.shields.io/npm/dt/nutty.svg?style=flat-square)](https://www.npmjs.com/package/nutty)

A CLI app helper. Implements some features:

- Build automatically the CLI help and the specific command help.
- Set mandatory options.

## Install

Install the package using NPM:

```
npm install nutty
```

## Example

```javascript
//Import nutty
var nutty = require('nutty');

//Get hello function
function GetHello(args, options)
{
  //Get the name
  var name = args[0];

  //Get the hello word
  var hello = (options.idiom === 'english') ? 'Hello' : 'Hola';

  //Display
  console.log('>>>>>>> ' + hello + ' ' + name + '!');

  //Display a done alert
  nutty.display.done('');
}

//Set the CLI options
nutty.set({ version: '1.0.0', name: 'myapp', description: 'My test app' });

//Add a basic command
nutty.add({
  command: 'hello',
  description: 'Get hello with your name',
  usage: 'myapp hello [your_name][options]',
  callback: GetHello,
  options: [
    { name: 'idiom', description: 'Set the idiom. Available idioms: english|spanish', default: 'english' }
  ]
});

//Run the CLI
nutty.run();
```

Simple usage:

```
$ myapp hello John
>>>>>>> Hello John!
```

Use it with options:

```
$ myapp hello Susan --idiom spanish
>>>>>>> Hola Susan!
```

Prints the global help:

```
$ myapp help

myapp v1.0.0

Commands available:
  hello          Get hello with your name
```

Prints the help for a specific command:

```
$ myapp help hello

Usage:        myapp hello [your_name][options]
Description:  Get hello with your name

Options:
  --idiom        Set the idiom. Available idioms: english|spanish

```

## API

### nutty.name(value)

**Mandatory**: set the CLI name. If no argument is provided, it will return the CLI name.

### nutty.description(value)

Set the CLI description. If no argument is provided, it will return the CLI description.

### nutty.version(value)

Set the CLI version. If no argument is provided, it will return the CLI version.

### nutty.set(obj)

Set the CLI info (name, version and description). This method accepts an object with the following options:

- `name`: a `string` with the CLI name.
- `description`: a `string` with the CLI description.
- `version`: a `string` with the CLI version.

### nutty.add(obj)

Add a new command to the CLI. The `obj` argument must be an object or an array with objects, each object with the following keys:

- `command`: command name.
- `description`: command description.
- `usage`: command usage.
- `callback`: function to execute. Will get two arguments:
  - `args`: an array with the arguments provided to this command.
  - `options`: an object with one key for each option used.
- `options`: an array with all the options that this command accepts. Each object of the array must have the following keys:
  - `name`: a string with the option name (**mandatory**).
  - `description`: a string with the option description (**mandatory**).
  - `mandatory`: set `true` if this options is mandatory.
  - `type`: string with the option type. It can be: `string`, `integer`, `number` or `boolean`. Default is `string`.
  - `default`: default value.

### nutty.display

A class to display messages on the terminal with colors. The following display messages are available:

#### nutty.display.done(text)

Display a green done alert.

#### nutty.display.warning(text)

Display a yellow warning alert.

#### nutty.display.error(text)

Display a red error alert.

### nutty.storage

A class to manage CLI storage. **Nutty** uses a JSON file with the name provided with the `nutty.name` option to save the data on the user's home folder.

#### nutty.storage.path()

Returns the path where the JSON file with the storage data are placed.

#### nutty.storage.get(key)

Returns the value of `key` in the user storage.

#### nutty.storage.set(key, value)

Assigns the content of `value` to `key` in the user storage.

### nutty.run(middleware)

Run the CLI. This method accepts the following arguments:

- `middleware`: (optionally) a function that will be executed before running the function associated with the command. This middleware will not be called with the `help` command. This function will be called with the following arguments:
  - `command`: a string with the command executed.
  - `next`: a function to continue with the CLI. You must add `return next();` at the end of your middleware in order to continue with the CLI tool.

## License

[MIT](./LICENSE) LICENSE.
