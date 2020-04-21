# textlint-rule-ja-no-space-around-parentheses

かっこ類と隣接する文字のスペースについてのtextlintルール

かっこの外側、内側ともにスペースを入れません。

    OK: 「良いですね」
    NG: 「 ダメですね 」

かっことして次の記号を扱います。

> []（）［］「」『』

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-ja-no-space-around-parentheses

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "ja-no-space-around-parentheses": true
    }
}
```

Via CLI

```
textlint --rule ja-no-space-around-parentheses README.md
```

## Fixable

[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)

`textlint --fix`の自動修正に対応しています。

## Changelog

See [Releases page](https://github.com/extlint-ja/textlint-rule-preset-ja-spacing/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/extlint-ja/textlint-rule-preset-ja-spacing/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
