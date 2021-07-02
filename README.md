# csv-to-custom-json &middot; [![npm version](https://img.shields.io/npm/v/csv-to-custom-json.svg)](https://www.npmjs.org/package/csv-to-custom-json) [![dependencies](https://status.david-dm.org/gh/its-just-nans/csv-to-custom-json.svg)](https://david-dm.org/its-just-nans/csv-to-custom-json) [![Build Status](https://travis-ci.com/Its-Just-Nans/csv-to-custom-json.svg?branch=main)](https://travis-ci.com/Its-Just-Nans/csv-to-custom-json)

Transform your `.csv` file to a custom JSON structure :) !

<details>
<summary>Click to expand</summary>

- [Simple documentation](#simple-documentation)
  - [Simple case](#simple-case)
  - [Structure JSON](#structure-json)
  - [Options](#options)
- [Documentation](#documentation)
- [Examples](#examples)
- [About](#about)
- [License](#license)

</details>

## Simple documentation

### Simple case

You just want to parse your `.csv` without structure :

```javascript
const parseFile = require("./index");
const parsed = await parseFile(linkFile);
```

### Structure JSON

First you need to create the schema of your futur JSON

```javascript
const schema = {
    num1: "int",
    num2: "float",
    num3: "string",
    num4 (value, allValues) {
        // this is a callBack !
    },
    async num5 (value, allValues) {
        // this is a async callBack !
    }
};
// then
const parsedFile = await parseFile("myfile.csv", schema);
```

> Legend :
>
> - `num1`, `num2`, `num3`, `num4`, `num5` are rows from the `.csv`
> - You can see that the value of attribute define how variable will be parse
> - You can see that we can use callBack, the value returned by the callBack will be put in the result (if not `undefined` or `null`)

This program allow you to create complex strucured JSON, like this :

```javascript
const schema = {
    hello: [
        {
            num4: "int",
            num1: "string"
        }
    ],
    hello2: [
        {
            num4: "int",
            num1: [
                {
                    num3: "string"
                }
            ]
        }
    ]
};
// then
const parsedFile = await parseFile("myfile.csv", schema);
```

### Options

To use options, you need to add a third paramters which is an object with options.

Example :

```javascript
const parsedFile = await parseFile("myfile.csv", schema, {
    debug: true,
});
```

All options are listed in the documentation (you can run [examples](#examples) to help you) !

## Documentation

A whole documentation is available on GitHub : [https://github.com/Its-Just-Nans/csv-to-custom-json/wiki](https://github.com/Its-Just-Nans/csv-to-custom-json/wiki)

And if you really really like it, you can even clone it with :

```sh
git clone https://github.com/Its-Just-Nans/csv-to-custom-json.wiki.git
```

> Legend :
>
> - Just "wow"

## Examples

To see examples, you can do :

```sh
npm run test
```

And see `*.test.js` files to know which code is used !

## About

I coded this instead of doing my homework 😳

## License

Licensed under the MIT License - [LICENSE](LICENSE)
