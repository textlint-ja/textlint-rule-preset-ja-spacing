// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/index";
var tester = new TextLintTester();
tester.run("Strong周りのスペース", rule, {
    valid: [
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
