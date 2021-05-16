// LICENSE : MIT
"use strict";
/*
 全角文字と半角文字の間
 全角文字どうしの間にスペースを入れません。
 ただしカタカナ複合語の場合を除きます。
 */
import {RuleHelper} from "textlint-rule-helper";
import {matchAll} from "match-index";
import regx from "regx";
const rx = regx("g");
const japaneseRegExp = /(?:[々〇〻\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])/;

function reporter(context) {
    const {Syntax, RuleError, report, fixer, getSource} = context;
    const helper = new RuleHelper();
    return {
        [Syntax.Str](node){
            if (!helper.isPlainStrNode(node)) {
                return;
            }
            const text = getSource(node);
            // 全角同士の間は半角スペースを入れない
            const matchReg = rx`${japaneseRegExp}( )${japaneseRegExp}`;
            const katakakana = /[ァ-ヶ]( )[ァ-ヶ]/;
            matchAll(text, matchReg).forEach(match => {
                const {input, captureGroups} = match;
                // ただしカタカナ複合語の場合を除きます。
                if (katakakana.test(input)) {
                    return;
                }
                captureGroups.forEach(captureGroup => {
                    const index = captureGroup.index;
                    report(node, new RuleError("原則として、全角文字どうしの間にスペースを入れません。", {
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
