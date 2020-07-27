// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/index";
var tester = new TextLintTester();
tester.run("かっこ類と隣接する文字の間のスペースの有無", rule, {
    valid: [
        "「良い」",
        "テスト［文章］です",
        `
実装をみてもらうと分かりますが、JavaScriptの\`prototype\`の仕組みをそのまま利用しています。
そのため、特別な実装は必要なく
「拡張する時は\`calculator.prototype\`の代わりに\`calculator.fn\`を拡張してください」
というルールがあるだけとも言えます。
`,
        "[テスト 「文章」 です](https://example)", // ignore Link
        "[テスト 「文章」 です][]" +
        "\n\n" +
        "[テスト 「文章」 です]: https://example.com" // ignore ReferenceDef
    ],
    invalid: [
        {
            text: "「 ダメ」",
            output: "「ダメ」",
            errors: [
                {message: "かっこの外側、内側ともにスペースを入れません。"}
            ]
        },
        {
            text: "これは 「ダメ」です",
            output: "これは「ダメ」です",
            errors: [
                {
                    message: "かっこの外側、内側ともにスペースを入れません。",
                    line: 1,
                    column: 4
                }
            ]
        }, {
            text: `TEST

- TODO

これは 「ダメ」です
`,
            output: `TEST

- TODO

これは「ダメ」です
`,
            errors: [
                {
                    message: "かっこの外側、内側ともにスペースを入れません。",
                    line: 5,
                    column: 4
                }
            ]
        }
    ]
});
