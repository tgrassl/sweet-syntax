![]()

[![npm](https://flat.badgen.net/npm/v/sweet-syntax)](https://www.npmjs.com/package/sweet-syntax)
[![install size](https://flat.badgen.net/packagephobia/install/sweet-syntax)](https://packagephobia.now.sh/result?p=sweet-syntax)

Add syntactic sugar to any language!

## Install 
Install `sweet-syntax` globally using npm:

```bash
npm install sweet-syntax -g
```

## Usage 
Once the installation is done, you can run the command inside your project's directory with your input and output file.

```bash
sweet-syntax input.myts output.ts
```

By default `sweet-syntax` will search the root of the current directory for a `sweet-syntax.json` file that contains your syntax configuration.

If the config file is located somewhere else, use the `--config` or `-c` argument with its path.

```bash
sweet-syntax input.myjs output.js -c configs/sweet-syntax.json
```

Finally, run this command to see a list of all available options:

```bash
sweet-syntax --help
```

### As a loadable module

You can also use `sweet-syntax` as a module in your code.  
First install it locally using npm:

```bash
npm install --save sweet-syntax
```

Then `require` and use it in your code:

```javascript
const sweetSyntax = require('sweet-syntax');
const config = {
    objects: {
       HELLO: 'console.log'
    },
    keywords: {
        END: ';'
    }
}
const input = 'HELLO("Hello World")END';
const output = sweetSyntax.sweeten(config, input);

console.log(output);

// Output:
// console.log("Hello World");
```

## Config
The config file should be named `sweet-syntax.json` and adopt the following structure:

```json
{
    "keywords": {
        "LOOP": "for",
        "CHECK": "if",
        ...
    },
    "objects": {
        "LOG": "console.log",
        ... 
    },
    "operators": {
        "EQL": "===",
        "NQL": "!==",
        ...
    },
    "characters": {
        "{{": "",
        "}}": "",
        ...
    }
}
```

At least one object e.g. keywords must be provided by the config.


## Examples
You can see examples of custom syntactic sugar under the example folder:
* [Emoji Markdown]()
* [ArnoldJS]()

## License
Code released under the [MIT License](https://github.com/tgrassl/sweet-syntax/blob/master/LICENSE).

Enjoy ⭐️