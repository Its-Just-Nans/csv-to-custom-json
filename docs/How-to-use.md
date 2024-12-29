# How to use csv-to-custom-json

## With requirejs

Just import the function and use it !

```js
const converter = require("csv-to-custom-json")


const doConversion = async () => {
    const result = await converter("myfile.csv");
}

doConversion();

```

## With ESM import

We need to import the front version :

```js
import converter from "csv-to-custom-json/front"

const doConversion = async () => {
    // we pass an array which contains all lines
    const result = await converter([
        "num1,num2,num3,num4",
        "1,2,3,4",
        "4,5,6,7",
        "7,8,9,10"
    ]);
}

doConversion();
```

> Caption :
>
> - the difference with the normal file :
>   - no `fs`
>   - no `readline`
>   - we pass an array of line and not a link

## How to use the schema

Create a schema variable and put it as second parameter !

Example with a simple `csv` :

```csv
num1,num2,num3
1,2,3
4,5,6
7,8,9
```

```js
const schema = {
    num1: "string",
    num2(item) {
        return null;
    },
    num3: "int"
};
const result = await converter("myfile.csv", schema);
```

> Caption :
>
> - ad you can see the schema can contains function, or string with the type
> - the values with type will be parsed
> - attribute of the object are the word in the first line of the csv

## More complexe schema

It's the same as a simple schema :

```js
const schema = {
    obj1: {
        obj2: {
            num4: "string"
        }
    },
    num2: "",
    num3: ""
};
const result = await converter("myfile.csv", schema);
```

If you want to check some real case, check out the folder `test` in the [GitHub repository](https://github.com/Its-Just-Nans/csv-to-custom-json)

If you want to see and use options check that documentation : [How-to-options](./How-to-options.md)

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
};
```

> Caption:
>
> - by default, `num4` in the firstLine will be parsed and replace by the corresponding value.
> - functions are in an array and can't be identified by a name, so we can't give to it a value parameter, so the function will receive an array with all value of the current line

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
