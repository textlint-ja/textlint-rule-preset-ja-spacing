# textlint-rule-ja-nakaguro-or-halfwidth-space-between-katakana

カタカナ語間の区切り文字についてのtextlintルール
カタカナ語間は中黒または半角スペースを用いてカタカナ語を区切ります。

    OK: インターフェース・ブラウザ
    NG: インターフェース　ブラウザ

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-ja-nakaguro-or-halfwidth-space-between-katakana

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "ja-nakaguro-or-halfwidth-space-between-katakana": true
    }
}
```

Via CLI

```
textlint --rule ja-nakaguro-or-halfwidth-space-between-katakana README.md
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
