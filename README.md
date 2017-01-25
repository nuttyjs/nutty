<div align="center">
	<img width="300" src="https://avatars2.githubusercontent.com/u/24476707?v=3&s=200" alt="nutty">
	<br>
</div>

# nutty

[![npm](https://img.shields.io/npm/v/nutty.svg?style=flat-square)](https://www.npmjs.com/package/nutty)
[![npm](https://img.shields.io/npm/dt/nutty.svg?style=flat-square)](https://www.npmjs.com/package/nutty)

> A small and minimal CLI framework

## Install

Install the package using NPM:

```
npm install nutty
```

## Example

```javascript
//Import nutty
var nutty = require('nutty');

//Set the CLI name
nutty.set('name', 'myapp');

//Set the CLI description
nutty.set('description', 'My test app');

//Set the CLI version
nutty.set('version', '1.0.0');

//Use a middleware
nutty.use(function(args, opt, next)
{
  //Get the name
  var name = args[0];

  //Get the hello word
  var hello = (opt.idiom === 'spanish') ? 'Hola' : 'Hello';

  //Display in console
  console.log('>>>>>>> ' + hello + ' ' + name + '!');
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


## API

### nutty.get(key)

Returns the value of the setting variable called `key`.

### nutty.set(key, value)

Assigns the value of the setting variable called `key` to `value`.

```javascript
nutty.set('name', 'my-app'); //Initialize the 'name' variable to 'my-app'
nutty.get('name'); //--> Return: ' my-app'
```

### nutty.use(fn)

Add a new middleware to the CLI. Nutty is based on middlewares, that are functions that have access to the `arguments` object, the `options` object and the `next` function.

Example:

```javascript
nutty.use(function(args, opt, next)
{
  // Do your magic
  // ....

  //Next middleware
  return next();
});
```

#### arguments

The `arguments` object is a list with all the arguments that didn't have an option associated with them.

Example:
```
myapp argument1 argument2 --option1 argument3
--> [ "argument1", "argument2" ]
```

#### options

The `options` object is an object with all the options with the format `key = value`.

Example:
```
myapp --option1 --option2 Hello --option3 3.123
--> { "option1": true, "option2": "Hello", "option3": "3.123" }
```

#### next
The `next` function is a function that will call the next middleware on the list when is invoked.



### nutty.display

An object to display messages on the terminal. The following display messages are available:

#### nutty.display.info(text)

Display a blue info alert.

```javascript
nutty.display.info('This is my info message');
```

#### nutty.display.done(text)

Display a green done alert.

```javascript
nutty.display.done('This is my done message');
```

#### nutty.display.warning(text)

Display a yellow warning alert.

```javascript
nutty.display.warning('This is my warning message');
```

#### nutty.display.error(text)

Display a red error alert.

```javascript
nutty.display.error('This is my error message');
```

#### nutty.display.json(obj)

Display a pretty JSON object on console.

```javascript
nutty.display.json({ message: 'This is my message on my JSON object' });
```



### nutty.run()

Run the CLI.

## Related

- [nutty-command](https://github.com/nuttyjs/nutty-command) A command middleware for nutty.

## License

[MIT](./LICENSE) LICENSE.
