// LICENSE : MIT
"use strict";
const isJapaneseChar = (text) => {
    return /^(?:[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])$/.test(text);
};
// CommonMark: a Unicode punctuation character is in the Unicode P or S general categories
// https://spec.commonmark.org/0.31.2/#unicode-punctuation-character
const isPunctuationChar = (text) => {
    return /^[\p{P}\p{S}]$/u.test(text);
};
const defaultOptions = {
    before: false,
    after: false
};
const countDelimiter = (nodeText) => {
    const delimiter = nodeText[0];
    let count = 0;
    while (nodeText[count] === delimiter) {
        count++;
    }
    return count;
};
function reporter(context, options = {}) {
    const { Syntax, RuleError, report, fixer, getSource } = context;
    const allowBeforeSpace = options.before || defaultOptions.before;
    const allowAfterSpace = options.after || defaultOptions.after;
    // Markdownがmarkdown-cjk-friendlyの仕様で解析されたか
    // プラグインがDocumentの`syntaxExtensions`に記録する
    let cjkFriendlyEmphasis = false;
    return {
        [Syntax.Document](node) {
            cjkFriendlyEmphasis = node.syntaxExtensions?.cjkFriendlyEmphasis === true;
        },
        [Syntax.Emphasis](node) {
            const nodeText = getSource(node);
            // 区切り記号の長さ（`*`または`_`の数）
            const delimiterLength = countDelimiter(nodeText);
            // スペースを削除しても強調として解析されるか
            // `_`は前後が文字だと強調にならない
            // `*`は、CommonMarkでは強調の内側の端が約物で外側が文字だと強調にならない。
            // markdown-cjk-friendlyではこの場合も強調になる
            const canRemoveBeforeSpace =
                nodeText[0] !== "_" && (cjkFriendlyEmphasis || !isPunctuationChar(nodeText[delimiterLength]));
            const canRemoveAfterSpace =
                nodeText[0] !== "_" &&
                (cjkFriendlyEmphasis || !isPunctuationChar(nodeText[nodeText.length - 1 - delimiterLength]));
            // Emphasisの前後2文字文を取得
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
            // Emphasisの前に文字が存在している時のみチェック
            if (existBeforeChar) {
                if (allowBeforeSpace) {
                    if (beforeChar !== " " && isJapaneseChar(beforeChar)) {
                        report(
                            node,
                            new RuleError("強調の前にスペースを入れてください。", {
                                index: -1,
                                fix: fixer.insertTextBeforeRange([0, 0], " ")
                            })
                        );
                    }
                } else {
                    if (beforeChar === " " && isJapaneseChar(beforeBeforeChar) && canRemoveBeforeSpace) {
                        report(
                            node,
                            new RuleError("強調の前にスペースを入れません。", {
                                index: -1,
                                fix: fixer.replaceTextRange([-1, 0], "")
                            })
                        );
                    }
                }
            }
            // Emphasisの後に文字が存在している時のみチェック
            if (existAfterChar) {
                if (allowAfterSpace) {
                    if (afterChar !== " " && isJapaneseChar(afterChar)) {
                        report(
                            node,
                            new RuleError("強調の後にスペースを入れてください。", {
                                index: nodeText.length,
                                fix: fixer.insertTextAfterRange([0, nodeText.length], " ")
                            })
                        );
                    }
                } else {
                    if (afterChar === " " && isJapaneseChar(afterAfterChar) && canRemoveAfterSpace) {
                        report(
                            node,
                            new RuleError("強調の後にスペースを入れません。", {
                                index: nodeText.length + 1,
                                fix: fixer.replaceTextRange([nodeText.length, nodeText.length + 1], "")
                            })
                        );
                    }
                }
            }
        }
    };
}
module.exports = {
    linter: reporter,
    fixer: reporter
};
