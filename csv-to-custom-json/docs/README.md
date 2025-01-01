# Welcome to the csv-to-custom-json wiki

- [How to use](How-to-use.md)
- [How to Options](How-to-options.md)

## Installation

First have [NodeJS](https://nodejs.org/) installed. If it's isn't the case, you can download it on the [official website](https://nodejs.org/en/download/)

Then install my node_module with

```sh
npm install csv-to-custom-json
```

> Caption :
>
> - `npm` stands for `Node Packet Manager`, it can be used to download `node_modules`
> - `csv-to-custom-json` is the name of the `node_modules`

Then if you want to use it, you can for example copy and paste this code :

```js
const converter = require("csv-to-custom-json")

const result = await converter("myfile.csv");

```

> Caption :
>
> - the name `myfile.csv` can be different, just change it with the correct name of your file

Now you are ready to check Options !

## Install as a CLI

```sh
npm install -g csv-to-custom-json
# or directly execute it with npx
npx csv-to-custom-json
```

## Package installed in `node_modules`

If the package is installed as a `node_modules`, you can use CLI with a npm script

Here is the `package.json`

```JSON
{
   ...
   "scripts": {
        "cli": "csv-to-custom-json YOUR_OPTIONS..."
    },
    ...
}
```

> Caption :
>
> - You can now run it with `npm run cli`
> - You can change `YOUR_OPTIONS...` with corrects options

### How to use csv-to-custom-json with CLI

You can use the command

```sh
csv-to-custom-json YOUR_OPTIONS...
```

> Caption :
>
> - You can change `YOUR_OPTIONS...` with corrects options
