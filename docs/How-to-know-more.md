# Tricks

## Array Trick

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

## Array schema Trick

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
