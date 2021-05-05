// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/index";
var tester = new TextLintTester();
tester.run("InlineCode周りのスペース", rule, {
    valid: [

        {
            text: "`code` と日本語の間はスペースを空ける",
            options: {
                before: true,
                after: true
            },
        },
        {
            text: "`code`と日本語の間はスペースを空けない",
            options: {
                before: false,
                after: false
            },
        },
        {
            text: "`code` is good in english text.",
            options: {
                before: false,
                after: false
            },
        }
    ],
    invalid: [
        // before only
        {
            text: "これは `code` おかしい",
            output: "これは `code`おかしい",
            options: {
                before: true,
                after: false
            },
            errors: [
                {
                    message: "インラインコードの後にスペースを入れません。",
                    column: 12
                }
            ]
        },
        // after only
        {
            text: "これは `code` おかしい",
            output: "これは`code` おかしい",
            options: {
                before: false,
                after: true
            },
            errors: [
                {
                    message: "インラインコードの前にスペースを入れません。",
                    column: 4
                }
            ]
        },
        {
            text: "これは `code` おかしい",
            output: "これは`code`おかしい",
            options: {
                before: false,
                after: false
            },
            errors: [
                {
                    message: "インラインコードの前にスペースを入れません。",
                    column: 4
                },
                {
                    message: "インラインコードの後にスペースを入れません。",
                    column: 12
                }
            ]
        },
        {
            text: "これは`code`おかしい",
            output: "これは `code` おかしい",
            options: {
                before: true,
                after: true
            },
            errors: [
                {
                    message: "インラインコードの前にスペースを入れてください。",
                    column: 3
                },
                {
                    message: "インラインコードの後にスペースを入れてください。",
                    column: 10
                }
            ]
        },
             {
            text: "これは`code`おかしい",
            output: "これは`code` おかしい",
            options: {
                before: false,
                after: true
            },
            errors: [
                {
                    message: "インラインコードの後にスペースを入れてください。",
                    index: 9
                }
            ]
        },
    ]
});
