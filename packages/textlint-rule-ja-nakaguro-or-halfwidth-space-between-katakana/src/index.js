// LICENSE : MIT
"use strict";
/*
 カタカナ語間のスペースの有無
 中黒または半角スペースを用いてカタカナ語を区切ります。
 */
import { matchCaptureGroupAll } from "match-index";

export default function (context) {
    const { Syntax, RuleError, report, getSource } = context;
    return {
        [Syntax.Str](node) {
            if (node.parent?.type !== Syntax.Paragraph) {
                return;
            }
            const text = getSource(node);
            // カタカナ(カタカナ以外)カタカナ のパターンを取り出す
            matchCaptureGroupAll(text, /[ァ-ヶー]([^[ァ-ヶー])[ァ-ヶー]/).forEach((match) => {
                // カタカナの間を全角スペースでは区切らない
                const { text } = match;
                if (text === "　") {
                    report(
                        node,
                        new RuleError("カタカナ語間は中黒（・）または半角スペースを用いてカタカナ語を区切ります", {
                            index: match.index
                        })
                    );
                }
            });
        }
    };
}
