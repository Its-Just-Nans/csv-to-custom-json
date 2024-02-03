# How to use csv-to-custom-json options

## Options

To use options, you need to add a third paramters which is an object with options.

Example :

```javascript
const parsedFile = await parseFile("myfile.csv", schema, {
    debug: true,
});
```

## Informations for tests

- For options, when it is written `boolean`, in reality, it can be any `true` value of javascript. Same for `false`.

- command to run test

Test can be run with options :

```sh
npm -s run test -- -n test/callBack_force.test.js callBack_force.test.js
```

> Caption :
>
> - `-s` is to silent npm
> - `--` is used to pass the `-n` parameters to the `test.js` file
> - `-n` is used to allow only useful log
> - `test/callBack_force.test.js` and `callBack_force.test.js` are here to demonstrate that you can omit the `test/` in the string

---

### Debug

> - name: `debug`
> - default: `false`
> - value: boolean: `true` or `false`

This options show the parsed result of your schema (can be useful sometimes)

This options also allow log from the function (example, a mistake)

<details>
<summary>Test</summary>

```sh
npm -s run test test/debug.test.js
```

</details>

---

### Separator

> - name: `separator`
> - default: `,`
> - values: string

`.csv` stands for "Comma Separated Values", but if you're a rebel, this options is made for you :)

<details>
<summary>Test</summary>

```sh
npm -s run test test/custom_separator.test.js
```

</details>

---

### Parse

> - name: `parse`
> - default: `true`
> - value: boolean: `true` or `false`

This function deactivates the parsing of values: `function`, `int`, `float`, `string`

With this function all is string

<details>
<summary>Test</summary>

```sh
npm -s run test test/stop_parse_value.test.js
```

</details>

---

### Line Call Back

> - name: `lineCallBack`
> - default: `null`
> - value: function (async or not)

It activates the callBack after each line, can be useful if ou want to do a insert in database (for example)

<details>
<summary>Test</summary>

```sh
npm -s run test test/line_callBack.test.js
npm -s run test test/line_callBack_value.test.js
npm -s run test test/line_callBack_force.test.js
```

</details>

---

### Call Back Force

> - name: `callBackForce`
> - default: `false`
> - value: boolean: `true` or `false`

This options allow you to force taking the result of the callBackLine even if it's `undefined` or `null`

<details>
<summary>Test</summary>

```sh
npm -s run test test/callBack_force.test.js
npm -s run test test/callBack_force_2.test.js
```

</details>

---

### Array Parse

> - name: `arrayParse`
> - default: `true`
> - value: boolean: `true` or `false`

This options allow you to disable the parsing in an array.

<details>
<summary>Test</summary>

```sh
npm -s run test test/array_parse.test.js
```

</details>

---

### Override First Line

> - name: `overrideFirstLine`
> - default: `false`
> - value: `array of string` or `false`

This options allow you to override the first line.

<details>
<summary>Test</summary>

```sh
npm -s run test test/override_first_line.test.js
```

</details>

### Avoid void line

> - name: `avoidVoidLine`
> - default: `false`
> - value: `boolean`

This options allow you to not parse void line

<details>
<summary>Test</summary>

```sh
npm -s run test test/avoidVoidLine.test.js test/avoidVoidLine2.test.js test/avoidVoidLine3.test.js
```

</details>
