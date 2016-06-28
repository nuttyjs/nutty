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

//Set the CLI options
nutty.set({ version: '1.0.0', name: 'myapp' });

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

## Configuration

**Nutty** will get the following keys from your app's `package.json` to customize your CLI:

- `cli`: for setting the name of the CLI. If is undefined, **Nutty** will use `name` value.
- `version`: for setting the CLI version.
- `description`: to display the app description on the help menu.

 **NOTE**: Why we prefer using `cli` instead of the `name` key for setting the CLI name? Because sometimes the name of the package is not the name of the CLI.

## API

### `nutty.add(obj)`

Add a new command to the CLI. The `obj` argument must be an object with the following keys:

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

### `nutty.display`

A class to display messages on the terminal with colors. The following display messages are available:

#### `nutty.display.done(text)`

Display a green done alert.

#### `nutty.display.warning(text)`

Display a yellow warning alert.

#### `nutty.display.error(text)`

Display a red error alert.

### `nutty.storage`

A class to manage CLI storage. **Nutty** uses a JSON file to save the data on the user's home folder.

#### `nutty.storage.get(key)`

Returns the value of `key` in the user storage.

#### `nutty.storage.set(key, value)`

Assigns the content of `value` to `key` in the user storage.

### `nutty.run()`

Runs the CLI.

## License

[MIT](./LICENSE) LICENSE.
