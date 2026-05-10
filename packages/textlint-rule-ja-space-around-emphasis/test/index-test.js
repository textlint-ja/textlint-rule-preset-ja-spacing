// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/index";
var tester = new TextLintTester();
tester.run("Emphasis周りのスペース", rule, {
    valid: [
        {
            text: "*emphasis* と日本語の間はスペースを空ける",
            options: {
                before: true,
                after: true
            }
        },
        {
            text: "*emphasis*と日本語の間はスペースを空けない",
            options: {
                before: false,
                after: false
            }
        },
        {
            text: "*emphasis* is good in english text.",
            options: {
                before: false,
                after: false
            }
        }
    ],
    invalid: [
        {
            text: "これは *emphasis* おかしい",
            output: "これは *emphasis*おかしい",
            options: {
                before: true,
                after: false
            },
            errors: [
                {
                    message: "強調の後にスペースを入れません。",
                    column: 16
                }
            ]
        },
        {
            text: "これは *emphasis* おかしい",
            output: "これは*emphasis* おかしい",
            options: {
                before: false,
                after: true
            },
            errors: [
                {
                    message: "強調の前にスペースを入れません。",
                    column: 4
                }
            ]
        },
        {
            text: "これは *emphasis* おかしい",
            output: "これは*emphasis*おかしい",
            options: {
                before: false,
                after: false
            },
            errors: [
                {
                    message: "強調の前にスペースを入れません。",
                    column: 4
                },
                {
                    message: "強調の後にスペースを入れません。",
                    column: 16
                }
            ]
        },
        {
            text: "これは*emphasis*おかしい",
            output: "これは *emphasis* おかしい",
            options: {
                before: true,
                after: true
            },
            errors: [
                {
                    message: "強調の前にスペースを入れてください。",
                    column: 3
                },
                {
                    message: "強調の後にスペースを入れてください。",
                    column: 14
                }
            ]
        }
    ]
});
