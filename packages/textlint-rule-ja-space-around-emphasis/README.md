# textlint-rule-ja-space-around-emphasis [![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)

強調の周りをスペースで囲むかどうかを決めるtextlintルール

強調とは[TxtAST](https://github.com/textlint/textlint/blob/master/docs/txtnode.md "TxtAST")の`Emphasis` nodeのことです。

このルールでは、強調の前後が日本語である場合に半角スペースを入れるかを決定します。
オプションでスペースの有無を決定できます。

    *emphasis* と日本語の間はスペースを空ける
    *emphasis*と日本語の間はスペースを空けない

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-ja-space-around-emphasis

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "ja-space-around-emphasis": true
    }
}
```

Via CLI

```
textlint --rule ja-space-around-emphasis README.md
```

## Options

- `before`: `boolean`
    - デフォルト: `false`
    - `true`なら、`Emphasis`の前に半角スペースを入れる
- `after`: `boolean`
    - デフォルト: `false`
    - `true`なら、`Emphasis`の後に半角スペースを入れる

デフォルト値は次のようになります。

```json
{
    "rules": {
        "ja-space-around-emphasis": {
            "before": false,
            "after": false
        }
    }
}
```

## Fixable

[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)

`textlint --fix`の自動修正に対応しています。

## Changelog

See [Releases page](https://github.com/textlint-ja/textlint-rule-preset-ja-spacing/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/textlint-ja/textlint-rule-preset-ja-spacing/issues).

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
