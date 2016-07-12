# textlint-rule-spacing

[textlint](https://textlint.github.io/)のスペース関連のmonorepoです。

日本語周りにおけるスペースの有無を決定するtextlintルールプリセットを提供します。
それぞれのルールは個別のモジュールであるため、必要なルールのみをインストールすることも可能です。

## ルール一覧

### [textlint-rule-ja-no-space-between-half-and-full-width](./packages/textlint-rule-ja-no-space-between-half-and-full-width)

半角文字と全角文字の間にスペースを入れないようにするルール

### [textlint-rule-ja-space-around-code](./packages/textlint-rule-ja-space-around-code)

インラインコードの周りをスペースで囲むかどうかを決めるルール

### [textlint-rule-ja-no-space-between-full-width](./packages/textlint-rule-ja-no-space-between-full-width)

全角文字同士の間のスペースについてのtextlintルール。
全角文字どうしの間にスペースを入れません。

### [textlint-rule-ja-nakaguro-or-halfwidth-space-between-katakana](packages/textlint-rule-ja-nakaguro-or-halfwidth-space-between-katakana)

カタカナ語間の区切り文字についてのtextlintルール。
カタカナ語間は中黒または半角スペースを用いてカタカナ語を区切ります。


### Pull Request待ちのルール

かっこの外側、内側のスペース

    https://github.com/azu/textlint-rule-preset-JTF-style/blob/master/src/3.3.js

感嘆符後のスペース

    https://github.com/azu/textlint-rule-preset-JTF-style/blob/master/src/4.2.1.js

疑問符後のスペース

    https://github.com/azu/textlint-rule-preset-JTF-style/blob/master/src/4.2.2.js

## 開発フロー

1. [packages](./packages)に作成ルール名でディレクトリを作成
2. 作成したディレクトリに通常のnpmモジュール作成と同一のフローで作成

その後、`packages`全体について操作した場合は`lerna`を使う。

- [Lerna · A tool for managing JavaScript projects with multiple packages.](https://lernajs.io/ "Lerna · A tool for managing JavaScript projects with multiple packages.")

全てのpackagesの`npm install`:

    npm run bootstrap


## Tests

以下のコマンドで全てのルールのテストを実行できます。

    npm i -d && npm test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT