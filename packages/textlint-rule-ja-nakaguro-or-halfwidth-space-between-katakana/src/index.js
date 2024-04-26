// LICENSE : MIT
"use strict";
/*
 カタカナ語間のスペースの有無
 中黒または半角スペースを用いてカタカナ語を区切ります。
 */
import { RuleHelper } from "textlint-rule-helper";

module.exports = function (context) {
    const { Syntax, RuleError, report, getSource } = context;
    const helper = new RuleHelper();
    return {
        [Syntax.Str](node) {
            if (!helper.isPlainStrNode(node)) {
                return;
            }
            const text = getSource(node);
            // カタカナ(カタカナ以外)カタカナ のパターンを取り出す
            for (const match of text.matchAll(/[ァ-ヶー]([^[ァ-ヶー])[ァ-ヶー]/g)) {
                // カタカナの間を全角スペースでは区切らない
                const text = match[1];
                if (text === "　") {
                    report(
                        node,
                        new RuleError("カタカナ語間は中黒（・）または半角スペースを用いてカタカナ語を区切ります", {
                            index: match.index + 1
                        })
                    );
                }
            }
        }
    };
};
