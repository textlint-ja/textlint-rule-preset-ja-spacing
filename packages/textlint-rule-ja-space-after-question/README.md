# textlint-rule-ja-space-after-question

疑問符の直後のスペースについてのtexlintルール

文末に疑問符を使用し、後に別の文が続く場合は、直後に全角スペースを挿入します。
文中に疑問符を使用する場合はスペースを挿入しません。

    OK: 驚きの速さ！？　これが新製品のキャッチコピーでした？
    OK: どう操作したらよいのか？というユーザーの疑問に答えます。
    
    NG: 驚きの速さ！？ これが新製品のキャッチコピーでした？
    NG: どう操作したらよいのか？ というユーザーの疑問に答えます。

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-ja-space-after-question

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "ja-space-after-question": true
    }
}
```

Via CLI

```
textlint --rule ja-space-after-question README.md
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
