# csv-to-custom-json &middot; [![npm version](https://img.shields.io/npm/v/csv-to-custom-json.svg)](https://www.npmjs.org/package/csv-to-custom-json)

- <https://its-just-nans.github.io/csv-to-custom-json/> - demo
- <https://www.npmjs.com/package/csv-to-custom-json> - npm
- <https://github.com/Its-Just-Nans/csv-to-custom-json-python> - python version

Transform your `.csv` file to a **custom** JSON structure :) ! In browser and NodeJS !

<details>
<summary>Click to expand</summary>

- [csv-to-custom-json · ](#csv-to-custom-json--)
  - [Simple documentation](#simple-documentation)
    - [Simple case](#simple-case)
    - [Structure JSON](#structure-json)
    - [Options](#options)
  - [Documentation](#documentation)
  - [Examples](#examples)
  - [Issues](#issues)
  - [About](#about)
  - [License](#license)

</details>

## Simple documentation

### Simple case

You just want to parse your `.csv` without structure :

```javascript
const parseFile = require("csv-to-custom-json");
const parsed = await parseFile(linkFile);
```

### Structure JSON

First you need to create the schema of your future JSON

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

This program allow you to create complex structured JSON, like this :

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

To use options, you need to add a third parameters which is an object with options.

Example :

```javascript
const parsedFile = await parseFile("myfile.csv", schema, {
    debug: true,
});
```

All options are listed in the documentation (you can run [examples](#examples) to help you) !

## Documentation

A whole documentation is available on [./docs](./docs)

## Examples

To see examples, you can do :

```sh
npm run test
```

And see `*.test.js` files to know which code is used !

## Issues

Oh no 😟 !

Go here [csv-to-custom-json/issues](https://github.com/Its-Just-Nans/csv-to-custom-json/issues)

## About

I coded this instead of doing my homework 😳

You can discuss here : [csv-to-custom-json/discussions](https://github.com/Its-Just-Nans/csv-to-custom-json/discussions)

## License

Licensed under the MIT License - [LICENSE](LICENSE)
