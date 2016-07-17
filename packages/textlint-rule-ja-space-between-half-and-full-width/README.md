# textlint-rule-ja-space-between-half-and-full-width

半角文字と全角文字のスペースについてのtextlintルール

半角文字と全角文字にスペースを入れるかどうかを指定できます。

デフォルトでは、半角文字と全角文字の間にスペースを入れません。(`"never"`)

    OK: これはUnicode
    NG: これは Unicode

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-ja-space-between-half-and-full-width

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "ja-space-between-half-and-full-width": {
            "space": "never"
        }
    }
}
```

Via CLI

```
textlint --rule ja-space-between-half-and-full-width README.md
```


## Options

- `space`: `"always"` || `"never"`
    - デフォルト: `"never"`
    - スペースを常に 入れる(`"always"`) or 入れない(`"never"`)
    
```json
{
    "rules": {
        "ja-space-between-half-and-full-width": {
            "space": "always"
        }
    }
}
```   

## Changelog

See [Releases page](https://github.com/textlint-ja/textlint-rule-spacing/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/textlint-ja/textlint-rule-spacing/issues).

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
