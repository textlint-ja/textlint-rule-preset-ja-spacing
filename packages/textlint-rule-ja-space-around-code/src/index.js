// LICENSE : MIT
"use strict";
const isJapaneseChar = (text) => {
    return /^(?:[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])$/.test(text);
};
const defaultOptions = {
    "before": false,
    "after": false
};
function reporter(context, options) {
    const {Syntax, RuleError, report, fixer, getSource} = context;
    const allowBeforeSpace = options.before || defaultOptions.before;
    const allowAfterSpace = options.after || defaultOptions.after;
    return {
        [Syntax.Code](node){
            const nodeText = getSource(node);
            // |  `code`  |
            // InlineCodeの前後2文字文を取得
            // スペース + 前後の文字を取るため
            // 文字が日本語以外はチェック対象にしないようにするため
            const textWithPadding = getSource(node, 2, 2);
            if (!textWithPadding) {
                return;
            }
            const beforeChar = textWithPadding[1];
            const beforeBeforeChar = textWithPadding[0];
            const existBeforeChar = nodeText[0] !== beforeChar;
            const afterChar = textWithPadding[textWithPadding.length - 2];
            const afterAfterChar = textWithPadding[textWithPadding.length - 1];
            const existAfterChar = nodeText[textWithPadding.length - 1] !== afterChar;
            // InlineCodeの前に文字が存在している時のみチェック
            if (existBeforeChar) {
                if (allowBeforeSpace) {
                    if (beforeChar !== " " && isJapaneseChar(beforeChar)) {
                        report(node, new RuleError("インラインコードの前にスペースを入れてください。", {
                            index: -1,// before `
                            fix: fixer.insertTextBeforeRange([0, 0], " ")
                        }));
                    }
                } else {
                    if (beforeChar === " " && isJapaneseChar(beforeBeforeChar)) {
                        report(node, new RuleError("インラインコードの前にスペースを入れません。", {
                            index: -1, // before `
                            fix: fixer.replaceTextRange([-1, 0], "")
                        }));
                    }
                }
            }
            // InlineCodeの後に文字が存在している時のみチェック
            if (existAfterChar) {
                if (allowAfterSpace) {
                    if (afterChar !== " " && isJapaneseChar(afterChar)) {
                        report(node, new RuleError("インラインコードの後にスペースを入れてください。", {
                            index: nodeText.length,
                            fix: fixer.insertTextAfterRange([0, nodeText.length], " ")
                        }));
                    }
                } else {
                    if (afterChar === " " && isJapaneseChar(afterAfterChar)) {
                        report(node, new RuleError("インラインコードの後にスペースを入れません。", {
                            index: nodeText.length + 1,
                            fix: fixer.replaceTextRange([nodeText.length, nodeText.length + 1], "")
                        }));
                    }
                }
            }
        }
    }
}
module.exports = {
    linter: reporter,
    fixer: reporter
};