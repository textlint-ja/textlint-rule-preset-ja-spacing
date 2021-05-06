// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/index";

var tester = new TextLintTester();
tester.run("Link周りのスペース", rule, {
  valid: [
    {
      text: "[README](./README.md) と日本語の間はスペースを空ける",
      options: {
        before: true,
        after: true,
      },
    },
    {
      text: "[README](./README.md)と日本語の間はスペースを空けない",
      options: {
        before: false,
        after: false,
      },
    },
    {
      text: "[README](./README.md) is good in english text.",
      options: {
        before: false,
        after: false,
      },
    },
    {
      text: "[`README`](./README.md) と日本語の間はスペースを空ける",
      options: {
        before: true,
        after: true,
      },
    },
    {
      text: "[`README`](./README.md)と日本語の間はスペースを空けない",
      options: {
        before: false,
        after: false,
      },
    },
    {
      text: "[`README`](./README.md) is good in english text.",
      options: {
        before: false,
        after: false,
      },
    },
    {
      text: "[**README**](./README.md) と日本語の間はスペースを空ける",
      options: {
        before: true,
        after: true,
      },
    },
    {
      text: "[**README**](./README.md)と日本語の間はスペースを空けない",
      options: {
        before: false,
        after: false,
      },
    },
    {
      text: "[**README**](./README.md) is good in english text.",
      options: {
        before: false,
        after: false,
      },
    },
  ],
  invalid: [
    // before only
    {
      text: "これは [README](./README.md) おかしい",
      output: "これは [README](./README.md)おかしい",
      options: {
        before: true,
        after: false,
      },
      errors: [
        {
          message: "リンクの後にスペースを入れません。",
          column: 27,
        },
      ],
    },
    // after only
    {
      text: "これは [README](./README.md) おかしい",
      output: "これは[README](./README.md) おかしい",
      options: {
        before: false,
        after: true,
      },
      errors: [
        {
          message: "リンクの前にスペースを入れません。",
          column: 4,
        },
      ],
    },
    {
      text: "これは [README](./README.md) おかしい",
      output: "これは[README](./README.md)おかしい",
      options: {
        before: false,
        after: false,
      },
      errors: [
        {
          message: "リンクの前にスペースを入れません。",
          column: 4,
        },
        {
          message: "リンクの後にスペースを入れません。",
          column: 27,
        },
      ],
    },
    {
      text: "これは[README](./README.md)おかしい",
      output: "これは [README](./README.md)おかしい",
      options: {
        before: true,
        after: false,
      },
      errors: [
        {
          message: "リンクの前にスペースを入れてください。",
          column: 3,
        },
      ],
    },
    {
      text: "これは[README](./README.md)おかしい",
      output: "これは[README](./README.md) おかしい",
      options: {
        before: false,
        after: true,
      },
      errors: [
        {
          message: "リンクの後にスペースを入れてください。",
          column: 25,
        },
      ],
    },
    {
      text: "これは[README](./README.md)おかしい",
      output: "これは [README](./README.md) おかしい",
      options: {
        before: true,
        after: true,
      },
      errors: [
        {
          message: "リンクの前にスペースを入れてください。",
          column: 3,
        },
        {
          message: "リンクの後にスペースを入れてください。",
          column: 25,
        },
      ],
    },
  ],
});
