// LICENSE : MIT
"use strict";
/*
 全角文字と半角文字の間
 原則として、全角文字と半角文字の間にスペースを入れません。
 */
import {RuleHelper} from "textlint-rule-helper";
import {matchCaptureGroupAll} from "match-index";
function reporter(context) {
    const {Syntax, RuleError, report, fixer, getSource} = context;
    const helper = new RuleHelper();
    return {
        [Syntax.Str](node){
            if (helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote, Syntax.Emphasis])) {
                return;
            }
            const text = getSource(node);
            // アルファベットと全角の間は半角スペースではない
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
        }
    }
}
module.exports = {
    linter: reporter,
    fixer: reporter
};