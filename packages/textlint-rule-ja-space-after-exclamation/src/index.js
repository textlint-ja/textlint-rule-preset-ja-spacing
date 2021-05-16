// LICENSE : MIT
"use strict";
/*
 感嘆符(!)
 文末に感嘆符を使用し、後に別の文が続く場合は、直後に全角スペースを挿入します。
 文中に感嘆符を使用する場合はスペースを挿入しません。
 */
import {RuleHelper} from "textlint-rule-helper";
import {matchCaptureGroupAll} from "match-index";
function reporter(context) {
    const {Syntax, RuleError, report, fixer, getSource} = context;
    const helper = new RuleHelper();
    return {
        [Syntax.Str](node){
            if (!helper.isPlainStrNode(node)) {
                return;
            }
            let text = getSource(node);
            // ！の後ろは全角スペースが推奨
            // 半角スペースである場合
            const matchAfter = /！( )[^\n]/;
            matchCaptureGroupAll(text, matchAfter).forEach(match => {
                const {index} = match;
                return report(node, new RuleError("文末に感嘆符を使用し、後に別の文が続く場合は、直後に全角スペースを挿入します。", {
                    index: index,
                    fix: fixer.replaceTextRange([index, index + 1], "　")
                }));
            });
        }
    };
}
module.exports = {
    linter: reporter,
    fixer: reporter
};
