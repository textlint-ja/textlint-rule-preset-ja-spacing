// LICENSE : MIT
"use strict";
/*
 疑問符(?)
 文末に疑問符を使用し、後に別の文が続く場合は、直後に全角スペースを挿入します。
 文中に疑問符を使用する場合はスペースを挿入しません。
 */
import { RuleHelper } from "textlint-rule-helper";
function reporter(context) {
    const { Syntax, RuleError, report, fixer, getSource } = context;
    const helper = new RuleHelper();
    return {
        [Syntax.Str](node) {
            if (!helper.isPlainStrNode(node)) {
                return;
            }
            let text = getSource(node);
            // ？の後ろは全角スペースが推奨
            // 半角スペースである場合はエラーとする
            const matchAfter = /？( )[^\n]/g;
            for (const match of text.matchAll(matchAfter)) {
                const indexOneBased = match.index + 1;
                report(
                    node,
                    new RuleError("文末に疑問符を使用し、後に別の文が続く場合は、直後に全角スペースを挿入します。", {
                        index: indexOneBased,
                        fix: fixer.replaceTextRange([indexOneBased, indexOneBased + 1], "　")
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
