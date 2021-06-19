# How to use this node_modules ?

First have [NodeJS](https://nodejs.org/) installed. If it's isn't the case, you can download it on the [official website](https://nodejs.org/en/download/)

Then install my node_module with

```sh
npm install csv-to-custom-json
```

> Lengend :
>
> - `npm` stands for `Node Packet Manager`, it can be used to download `node_modules`
> - `csv-to-custom-json` is the name of the `node_modules`

Then if you want to use it, you can for example copy and paste this code :

```js
const converter = require("csv-to-custom-json")

const result = await converter("myfile.csv");

```

> Lengend :
>
> - the name `myfile.csv` can be different, just change it with the correct name of your file

Now you are ready to check Options !
