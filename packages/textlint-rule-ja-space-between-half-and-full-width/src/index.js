// LICENSE : MIT
"use strict";
const assert = require("assert");
/*
 全角文字と半角文字の間にスペースを入れるかどうか
 */
import {RuleHelper} from "textlint-rule-helper";
import {matchCaptureGroupAll} from "match-index";
const PunctuationRegExp = /[。、]/;
const ZenRegExpStr = '[、。]|[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ]'
const defaultOptions = {
    // スペースを入れるかどうか
    // "never" or "always"
    space: "never",
    // 半角数字を無視するかどうか
    // only works w/ space: "always"
    ignoreNumbers: false,
    // [。、,.]を例外とするかどうか
    exceptPunctuation: true,
    // プレーンテキスト以外を対象とするか See https://github.com/textlint/textlint-rule-helper#rulehelperisplainstrnodenode-boolean
    lintStyledNode: false,
};
function reporter(context, options = {}) {
    const {Syntax, RuleError, report, fixer, getSource} = context;
    const helper = new RuleHelper();
    const spaceOption = options.space || defaultOptions.space;
    const ignoreNumbers = options.ignoreNumbers !== undefined
        ? options.ignoreNumbers
        : defaultOptions.ignoreNumbers;
    const exceptPunctuation = options.exceptPunctuation !== undefined
        ? options.exceptPunctuation
        : defaultOptions.exceptPunctuation;
    const lintStyledNode = options.lintStyledNode !== undefined
        ? options.lintStyledNode
        : defaultOptions.lintStyledNode;
    assert(spaceOption === "always" || spaceOption === "never", `"space" options should be "always" or "never".`);
    if (spaceOption !== "always") {
      assert(ignoreNumbers === false, `"ignoreNumbers" option can work only with "always" for the space option.`);
    }
    /**
     * `text`を対象に例外オプションを取り除くfilter関数を返す
     * @param {string} text テスト対象のテキスト全体
     * @param {number} padding +1 or -1
     * @returns {function(*, *)}
     */
    const createFilter = (text, padding) => {
        /**
         * `exceptPunctuation`で指定された例外を取り除く
         * @param {Object} match
         * @returns {boolean}
         */
        return (match) => {
            const targetChar = text[match.index + padding];
            if (!targetChar) {
                return false;
            }
            if (exceptPunctuation && PunctuationRegExp.test(targetChar)) {
                return false;
            }
            return true;
        }
    };
    // Never: アルファベットと全角の間はスペースを入れない
    const noSpaceBetween = (node, text) => {
        const betweenHanAndZen = matchCaptureGroupAll(text, new RegExp(`[A-Za-z0-9]([ 　])(?:${ZenRegExpStr})`));
        const betweenZenAndHan = matchCaptureGroupAll(text, new RegExp(`(?:${ZenRegExpStr})([ 　])[A-Za-z0-9]`));
        const reportMatch = (match) => {
            const {index} = match;
            report(node, new RuleError("原則として、全角文字と半角文字の間にスペースを入れません。", {
                index: match.index,
                fix: fixer.replaceTextRange([index, index + 1], "")
            }));
        };
        betweenHanAndZen.filter(createFilter(text, 1)).forEach(reportMatch);
        betweenZenAndHan.filter(createFilter(text, -1)).forEach(reportMatch);
    };

    // Always: アルファベットと全角の間はスペースを入れる
    const needSpaceBetween = (node, text, ignoreNumbers) => {
        const betweenHanAndZenRegExpStr = ignoreNumbers
            ? `([A-Za-z])(?:${ZenRegExpStr})`
            : `([A-Za-z0-9])(?:${ZenRegExpStr})`
        const betweenZenAndHanRegExpStr = ignoreNumbers
            ? `(${ZenRegExpStr})[A-Za-z]`
            : `(${ZenRegExpStr})[A-Za-z0-9]`
        const errorMsg = ignoreNumbers
            ? "原則として、全角文字と数字以外の半角文字の間にスペースを入れます。"
            : "原則として、全角文字と半角文字の間にスペースを入れます。"

        const betweenHanAndZen = matchCaptureGroupAll(text, new RegExp(betweenHanAndZenRegExpStr));
        const betweenZenAndHan = matchCaptureGroupAll(text, new RegExp(betweenZenAndHanRegExpStr));
        const reportMatch = (match) => {
            const {index} = match;
            report(node, new RuleError(errorMsg, {
                index: match.index,
                fix: fixer.replaceTextRange([index + 1, index + 1], " ")
            }));
        };
        betweenHanAndZen.filter(createFilter(text, 1)).forEach(reportMatch);
        betweenZenAndHan.filter(createFilter(text, 0)).forEach(reportMatch);
    };
    return {
        [Syntax.Str](node){
            if (!lintStyledNode && !helper.isPlainStrNode(node)) {
                return;
            }
            const text = getSource(node);

            if (spaceOption === "always") {
                needSpaceBetween(node, text, ignoreNumbers)
            } else if (spaceOption === "never") {
                noSpaceBetween(node, text);
            }

        }
    }
}
module.exports = {
    linter: reporter,
    fixer: reporter
};
