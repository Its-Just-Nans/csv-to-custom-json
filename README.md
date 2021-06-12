# csv-to-custom-json

Transform your `.csv` file to a custom JSON structure :) !

<details>
<summary>Click to expand</summary>

<!-- TOC -->
- [csv-to-custom-json](#csv-to-custom-json)
  - [Documentation](#documentation)
    - [Simple case](#simple-case)
    - [Structure JSON](#structure-json)
    - [Options](#options)
      - [Debug](#debug)
      - [Separator](#separator)
      - [Parse](#parse)
      - [Line Call Back](#line-call-back)
      - [Call Back Force](#call-back-force)
      - [Array Parse](#array-parse)
      - [Override First Line](#override-first-line)
  - [Tricks](#tricks)
    - [Array Trick](#array-trick)
    - [Array schema Trick](#array-schema-trick)
  - [Examples](#examples)
  - [About](#about)
  - [Licence](#licence)

</details>

## Documentation

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

For options, when I say `boolean`, in reality, it can be any `true` value of javascript. Same for `false`

You can see [examples](#examples) to help you !

#### Debug

> - name: `debug`
> - default: `false`
> - value: boolean: `true` or `false`

This options show the parsed result of your schema (can be useful sometimes)

This options also allow log from the function (example, a mistake)

#### Separator

> - name: `separator`
> - default: `,`
> - values: string

`.csv` stands for "Comma Separated Values", but if you're a rebel, this options is made for you :)

#### Parse

> - name: `parse`
> - default: `true`
> - value: boolean: `true` or `false`

This function desactivate the parsing of values: `function`, `int`, `float`, `string`

With this function all is string

#### Line Call Back

> - name: `lineCallBack`
> - default: `null`
> - value: function (async or not)

It activate the callBack after each line, can be useful if ou want to do a insert in database (for example)

#### Call Back Force

> - name: `callBackForce`
> - default: `false`
> - value: boolean: `true` or `false`

This options allow you to force taking the result of the call back even if it's `undefined` or `null`

#### Array Parse

> - name: `arrayParse`
> - default: `true`
> - value: boolean: `true` or `false`

This options allow you to disable the parsing in an array.

#### Override First Line

> - name: `overrideFirstLine`
> - default: `false`
> - value: `array of string` or `false`

This options allow you to override the first line.

## Tricks

### Array Trick

If you have an simple array (not with object), the function can even parse your fields

```javascript
const schema = {
    num1: [
        "num4",
        "text",
        function (allValues) {
            return `toto${allValues.toString()}`;
        },
        () => "arrow"
    ]
}
```

> Legend:
>
> - by default, `num4` in the firstLine will be parsed and replace by the corresponding value.
> - functions are in an array and can't be identified by a name, so we can't give to it a value paramter, so the function will receive an array with all value of the current line

### Array schema Trick

Fun-fact : schema can even be an array !

```javascript
const schema = [
    "num4",
    "text",
    function (allValues) {
        return `toto${allValues.toString()}`;
    },
    () => "arrow"
];
```

## Examples

To see examples, you can do :

```sh
npm run test
```

And see `test.js` to know what code is used

## About

I coded this instead of doing my homework 😳

## Licence

TODO
