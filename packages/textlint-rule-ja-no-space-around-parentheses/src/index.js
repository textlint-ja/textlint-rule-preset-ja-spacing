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
/**
 * Return true if the character at `index` is a part of the indentation of a continuation line.
 * `getSource(node)` includes the indentation of continuation lines in a list item,
 * but it is not a space in the sentence.
 * https://github.com/textlint-ja/textlint-rule-preset-ja-spacing/issues/140
 * @param {string} text
 * @param {number} index
 * @returns {boolean}
 */
const isIndentation = (text, index) => {
    const lineStartIndex = text.lastIndexOf("\n", index - 1);
    if (lineStartIndex === -1) {
        return false;
    }
    return /^[ \t]*$/.test(text.slice(lineStartIndex + 1, index + 1));
};
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
                    if (isIndentation(text, indexZeroBased)) {
                        continue;
                    }
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
