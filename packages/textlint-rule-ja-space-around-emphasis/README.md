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
- `cjkFriendlyEmphasis`: `boolean`
    - デフォルト: `false`
    - `true`なら、Markdownが[markdown-cjk-friendly](https://github.com/tats-u/markdown-cjk-friendly)の仕様で解析される前提で、内側の端が約物でもスペースを削除する

デフォルト値は次のようになります。

```json
{
    "rules": {
        "ja-space-around-emphasis": {
            "before": false,
            "after": false,
            "cjkFriendlyEmphasis": false
        }
    }
}
```

### 例外: スペースがあってもエラーにしない場合

`before`や`after`が`false`のとき、このルールは強調の前後にあるスペースをエラーにして、`--fix`で削除します。
ただし、スペースを削除すると強調として表示されなくなる場合は、エラーにせず、スペースを残します。
削除すると、記号の`*`や`_`がそのまま文章に表示されてしまうためです。

| 入力 | スペースを削除した場合 | CommonMark（GitHubなど）での表示 |
| --- | --- | --- |
| `日本語 _強調_ 日本語` | `日本語_強調_日本語` | `日本語_強調_日本語`（強調にならない） |
| `*文章で:* 後半` | `*文章で:*後半` | `*文章で:*後半`（強調にならない） |

- `_`で囲んだ強調: 前後が文字の`_`は、CommonMarkでも[markdown-cjk-friendly](https://github.com/tats-u/markdown-cjk-friendly)でも強調になりません。そのため、`_`の場合は常にスペースを残します
- 内側の端が約物の強調: `*文章で:*`のように、閉じる`*`の内側が約物（`:`）で外側が文字だと、CommonMarkとGFMでは強調になりません。`*「強調」*`の`「`と`」`も同じです。markdown-cjk-friendlyでは強調になるので、`cjkFriendlyEmphasis`が`true`ならスペースを削除します

### `cjkFriendlyEmphasis`の例

`before`と`after`が`false`のとき、`前半 *「強調」* 後半`は次のように扱われます。

| `cjkFriendlyEmphasis` | 結果 | 理由 |
| --- | --- | --- |
| `false`（デフォルト） | エラーにしない（スペースを残す） | CommonMarkとGFMでは、`前半*「強調」*後半`は強調にならず、`*`がそのまま表示されるため |
| `true` | エラーにして、`前半*「強調」*後半`に修正する | markdown-cjk-friendlyでは、`前半*「強調」*後半`も強調になるため |

それぞれの仕様で`前半*「強調」*後半`を表示すると、次のHTMLになります。

- CommonMark（GitHubなど）: `<p>前半*「強調」*後半</p>`
- markdown-cjk-friendly（VitePressやRspressなど）: `<p>前半<em>「強調」</em>後半</p>`

### textlintのMarkdownプラグインの設定

textlintのMarkdownプラグイン（`@textlint/textlint-plugin-markdown`）には、textlint 16から、Markdownをmarkdown-cjk-friendlyの仕様で解析する`cjkFriendlyEmphasis`オプションがあります。
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
        "ja-space-around-emphasis": {
            "cjkFriendlyEmphasis": true
        }
    }
}
```

`textlint-rule-preset-ja-spacing`から使う場合は、`"preset-ja-spacing": { "ja-space-around-emphasis": { "cjkFriendlyEmphasis": true } }`のように指定します。presetではこのルールはデフォルトで無効なので、オブジェクトでオプションを指定すると有効になります。

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
