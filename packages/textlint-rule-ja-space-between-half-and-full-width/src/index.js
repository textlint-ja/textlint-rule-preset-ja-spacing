// LICENSE : MIT
"use strict";
const assert = require("assert");
/*
 全角文字と半角文字の間にスペースを入れるかどうか
 */
import {RuleHelper} from "textlint-rule-helper";
import {matchCaptureGroupAll} from "match-index";
const defaultOptions = {
    // スペースを入れるかどうか
    // "never" or "always"
    "space": "never"
};
function reporter(context, options = {}) {
    const {Syntax, RuleError, report, fixer, getSource} = context;
    const helper = new RuleHelper();
    const spaceOption = options.space || defaultOptions.space;
    assert(spaceOption === "always" || spaceOption === "never", `"space" options should be "always" or "never".`);
    // アルファベットと全角の間はスペースを入れない
    const noSpaceBetween = (node, text) => {
        const betweenHanAndZen = matchCaptureGroupAll(text, /[A-Za-z0-9]([ 　])(?:[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])/);
        const betweenZenAndHan = matchCaptureGroupAll(text, /(?:[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])([ 　])[A-Za-z0-9]/);
        const reportMatch = (match) => {
            const {index} = match;
            report(node, new RuleError("原則として、全角文字と半角文字の間にスペースを入れません。", {
                index: match.index,
                fix: fixer.replaceTextRange([index, index + 1], "")
            }));
        };
        betweenHanAndZen.forEach(reportMatch);
        betweenZenAndHan.forEach(reportMatch);
    };

    // アルファベットと全角の間はスペースを入れる
    const needSpaceBetween = (node, text) => {
        const betweenHanAndZen = matchCaptureGroupAll(text, /[A-Za-z0-9]([^ 　])(?:[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])/);
        const betweenZenAndHan = matchCaptureGroupAll(text, /(?:[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])([^ 　])[A-Za-z0-9]/);
        const reportMatch = (match) => {
            const {index} = match;
            report(node, new RuleError("原則として、全角文字と半角文字の間にスペースを入れます。", {
                index: match.index,
                fix: fixer.replaceTextRange([index + 1, index + 1], " ")
            }));
        };
        betweenHanAndZen.forEach(reportMatch);
        betweenZenAndHan.forEach(reportMatch);
    };
    return {
        [Syntax.Str](node){
            if (helper.isChildNode(node, [
                    Syntax.Header, Syntax.Link, Syntax.Image, Syntax.BlockQuote, Syntax.Emphasis
                ])) {
                return;
            }
            const text = getSource(node);

            if (spaceOption === "always") {
                needSpaceBetween(node, text)
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