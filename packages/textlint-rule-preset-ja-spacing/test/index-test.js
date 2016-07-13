// LICENSE : MIT
"use strict";
const assert = require("assert");
const rules = require("../src/index").rules;
const rulesConfig = require("../src/index").rulesConfig;
describe("textlint-rule-preset-ja-spacing", function() {
    it("not missing key", function() {
        const ruleKeys = Object.keys(rules).sort();
        const ruleConfigKeys = Object.keys(rulesConfig).sort();
        assert.deepEqual(ruleKeys, ruleConfigKeys);
    });
});