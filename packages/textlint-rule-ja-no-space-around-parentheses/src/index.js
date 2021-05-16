// LICENSE : MIT
"use strict";
/*
 かっこ類と隣接する文字の間のスペースの有無
 かっこの外側、内側ともにスペースを入れません。
 */
import {RuleHelper} from "textlint-rule-helper";
import {matchCaptureGroupAll} from "match-index";

const brackets = [
    "\\[", "\\]", "（", "）", "［", "］", "「", "」", "『", "』"
];

const leftBrackets = brackets.map(bracket => {
    return new RegExp("\([ 　]\)" + bracket, "g");
});
const rightBrackets = brackets.map(bracket => {
    return new RegExp(bracket + "\([ 　])", "g");
});
function reporter(context) {
    const {Syntax, RuleError, report, fixer, getSource} = context;
    const helper = new RuleHelper();
    return {
        [Syntax.Str](node){
            if (!helper.isPlainStrNode(node)) {
                return;
            }
            const text = getSource(node);
            // 左にスペース
            leftBrackets.forEach(pattern => {
                matchCaptureGroupAll(text, pattern).forEach(match => {
                    const {index} = match;
                    report(node, new RuleError("かっこの外側、内側ともにスペースを入れません。", {
                        index: index,
                        fix: fixer.replaceTextRange([index, index + 1], "")
                    }));
                });
            });
            // 右にスペース
            rightBrackets.forEach(pattern => {
                matchCaptureGroupAll(text, pattern).forEach(match => {
                    const {index, text} = match;
                    report(node, new RuleError("かっこの外側、内側ともにスペースを入れません。", {
                        index: index,
                        fix: fixer.replaceTextRange([index, index + 1], "")
                    }));
                });
            });
        }
    };
}
module.exports = {
    linter: reporter,
    fixer: reporter
};
