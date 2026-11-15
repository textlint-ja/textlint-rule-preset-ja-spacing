// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/index";
import markdownPlugin from "@textlint/textlint-plugin-markdown";
var tester = new TextLintTester();
tester.run("Strong周りのスペース", rule, {
    valid: [
        // CommonMarkでは、内側の端が約物で外側が文字だと強調にならないので、スペースを削除しない
        {
            text: "**文章で:** 後半",
            options: {
                before: false,
                after: false
            }
        },
        {
            text: "**文章で。** 後半",
            options: {
                before: false,
                after: false
            }
        },
        {
            text: "前半 **「強調」** 後半",
            options: {
                before: false,
                after: false
            }
        },
        {
            text: "**strong** と日本語の間はスペースを空ける",
            options: {
                before: true,
                after: true
            }
        },
        {
            text: "**strong**と日本語の間はスペースを空けない",
            options: {
                before: false,
                after: false
            }
        },
        {
            text: "**strong** is good in english text.",
            options: {
                before: false,
                after: false
            }
        }
    ],
    invalid: [
        // 内側の端が約物でない側だけスペースを削除する
        {
            text: "これは **文章で:** 後半",
            output: "これは**文章で:** 後半",
            options: {
                before: false,
                after: false
            },
            errors: [
                {
                    message: "強い強調の前にスペースを入れません。"
                }
            ]
        },
        {
            text: "これは **strong** おかしい",
            output: "これは **strong**おかしい",
            options: {
                before: true,
                after: false
            },
            errors: [
                {
                    message: "強い強調の後にスペースを入れません。",
                    column: 16
                }
            ]
        },
        {
            text: "これは **strong** おかしい",
            output: "これは**strong** おかしい",
            options: {
                before: false,
                after: true
            },
            errors: [
                {
                    message: "強い強調の前にスペースを入れません。",
                    column: 4
                }
            ]
        },
        {
            text: "これは **strong** おかしい",
            output: "これは**strong**おかしい",
            options: {
                before: false,
                after: false
            },
            errors: [
                {
                    message: "強い強調の前にスペースを入れません。",
                    column: 4
                },
                {
                    message: "強い強調の後にスペースを入れません。",
                    column: 16
                }
            ]
        },
        {
            text: "これは**strong**おかしい",
            output: "これは **strong** おかしい",
            options: {
                before: true,
                after: true
            },
            errors: [
                {
                    message: "強い強調の前にスペースを入れてください。",
                    column: 3
                },
                {
                    message: "強い強調の後にスペースを入れてください。",
                    column: 14
                }
            ]
        }
    ]
});

// プラグインがmarkdown-cjk-friendlyの仕様で解析したときは、Documentに`syntaxExtensions`を記録する
// 組み込みのMarkdownプラグインと区別するため、独自の拡張子を使う
class CJKFriendlyMarkdownProcessor extends markdownPlugin.Processor {
    availableExtensions() {
        return [".cjk-md"];
    }
    processor(extension) {
        const { preProcess, postProcess } = super.processor(extension);
        return {
            preProcess(text, filePath) {
                const ast = preProcess(text, filePath);
                ast.syntaxExtensions = { cjkFriendlyEmphasis: true };
                return ast;
            },
            postProcess
        };
    }
}
tester.run(
    "Strong周りのスペース（cjkFriendlyEmphasis）",
    {
        plugins: [{ pluginId: "markdown", plugin: { Processor: CJKFriendlyMarkdownProcessor } }],
        rules: [{ ruleId: "ja-space-around-strong", rule }]
    },
    {
        valid: [
            // `_`は前後が文字だと、markdown-cjk-friendlyでも強調にならないので、スペースを削除しない
            {
                text: "これは __strong__ おかしい",
                ext: ".cjk-md"
            }
        ],
        invalid: [
            // markdown-cjk-friendlyでは、内側の端が約物でも強調になるので、スペースを削除する
            {
                text: "前半 **「強調」** 後半",
                output: "前半**「強調」**後半",
                ext: ".cjk-md",
                errors: [
                    {
                        message: "強い強調の前にスペースを入れません。"
                    },
                    {
                        message: "強い強調の後にスペースを入れません。"
                    }
                ]
            }
        ]
    }
);
