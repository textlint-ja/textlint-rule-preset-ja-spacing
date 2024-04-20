// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/index";
var tester = new TextLintTester();
tester.run("全角文字と半角文字の間", rule, {
    valid: [
        // デフォルト: never && exceptPunctuation
        "JTF標準",
        "これも、OK。",
        "最新のversionは1.2.3です。",
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
        {
            text: "最新の version は 1.2.3 です。",
            options: {
                space: ["alphabets", "numbers"]
            }
        },
        // ignore
        {
            text: "# JTF 標準",
            options: {
                space: "never"
            },
        },
        {
            text: "# JTF 標準",
            options: {
                space: []
            },
        },
        // except
        {
            text: "Always これは、Exception。",
            options: {
                space: "always",
                exceptPunctuation: true
            },
        },
        {
            text: "Always これは、Exception。",
            options: {
                space: ["alphabets", "numbers"]
            },
        },
        // 入れても良い
        {
            text: "Always これは 、 Exception 。",
            options: {
                space: "always",
                exceptPunctuation: true
            },
        },
        {
            text: "Always これは 、 Exception 。",
            options: {
                space: ["alphabets", "numbers"]
            },
        },
        {
            text: "Never:これは、 Exception 。",
            options: {
                space: "never",
                exceptPunctuation: true
            }
        },
        {
            text: "Never:これは、 Exception 。",
            options: {
                space: []
            }
        },
        // 入れても良い
        {
            text: "Never:これは、Exception。",
            options: {
                space: "never",
                exceptPunctuation: true
            }
        },
        {
            text: "Never:これは、Exception。",
            options: {
                space: [],
            }
        },
        // ignoreAlphabets
       {
            text: "最新のversionは 1.2.3 です。",
            options: {
                space: ["numbers", "punctuation"]
            }
       },
        // ignoreNumbers
       {
            text: "最新の version は1.2.3です。",
            options: {
                space: ["alphabets", "punctuation"]
            }
       },
        // allows,
        {
            text: "Eコーマス",
            options: {
                space: "always",
                allows: [
                    "Eコーマス"
                ]
            }
        },
        {
            text: "これは A言語、B言語、C言語です。",
            options: {
                space: "always",
                allows: [
                    "/(\\w)言語/"
                ]
            }
        }
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
            text: "JTF 標準",
            output: "JTF標準",
            options: {
                space: []
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
        {

            text: "aaa と bbb 、 ccc と ddd",
            output: "aaaとbbb 、 cccとddd",
            options: {
                space: "never",
                exceptPunctuation: true
            },
            errors: [
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れません。",
                    column: 4
                },
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れません。",
                    column: 6
                },
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れません。",
                    column: 16
                },
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れません。",
                    column: 18
                }
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
            text: "JTF標準",
            output: "JTF 標準",
            options: {
                space: ["alphabets", "numbers"]
            },
            errors: [
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れます。",
                    column: 3
                }
            ]
        },
        {
            text: "aaa、bbb",
            output: "aaa 、 bbb",
            options: {
                space: "always",
                exceptPunctuation: false
            },
            errors: [
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れます。",
                    column: 3
                },
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れます。",
                    column: 4
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
            text: "[Unicodeのサイト](https://home.unicode.org/)です。",
            output: "[Unicode のサイト](https://home.unicode.org/)です。",
            options: {
                space: "always",
                lintStyledNode: true
            },
            errors: [
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れます。",
                    column: 8
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
        {
            text: "最新のversionは1.2.3です。",
            output: "最新の version は 1.2.3 です。",
            options: {
                space: "always"
            },
            errors: [
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れます。",
                    column: 3
                },
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れます。",
                    column: 10
                },
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れます。",
                    column: 11
                },
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れます。",
                    column: 16
                }
            ]
        },
        // with option
        {
            text: "aaaとbbb、cccとddd",
            output: "aaa と bbb、ccc と ddd",
            options: {
                space: "always",
                exceptPunctuation: true
            },
            errors: [
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れます。",
                    column: 3
                },
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れます。",
                    column: 4
                },
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れます。",
                    column: 11
                },
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れます。",
                    column: 12
                }
            ]
        },
        // ignoreAlphabets
        {
            text: "最新のversionは1.2.3です。",
            output: "最新のversionは 1.2.3 です。",
            options: {
                space: ["numbers", "punctuation"]
            },
            errors: [
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れます。",
                    column: 11
                },
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れます。",
                    column: 16
                }
            ]
        },
        // ignoreNumbers
        {
            text: "最新のversionは1.2.3です。",
            output: "最新の version は1.2.3です。",
            options: {
                space: ["alphabets", "punctuation"]
            },
            errors: [
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れます。",
                    column: 3
                },
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れます。",
                    column: 10
                }
            ]
        }
    ]
});
