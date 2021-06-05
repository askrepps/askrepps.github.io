/*
 * MIT License
 *
 * Copyright (c) 2021 Andrew Krepps
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

function displaySubAnagrams(inputId, targetId, resultsId) {
    var input = document.getElementById(inputId).value;
    var targetList = document.getElementById(targetId).value.split(/,?\s+/);

    var results = findSubAnagrams(input, targetList);

    document.getElementById(resultsId).innerHTML = 
        results.length > 0 ? 'Your input matched: ' + results.join(', ') : 'No matches';
}

function findSubAnagrams(input, targetList) {
    var inputLower = input.toLowerCase();
    var usedLetters = new Set();
    return targetList.filter(targetWord => {
        if (targetWord.trim().length === 0) {
            return false;
        }
        
        usedLetters.clear();

        var targetWordLower = targetWord.toLowerCase();
        var cleanInput = inputLower.replaceAll(targetWordLower, '');

        for (var i = 0; i < targetWordLower.length; i++) {
            var targetLetter = targetWordLower.charAt(i);
            if (targetLetter === ' ') {
                continue;
            }

            var found = false;
            for (var j = 0; j < cleanInput.length; j++) {
                var inputLetter = cleanInput.charAt(j);
                if (inputLetter === ' ') {
                    continue;
                }

                if (!usedLetters.has(j) && inputLetter === targetLetter) {
                    usedLetters.add(j);
                    found = true;
                    break;
                }
            }

            if (!found) {
                return false;
            }
        }

        return true;
   });
}
