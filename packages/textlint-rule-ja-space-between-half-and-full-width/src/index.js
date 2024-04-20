// LICENSE : MIT
"use strict";
const assert = require("assert");
/*
 全角文字と半角文字の間にスペースを入れるかどうか
 */
import { RuleHelper } from "textlint-rule-helper";
import { matchCaptureGroupAll } from "match-index";
import { matchPatterns } from "@textlint/regexp-string-matcher";

const PunctuationRegExp = /[。、]/;
const ZenRegExpStr = "[、。]|[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ]";
const defaultSpaceOptions = {
    alphabets: false,
    numbers: false,
    punctuation: false
};
const defaultOptions = {
    // プレーンテキスト以外を対象とするか See https://github.com/textlint/textlint-rule-helper#rulehelperisplainstrnodenode-boolean
    lintStyledNode: false,
    /**
     * 例外として無視する文字列
     * RegExp-like Stringの配列を指定
     * https://github.com/textlint/regexp-string-matcher?tab=readme-ov-file#regexp-like-string
     */
    allows: []
};

function reporter(context, options = {}) {
    /**
     * 入力された `space` オプションを内部処理用に成形する
     * @param {string|Array|undefined} opt `space` オプションのインプット
     * @param {boolean|undefined} exceptPunctuation `exceptPunctuation` オプションのインプット
     * @returns {Object}
     */
    const parseSpaceOption = (opt, exceptPunctuation) => {
        if (typeof opt === "string") {
            assert(opt === "always" || opt === "never", `"space" options should be "always", "never" or an array.`);

            if (opt === "always") {
                if (exceptPunctuation === false) {
                    return { ...defaultSpaceOptions, alphabets: true, numbers: true, punctuation: true };
                } else {
                    return { ...defaultSpaceOptions, alphabets: true, numbers: true };
                }
            } else if (opt === "never") {
                if (exceptPunctuation === false) {
                    return { ...defaultSpaceOptions, punctuation: true };
                } else {
                    return defaultSpaceOptions;
                }
            }
        } else if (Array.isArray(opt)) {
            assert(
                opt.every((v) => Object.keys(defaultSpaceOptions).includes(v)),
                `Only "alphabets", "numbers", "punctuation" can be included in the array.`
            );
            const userOptions = Object.fromEntries(opt.map((key) => [key, true]));
            return { ...defaultSpaceOptions, ...userOptions };
        }

        return defaultSpaceOptions;
    };

    const { Syntax, RuleError, report, fixer, getSource } = context;
    const helper = new RuleHelper();
    const spaceOption = parseSpaceOption(options.space, options.exceptPunctuation);
    const lintStyledNode =
        options.lintStyledNode !== undefined ? options.lintStyledNode : defaultOptions.lintStyledNode;
    const allows = options.allows !== undefined ? options.allows : defaultOptions.allows;
    /**
     * `text`を対象に例外オプションを取り除くfilter関数を返す
     * @param {string} text テスト対象のテキスト全体
     * @param {number} padding +1 or -1
     * @returns {function(*, *)}
     */
    const createFilter = (text, padding) => {
        const allowedPatterns = allows.length > 0 ? matchPatterns(text, allows) : [];
        /**
         * `PunctuationRegExp`で指定された例外を取り除く
         * @param {Object} match
         * @returns {boolean}
         */
        return (match) => {
            const targetChar = text[match.index + padding];
            if (!targetChar) {
                return false;
            }
            if (!spaceOption.punctuation && PunctuationRegExp.test(targetChar)) {
                return false;
            }
            const isAllowed = allowedPatterns.some((allow) => {
                // start ... end
                if (allow.startIndex <= match.index && match.index <= allow.endIndex) {
                    return true;
                }
                return false;
            });
            return !isAllowed;
        };
    };
    // Never: アルファベットと全角の間はスペースを入れない
    const noSpaceBetween = (node, text) => {
        const betweenHanAndZen = matchCaptureGroupAll(text, new RegExp(`[A-Za-z0-9]([ 　])(?:${ZenRegExpStr})`));
        const betweenZenAndHan = matchCaptureGroupAll(text, new RegExp(`(?:${ZenRegExpStr})([ 　])[A-Za-z0-9]`));
        const reportMatch = (match) => {
            const { index } = match;
            report(
                node,
                new RuleError("原則として、全角文字と半角文字の間にスペースを入れません。", {
                    index: match.index,
                    fix: fixer.replaceTextRange([index, index + 1], "")
                })
            );
        };
        betweenHanAndZen.filter(createFilter(text, 1)).forEach(reportMatch);
        betweenZenAndHan.filter(createFilter(text, -1)).forEach(reportMatch);
    };

    // Always: アルファベットと全角の間はスペースを入れる
    const needSpaceBetween = (node, text, options) => {
        /**
         * オプションを元に正規表現オプジェクトを生成する
         * @param {Array} opt `space` オプション
         * @param {boolean} btwHanAndZen=true 半角全角の間か全角半角の間か
         * @returns {Object}
         */
        const generateRegExp = (opt, btwHanAndZen = true) => {
            const alphabets = opt.alphabets ? "A-Za-z" : "";
            const numbers = opt.numbers ? "0-9" : "";

            let expStr;
            if (btwHanAndZen) {
                expStr = `([${alphabets}${numbers}])(?:${ZenRegExpStr})`;
            } else {
                expStr = `(${ZenRegExpStr})[${alphabets}${numbers}]`;
            }

            return new RegExp(expStr);
        };

        const betweenHanAndZenRegExp = generateRegExp(options);
        const betweenZenAndHanRegExp = generateRegExp(options, false);
        const errorMsg = "原則として、全角文字と半角文字の間にスペースを入れます。";

        const betweenHanAndZen = matchCaptureGroupAll(text, betweenHanAndZenRegExp);
        const betweenZenAndHan = matchCaptureGroupAll(text, betweenZenAndHanRegExp);
        const reportMatch = (match) => {
            const { index } = match;
            report(
                node,
                new RuleError(errorMsg, {
                    index: match.index,
                    fix: fixer.replaceTextRange([index + 1, index + 1], " ")
                })
            );
        };
        betweenHanAndZen.filter(createFilter(text, 1)).forEach(reportMatch);
        betweenZenAndHan.filter(createFilter(text, 0)).forEach(reportMatch);
    };
    return {
        [Syntax.Str](node) {
            if (!lintStyledNode && !helper.isPlainStrNode(node)) {
                return;
            }
            const text = getSource(node);

            const noSpace = (key) => (key === "punctuation" ? true : !spaceOption[key]);
            if (Object.keys(spaceOption).every(noSpace)) {
                noSpaceBetween(node, text);
            } else {
                needSpaceBetween(node, text, spaceOption);
            }
        }
    };
}

module.exports = {
    linter: reporter,
    fixer: reporter
};
