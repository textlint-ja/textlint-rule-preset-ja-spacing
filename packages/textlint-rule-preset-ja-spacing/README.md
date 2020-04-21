# textlint-rule-preset-ja-spacing [![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)


日本語周りにおけるスペースの有無を決定するtextlintルールプリセットです。

含まれているルールに関しては以下を参照してください。

- [textlint-ja/textlint-rule-preset-ja-spacing: スペース周りのスタイルを扱うtextlintルール集](https://github.com/textlint-ja/textlint-rule-preset-ja-spacing "textlint-ja/textlint-rule-preset-ja-spacing: スペース周りのスタイルを扱うtextlintルール集")

それぞれのルールは個別のモジュールであるため、必要なルールのみをインストールすることも可能です。

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-preset-ja-spacing

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "preset-ja-spacing": true
    }
}
```

Via CLI

```
textlint --preset ja-spacing README.md
```


## Options

デフォルトでは、[textlint-rule-ja-space-around-code](https://github.com/textlint-ja/textlint-rule-preset-ja-spacing/tree/master/packages/textlint-rule-ja-space-around-code)は無効になっています。

次のように設定することで、プリセットに含まれるすべてのルールを有効にできます。

```json
{
    "rules": {
        "preset-ja-spacing": {
            "ja-space-around-code": {
                "before": false,
                "after": false
            }
        }
    }
}
```

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
