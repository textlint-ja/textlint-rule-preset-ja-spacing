// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/index";

var tester = new TextLintTester();
tester.run("疑問符(?)", rule, {
    valid: [
        "【原文】Does the reader understand the document?",
        "【訳文】読者は文書の内容を理解しているでしょうか。",
        "オプションを変更しますか？",
        "A 社の成功の秘密とは？　この本ではそれをご紹介します。",
        "どう操作したらよいのか？というユーザーの疑問に答えます。",
        "# どう操作したらよいのか？という",
        "![どう操作したらよいのか？という](https://example.com)",
        "[どう操作したらよいのか？という](https://example.com)",
        "> どう操作したらよいのか？という",
        "**どう操作したらよいのか？という**",
        "[どう操作したらよいのか？という][]",
        "[^どう操作したらよいのか？という]"
    ],
    invalid: [
        {
            text: "驚きの速さ！？ これが新製品のキャッチコピーでした？　これは問題なし",
            output: "驚きの速さ！？　これが新製品のキャッチコピーでした？　これは問題なし",
            errors: [
                {
                    message: "文末に疑問符を使用し、後に別の文が続く場合は、直後に全角スペースを挿入します。",
                    column: 8
                }
            ]
        },
        {
            text: "どう操作したらよいのか？ というユーザーの疑問に答えます。",
            output: "どう操作したらよいのか？　というユーザーの疑問に答えます。",
            errors: [
                {
                    message: "文末に疑問符を使用し、後に別の文が続く場合は、直後に全角スペースを挿入します。",
                    line: 1,
                    column: 13
                }
            ]
        }
    ]
});
