// LICENSE : MIT
"use strict";
/*
 * スラッシュの前後にスペースを入れません。
 */
import { RuleHelper } from "textlint-rule-helper";

const MESSAGE = "スラッシュの前後にスペースを入れません。";
const slashWithSpaces = /[ 　]{0,10}\/[ 　]{0,10}/g;
const slashWithSpacesForFix = /[ 　]{0,10}\/[ 　]{0,10}/;

function reporter(context) {
    const { Syntax, RuleError, report, fixer, getSource } = context;
    const helper = new RuleHelper();
    return {
        [Syntax.Str](node) {
            if (!helper.isPlainStrNode(node)) {
                return;
            }
            const text = getSource(node);
            for (const match of text.matchAll(slashWithSpaces)) {
                const matchedText = match[0];
                if (!/[ 　]/.test(matchedText)) {
                    continue;
                }
                const startIndex = match.index;
                const fixedText = matchedText.replace(slashWithSpacesForFix, "/");
                report(
                    node,
                    new RuleError(MESSAGE, {
                        index: startIndex,
                        fix: fixer.replaceTextRange([startIndex, startIndex + matchedText.length], fixedText)
                    })
                );
            }
        }
    };
}

module.exports = {
    linter: reporter,
    fixer: reporter
};
