"use strict";
exports.__esModule = true;
var promptSync = require("prompt-sync");
var prompt = promptSync({ sigint: true });
var testCases = [];
var testCasesNumber = 0;
var showOutput = function (result, wordLen) {
    var pos = wordLen - 1;
    var str = '';
    for (var i = 0; i < result.length; i++) {
        str += result[i] + " ";
        if (i == pos) {
            str += " \n";
            pos += wordLen;
        }
    }
    console.log('\n');
    console.log(str);
};
var CalculateDistance = function (testCase) {
    var distanceTab = [];
    testCase['bitmap'].map(function (word) {
        for (var i = 0; i < word.length; i++) {
            var positions = [];
            for (var j = 0; j < word.length; j++) {
                if (word[j] === '1') {
                    positions.push(Math.abs(i - j));
                }
            }
            distanceTab.push(Math.min.apply(Math, positions));
        }
    });
    return distanceTab;
};
var main = function () {
    while (testCasesNumber < 1 || testCasesNumber > 1000) {
        testCasesNumber = parseInt(prompt('guess a number of test cases :  ').toString());
    }
    var i = 0;
    while (i < testCasesNumber) {
        var n = 0;
        var m = 0;
        while ((n < 1 || n > 182) && (m < 1 || m > 182)) {
            var pair = prompt("guess a pair of test case  " + i + " ").split(' ').slice(0, 2);
            n = parseInt(pair[0].replace(/\s+$/g, '').toString());
            m = parseInt(pair[1].replace(/\s+$/g, '').toString());
        }
        var arrayOfWords = [];
        for (var i_1 = 0; i_1 < n; i_1++) {
            var word = '';
            while (word.length != m) {
                word = prompt("give a word of a single bitmap of line  " + i_1 + " ");
            }
            arrayOfWords.push(word);
        }
        testCases.push({ n: n, m: m, bitmap: arrayOfWords });
        i++;
    }
    testCases.map(function (testCase) {
        var result = CalculateDistance(testCase);
        showOutput(result, testCase.m);
    });
    process.exit();
};
main();
