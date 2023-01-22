// LICENSE : MIT
"use strict";
const assert = require("assert");
/*
 全角文字と半角文字の間にスペースを入れるかどうか
 */
import {RuleHelper} from "textlint-rule-helper";
import {matchCaptureGroupAll} from "match-index";
const PunctuationRegExp = /[。、]/;
const ZenRegExpStr = '[、。]|[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ]'
const spaceOptions = {
  always: ['alphabets', 'numbers', 'punctuation'],
  never: [],
};
const defaultOptions = {
    // スペースを入れるかどうか
    // ("never"|"always"|Array)
    space: spaceOptions.never,
    // [。、,.]を例外とするかどうか
    exceptPunctuation: true,
    // プレーンテキスト以外を対象とするか See https://github.com/textlint/textlint-rule-helper#rulehelperisplainstrnodenode-boolean
    lintStyledNode: false,
};
function reporter(context, options = {}) {
   /**
    * 入力された `space` オプションを内部処理用に成形する
    * @param {string|Array|undefined} opt `space` オプションのインプット
    * @returns {Array}
    */
    const parseSpaceOption = (opt) => {
      let option = defaultOptions.space;
      if (typeof opt === 'string') {
         assert(opt === "always" || opt === "never", `"space" options should be "always", "never" or an array.`);
        if (opt === 'always') option = spaceOptions.always
      } else if (Array.isArray(opt)) {
         assert(opt.every((v) => spaceOptions.always.includes(v)), `Only "alphabets", "numbers", "punctuation" should be included in the array.`);
         option = opt;
      }

      return option;
    }

    const {Syntax, RuleError, report, fixer, getSource} = context;
    const helper = new RuleHelper();
    const spaceOption = parseSpaceOption(options.space);
    let exceptPunctuation = spaceOption.includes('punctuation') ? true : undefined;
    exceptPunctuation = options.exceptPunctuation !== undefined
        ? options.exceptPunctuation
        : defaultOptions.exceptPunctuation;
    const lintStyledNode = options.lintStyledNode !== undefined
        ? options.lintStyledNode
        : defaultOptions.lintStyledNode;
    /**
     * `text`を対象に例外オプションを取り除くfilter関数を返す
     * @param {string} text テスト対象のテキスト全体
     * @param {number} padding +1 or -1
     * @returns {function(*, *)}
     */
    const createFilter = (text, padding) => {
        /**
         * `exceptPunctuation`で指定された例外を取り除く
         * @param {Object} match
         * @returns {boolean}
         */
        return (match) => {
            const targetChar = text[match.index + padding];
            if (!targetChar) {
                return false;
            }
            if (exceptPunctuation && PunctuationRegExp.test(targetChar)) {
                return false;
            }
            return true;
        }
    };
    // Never: アルファベットと全角の間はスペースを入れない
    const noSpaceBetween = (node, text) => {
        const betweenHanAndZen = matchCaptureGroupAll(text, new RegExp(`[A-Za-z0-9]([ 　])(?:${ZenRegExpStr})`));
        const betweenZenAndHan = matchCaptureGroupAll(text, new RegExp(`(?:${ZenRegExpStr})([ 　])[A-Za-z0-9]`));
        const reportMatch = (match) => {
            const {index} = match;
            report(node, new RuleError("原則として、全角文字と半角文字の間にスペースを入れません。", {
                index: match.index,
                fix: fixer.replaceTextRange([index, index + 1], "")
            }));
        };
        betweenHanAndZen.filter(createFilter(text, 1)).forEach(reportMatch);
        betweenZenAndHan.filter(createFilter(text, -1)).forEach(reportMatch);
    };

    // Always: アルファベットと全角の間はスペースを入れる
    const needSpaceBetween = (node, text, options) => {
       /**
        * オプションを元に正規表現オプジェクトを生成する
        * @param {Array} opt `space` オプション
        * @param {boolean} btwHanAndZen=true 半角全角の間か全角半角の間か
        * @returns {Object}
        */
        const generateRegExp = (opt, btwHanAndZen = true) => {
          const alphabets = 'A-Za-z';
          const numbers = opt.includes('numbers') ? '0-9' : '';

          let expStr;
          if (btwHanAndZen) {
            expStr = `([${alphabets}${numbers}])(?:${ZenRegExpStr})`;
          } else {
            expStr = `(${ZenRegExpStr})[${alphabets}${numbers}]`;
          }

          return new RegExp(expStr);
        };

        const betweenHanAndZenRegExp = generateRegExp(options);
        const betweenZenAndHanRegExp = generateRegExp(options, false);
        const errorMsg = options.includes('numbers')
            ? "原則として、全角文字と半角文字の間にスペースを入れます。"
            : "原則として、全角文字と数字以外の半角文字の間にスペースを入れます。"

        const betweenHanAndZen = matchCaptureGroupAll(text, betweenHanAndZenRegExp);
        const betweenZenAndHan = matchCaptureGroupAll(text, betweenZenAndHanRegExp);
        const reportMatch = (match) => {
            const {index} = match;
            report(node, new RuleError(errorMsg, {
                index: match.index,
                fix: fixer.replaceTextRange([index + 1, index + 1], " ")
            }));
        };
        betweenHanAndZen.filter(createFilter(text, 1)).forEach(reportMatch);
        betweenZenAndHan.filter(createFilter(text, 0)).forEach(reportMatch);
    };
    return {
        [Syntax.Str](node){
            if (!lintStyledNode && !helper.isPlainStrNode(node)) {
                return;
            }
            const text = getSource(node);

          if (spaceOption.filter(opt => opt !== 'punctuation').length === 0) {
                noSpaceBetween(node, text);
            } else {
                needSpaceBetween(node, text, spaceOption)
            }

        }
    }
}
module.exports = {
    linter: reporter,
    fixer: reporter
};
