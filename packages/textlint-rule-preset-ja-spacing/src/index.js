// LICENSE : MIT
"use strict";
module.exports = {
    rules: {
        "ja-nakaguro-or-halfwidth-space-between-katakana": require("textlint-rule-ja-nakaguro-or-halfwidth-space-between-katakana"),
        "ja-no-space-around-parentheses": require("textlint-rule-ja-no-space-around-parentheses"),
        "ja-no-space-between-full-width": require("textlint-rule-ja-no-space-between-full-width"),
        "ja-space-between-half-and-full-width": require("textlint-rule-ja-space-between-half-and-full-width"),
        "ja-space-after-exclamation": require("textlint-rule-ja-space-after-exclamation"),
        "ja-space-after-question": require("textlint-rule-ja-space-after-question"),
        "ja-space-around-code": require("textlint-rule-ja-space-around-code"),
    },
    rulesConfig: {
        "ja-nakaguro-or-halfwidth-space-between-katakana": true,
        "ja-no-space-around-parentheses": true,
        "ja-no-space-between-full-width": true,
        "ja-space-between-half-and-full-width": {
            "space": "never"
        },
        "ja-space-after-exclamation": true,
        "ja-space-after-question": true,
        "ja-space-around-code": false,
    }
};