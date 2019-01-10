<p align="center">
  <a href="https://www.npmjs.org/package/ts-dynamic-plugin"><img src="https://img.shields.io/npm/v/ts-dynamic-plugin.svg?style=flat" alt="npm"></a>
  <a href="https://www.npmjs.com/package/ts-dynamic-plugin"><img src="https://img.shields.io/npm/dt/ts-dynamic-plugin.svg" alt="downloads" ></a>
  <a href="https://travis-ci.org/Jetsly/ts-dynamic-plugin"><img src="https://travis-ci.org/Jetsly/ts-dynamic-plugin.svg?branch=master" alt="travis"></a>
</p>

# ts-dynamic-plugin

> Modular dynamic plugin for TypeScript

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Examples](#examples)
- [License](#license)


## Installation

For use with [node](http://nodejs.org) and [npm](https://npmjs.com):

```sh
npm install --save-dev ts-dynamic-plugin
```

## Usage
### With ts-loader

```js
// webpack.config.js
const tsDynamicPluginFactory = require('ts-dynamic-plugin')

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(jsx|tsx|js|ts)$/,
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [ tsDynamicPluginFactory( /** options */) ]
          }),
        },
        exclude: /node_modules/
      }
    ]
  },
  // ...
}
```

## Examples

```js
tsDynamicPluginFactory({
  funcName:'formatLocale',
  importDecla:`import { formatLocale } from './utils/locale'` 
})
```

```js
const word = formatLocale('test')
/** will auto add import **/
import { formatLocale } from './utils/locale'
const word = formatLocale('test')
```


## License

[MIT License](LICENSE.md)
