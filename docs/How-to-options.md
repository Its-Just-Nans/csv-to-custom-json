# How to use csv-to-custom-json options

## Options

To use options, you need to add a third paramters which is an object with options.

Example :

```javascript
const parsedFile = await parseFile("myfile.csv", schema, {
    debug: true,
});
```

For options, when I say `boolean`, in reality, it can be any `true` value of javascript. Same for `false`.

### Debug

> - name: `debug`
> - default: `false`
> - value: boolean: `true` or `false`

This options show the parsed result of your schema (can be useful sometimes)

This options also allow log from the function (example, a mistake)

### Separator

> - name: `separator`
> - default: `,`
> - values: string

`.csv` stands for "Comma Separated Values", but if you're a rebel, this options is made for you :)

### Parse

> - name: `parse`
> - default: `true`
> - value: boolean: `true` or `false`

This function desactivate the parsing of values: `function`, `int`, `float`, `string`

With this function all is string

### Line Call Back

> - name: `lineCallBack`
> - default: `null`
> - value: function (async or not)

It activate the callBack after each line, can be useful if ou want to do a insert in database (for example)

### Call Back Force

> - name: `callBackForce`
> - default: `false`
> - value: boolean: `true` or `false`

This options allow you to force taking the result of the call back even if it's `undefined` or `null`

### Array Parse

> - name: `arrayParse`
> - default: `true`
> - value: boolean: `true` or `false`

This options allow you to disable the parsing in an array.

### Override First Line

> - name: `overrideFirstLine`
> - default: `false`
> - value: `array of string` or `false`

This options allow you to override the first line.
