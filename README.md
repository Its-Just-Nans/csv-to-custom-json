# csv-to-json

I coded this instead of doing my homework 😳

---

This function can transform `.csv` file to a custom JSON structure :)

## Documentation

### Simple case

You just want to parse your `.csv` without structure :

```javascript
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
    }
    async num5 (value, allValues) {
        // this is a callBack ! (async!)
    }
};

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
```

### Options

#### Debug

> name: `debug`
> default: `false`
> value: boolean: `true` or `false`

This options show the parsed result of your schema (can be useful sometimes)

This options also allow log from the function (example, a mistake)

#### Separator

> name: `separator`
> default: `,`
> values: string

`.csv` stands for "Comma Separated Values", but if you're a rebel, this options is made for you :)

#### Parse

> name: `parse`
> default: `true`
> value: boolean: `true` or `false`

This function desactivate the parsing of values: `function`, `int`, `float`, `string`

With this function all is string

#### Line Call Back

> name: `lineCallBack`
> default: `null`
> value: function (async or not)

It activate the callBack after each line, can be useful if ou want to do a insert in database (for example)

#### Call Back Force

> name: `callBackForce`
> default: `false`
> value: boolean: `true` or `false`

This options allow you to force taking the result of the call back even if it's `undefined` or `null`

Soon :) -> See examples !

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
> - by default, if `num4` is in the firstLine, it will be parsed and replace by the corresponding value.
> - here, the function is in an array and can't be isn't identified by a name, so we can't give to it a special value, sothe function will receive an array with all value of the current line

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
