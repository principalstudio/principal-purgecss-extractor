# Principal Purgecss extractor

Improve version of [purgecss-from-pug](https://github.com/FullHuman/purgecss/tree/master/packages/purgecss-from-pug) with fix and support for BEM mixins.

**Currently, only support pug files**

## Installation

```bash
npm i -D @principalstudio/principal-purgecss-extractor
```

## Usage

See [https://purgecss.com/extractors.html](https://purgecss.com/extractors.html)


For example with PostCSS

```js
const principalExtractor = require('principal-purgecss-extractor');
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    purgecss({
      content: ['./**/*.pug'],
      extractors: [
        {
          extractor: principalExtractor,
          extensions: ['pug'],
        },
      ],
    }),
  ]
}
```