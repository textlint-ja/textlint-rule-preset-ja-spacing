// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/index";
var tester = new TextLintTester();
tester.run("全角文字と半角文字の間", rule, {
    valid: [
        // never
        "JTF標準",
        {
            text: "JTF標準",
            options: {
                space: "never"
            },
        },
        "This is a pen.",
        "1. `./*.*`にマッチするファイルを取得 = Readable Stream",
        `[CONTRIBUTING.md](./CONTRIBUTING.md)に、書籍で扱うべきプラグインアーキテクチャのProposalの書き方や
Pull Request、コミットのやりかたなどが書かれています。`,
        // need space
        {
            text: "JTF 標準",
            options: {
                space: "always"
            }
        },
        {
            text: "This is a pen",
            options: {
                space: "always"
            }
        },
        {
            text: "日本語と english の間に半角スペースを入れる",
            options: {
                space: "always"
            }
        },
        // ignore
        {
            text: "# JTF 標準",
            options: {
                space: "never"
            },
        },
    ],
    invalid: [
        {
            text: "JTF 標準",
            output: "JTF標準",
            errors: [
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れません。",
                    column: 4
                }
            ]
        },
        {
            text: "JTF 標準",
            output: "JTF標準",
            options: {
                space: "never"
            },
            errors: [
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れません。",
                    column: 4
                }
            ]
        },
        {
            text: "これは Unicode",
            output: "これはUnicode",
            errors: [
                {message: "原則として、全角文字と半角文字の間にスペースを入れません。"}
            ]
        },
        {
            text: "これは　Unicode",
            output: "これはUnicode",
            errors: [
                {message: "原則として、全角文字と半角文字の間にスペースを入れません。"}
            ]
        },
        // need space
        {
            text: "JTF標準",
            output: "JTF 標準",
            options: {
                space: "always"
            },
            errors: [
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れます。",
                    column: 3
                }
            ]
        },
        {
            text: "これはUnicode",
            output: "これは Unicode",
            options: {
                space: "always"
            },
            errors: [
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れます。",
                    column: 3
                }
            ]
        },
        {
            text: "日本語とenglishの間に半角スペースを入れる",
            output: "日本語と english の間に半角スペースを入れる",
            options: {
                space: "always"
            },
            errors: [
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れます。",
                    column: 4
                },
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れます。",
                    column: 11
                }
            ]
        },
    ]
});
