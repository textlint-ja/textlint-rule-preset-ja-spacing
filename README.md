# textlint-rule-spacing

[textlint](https://textlint.github.io/)のスペース関連のmonorepoです。
全角文字と半角文字の間にスペースをいれるかどうかなどのルールを提供します。

## ルール

### [textlint-rule-ja-no-space-between-half-and-full-width](./packages/textlint-rule-ja-no-space-between-half-and-full-width)

半角文字と全角文字の間にスペースを入れないようにするルール

### [textlint-rule-ja-space-around-code](./packages/textlint-rule-ja-space-around-code)

インラインコードの周りをスペースで囲むかどうかを決めるルール

### Pull Request待ちのルール

全角文字同士の間のスペース

    https://github.com/azu/textlint-rule-preset-JTF-style/blob/master/src/3.1.2.js

カタカナ語間のスペース

    半角 または 中黒
    https://github.com/azu/textlint-rule-preset-JTF-style/blob/master/src/3.2.js

かっこの外側、内側のスペース

    https://github.com/azu/textlint-rule-preset-JTF-style/blob/master/src/3.3.js

感嘆符後のスペース

    https://github.com/azu/textlint-rule-preset-JTF-style/blob/master/src/4.2.1.js

疑問符後のスペース

    https://github.com/azu/textlint-rule-preset-JTF-style/blob/master/src/4.2.2.js


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