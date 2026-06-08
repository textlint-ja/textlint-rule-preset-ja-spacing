// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/index";
var tester = new TextLintTester();
const MESSAGE = "スラッシュの前後にスペースを入れません。";
tester.run("スラッシュ周りのスペース", rule, {
    valid: [
        "struct/enum",
        "これはstruct/enumです。",
        "HTTP/2",
        "1/2",
        "https://example.com/path",
        "`struct / enum`",
        "./path/to/file",
        "[struct / enum](https://example.com)",
        "[struct / enum][]" + "\n\n" + "[struct / enum]: https://example.com"
    ],
    invalid: [
        {
            text: "struct / enum",
            output: "struct/enum",
            errors: [
                {
                    message: MESSAGE,
                    column: 7
                }
            ]
        },
        {
            text: "struct/ enum",
            output: "struct/enum",
            errors: [
                {
                    message: MESSAGE,
                    column: 7
                }
            ]
        },
        {
            text: "struct /enum",
            output: "struct/enum",
            errors: [
                {
                    message: MESSAGE,
                    column: 7
                }
            ]
        },
        {
            text: "struct　/　enum",
            output: "struct/enum",
            errors: [
                {
                    message: MESSAGE,
                    column: 7
                }
            ]
        },
        {
            text: "struct  /  enum",
            output: "struct/enum",
            errors: [
                {
                    message: MESSAGE,
                    column: 7
                }
            ]
        },
        {
            text: "struct　/enum",
            output: "struct/enum",
            errors: [
                {
                    message: MESSAGE,
                    column: 7
                }
            ]
        },
        {
            text: "struct/　enum",
            output: "struct/enum",
            errors: [
                {
                    message: MESSAGE,
                    column: 7
                }
            ]
        },
        {
            text: "これはstruct / enumです。",
            output: "これはstruct/enumです。",
            errors: [
                {
                    message: MESSAGE
                }
            ]
        },
        {
            text: "日本語 / 日本語",
            output: "日本語/日本語",
            errors: [
                {
                    message: MESSAGE,
                    column: 4
                }
            ]
        },
        {
            text: "struct / 日本語",
            output: "struct/日本語",
            errors: [
                {
                    message: MESSAGE,
                    column: 7
                }
            ]
        },
        {
            text: "日本語 / enum",
            output: "日本語/enum",
            errors: [
                {
                    message: MESSAGE,
                    column: 4
                }
            ]
        },
        {
            text: "（A / B）",
            output: "（A/B）",
            errors: [
                {
                    message: MESSAGE,
                    column: 3
                }
            ]
        },
        {
            text: "A / B / C",
            output: "A/B/C",
            errors: [
                {
                    message: MESSAGE,
                    column: 2
                },
                {
                    message: MESSAGE,
                    column: 6
                }
            ]
        },
        {
            text: "/ root",
            output: "/root",
            errors: [
                {
                    message: MESSAGE,
                    column: 1
                }
            ]
        },
        {
            text: "root /",
            output: "root/",
            errors: [
                {
                    message: MESSAGE,
                    column: 5
                }
            ]
        }
    ]
});
