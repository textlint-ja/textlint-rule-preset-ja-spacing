# textlint-rule-ja-space-around-link [![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)

リンクの周りをスペースで囲むかどうかを決めるtextlintルール

リンクとは[TxtAST](https://github.com/textlint/textlint/blob/master/docs/txtnode.md "TxtAST")の`Link` nodeのことです。

このルールでは、リンクの前後が日本語である場合に半角スペースを入れるかを決定します。
オプションでスペースの有無を決定できます。

    [README](README.md) と日本語の間はスペースを空ける
    [README](README.md)と日本語の間はスペースを空けない

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-ja-space-around-link

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "ja-space-around-link": true
    }
}
```

Via CLI

```
textlint --rule ja-space-around-link README.md
```


## Options

- `before`: `boolean`
    - デフォルト: `false`
    - `true`なら、`Link`の前に半角スペースを入れる
- `after`: `boolean`
    - デフォルト: `false`
    - `true`なら、`Link`の後に半角スペースを入れる

デフォルト値は次のようになります。

```json
{
    "rules": {
        "ja-space-around-link": {
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

- [github/0x6b](https://github.com/0x6b)

## License

MIT © 0x6b
