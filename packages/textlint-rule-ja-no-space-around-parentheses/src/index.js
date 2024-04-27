// LICENSE : MIT
"use strict";
/*
 かっこ類と隣接する文字の間のスペースの有無
 かっこの外側、内側ともにスペースを入れません。
 */
import { RuleHelper } from "textlint-rule-helper";

const brackets = ["\\[", "\\]", "（", "）", "［", "］", "「", "」", "『", "』"];

const leftBrackets = brackets.map((bracket) => {
    return new RegExp("([ 　])" + bracket, "g");
});
const rightBrackets = brackets.map((bracket) => {
    return new RegExp(bracket + "([ 　])", "g");
});
function reporter(context) {
    const { Syntax, RuleError, report, fixer, getSource } = context;
    const helper = new RuleHelper();
    return {
        [Syntax.Str](node) {
            if (!helper.isPlainStrNode(node)) {
                return;
            }
            const text = getSource(node);
            // 左にスペース
            leftBrackets.forEach((pattern) => {
                for (const match of text.matchAll(pattern)) {
                    const indexZeroBased = match.index;
                    report(
                        node,
                        new RuleError("かっこの外側、内側ともにスペースを入れません。", {
                            index: indexZeroBased,
                            fix: fixer.replaceTextRange([indexZeroBased, indexZeroBased + 1], "")
                        })
                    );
                }
            });
            // 右にスペース
            rightBrackets.forEach((pattern) => {
                for (const match of text.matchAll(pattern)) {
                    const indexOnebased = match.index + 1;
                    report(
                        node,
                        new RuleError("かっこの外側、内側ともにスペースを入れません。", {
                            index: indexOnebased,
                            fix: fixer.replaceTextRange([indexOnebased, indexOnebased + 1], "")
                        })
                    );
                }
            });
        }
    };
}
module.exports = {
    linter: reporter,
    fixer: reporter
};
