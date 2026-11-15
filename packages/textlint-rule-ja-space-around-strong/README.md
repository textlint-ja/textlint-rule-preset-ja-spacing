# textlint-rule-ja-space-around-strong [![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)

強い強調の周りをスペースで囲むかどうかを決めるtextlintルール

強い強調とは[TxtAST](https://github.com/textlint/textlint/blob/master/docs/txtnode.md "TxtAST")の`Strong` nodeのことです。

このルールでは、強い強調の前後が日本語である場合に半角スペースを入れるかを決定します。
オプションでスペースの有無を決定できます。

    **strong** と日本語の間はスペースを空ける
    **strong**と日本語の間はスペースを空けない

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-ja-space-around-strong

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "ja-space-around-strong": true
    }
}
```

Via CLI

```
textlint --rule ja-space-around-strong README.md
```

## Options

- `before`: `boolean`
    - デフォルト: `false`
    - `true`なら、`Strong`の前に半角スペースを入れる
- `after`: `boolean`
    - デフォルト: `false`
    - `true`なら、`Strong`の後に半角スペースを入れる
- `cjkFriendlyEmphasis`: `boolean`
    - デフォルト: `false`
    - `true`なら、Markdownが[markdown-cjk-friendly](https://github.com/tats-u/markdown-cjk-friendly)の仕様で解析される前提で、内側の端が約物でもスペースを削除する

デフォルト値は次のようになります。

```json
{
    "rules": {
        "ja-space-around-strong": {
            "before": false,
            "after": false,
            "cjkFriendlyEmphasis": false
        }
    }
}
```

### スペースを削除しない場合

`before`または`after`が`false`でも、スペースを削除すると強い強調として解析されなくなる場合は、スペースを削除しません。

- `_`で囲んだ強い強調（例: `日本語 __強い強調__ 日本語`）: 前後が文字の`_`は、CommonMarkでも[markdown-cjk-friendly](https://github.com/tats-u/markdown-cjk-friendly)でも強い強調になりません
- `cjkFriendlyEmphasis`が`false`のとき、強い強調の内側の端が約物（例: `**文章で:** 後半`の`:`や、`**「強い強調」**`の`「`と`」`）の側: CommonMarkとGFMでは、内側の端が約物で外側が文字だと強い強調になりません

### `cjkFriendlyEmphasis`の例

`before`と`after`が`false`のとき、`前半 **「強調」** 後半`は次のように扱われます。

| `cjkFriendlyEmphasis` | 結果 | 理由 |
| --- | --- | --- |
| `false`（デフォルト） | エラーにしない（スペースを残す） | CommonMarkとGFMでは、`前半**「強調」**後半`は強い強調にならず、`**`がそのまま表示されるため |
| `true` | エラーにして、`前半**「強調」**後半`に修正する | markdown-cjk-friendlyでは、`前半**「強調」**後半`も強い強調になるため |

それぞれの仕様で`前半**「強調」**後半`を表示すると、次のHTMLになります。

- CommonMark（GitHubなど）: `<p>前半**「強調」**後半</p>`
- markdown-cjk-friendly（VitePressやRspressなど）: `<p>前半<strong>「強調」</strong>後半</p>`

### textlint 16での設定

textlint 16以降の`@textlint/textlint-plugin-markdown`には、Markdownをmarkdown-cjk-friendlyの仕様で解析する`cjkFriendlyEmphasis`オプションがあります。
Markdownプラグインのオプションは、ルールには伝わりません。
VitePressやRspressのように、markdown-cjk-friendlyで表示する文書では、Markdownプラグインとこのルールの両方で`cjkFriendlyEmphasis`を`true`にしてください。

```json
{
    "plugins": {
        "@textlint/markdown": {
            "cjkFriendlyEmphasis": true
        }
    },
    "rules": {
        "ja-space-around-strong": {
            "cjkFriendlyEmphasis": true
        }
    }
}
```

`textlint-rule-preset-ja-spacing`から使う場合は、`"preset-ja-spacing": { "ja-space-around-strong": { "cjkFriendlyEmphasis": true } }`のように指定します。presetではこのルールはデフォルトで無効なので、オブジェクトでオプションを指定すると有効になります。

GitHubのようにCommonMarkやGFMで表示する文書では、どちらも`false`のままにしてください。

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
