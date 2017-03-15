"use strict";
/**
 * reverse a string
 * cannot truly be done "in-place" because JavaScript strings are immutable
 */
function reverseString(str) {
  var strArray = str.split(""),
      tmp;
  for(var i = 0; i < Math.floor(strArray.length/2); i++) {
    tmp = strArray[i];
    strArray[i] = strArray[strArray.length-1-i];
    strArray[strArray.length-1-i] = tmp;
  }
  return strArray.join("");
}
/* reverse words in a sentence */
function reverseWords(str) {
  var sentence = [],
      wordLength = 0;
  for(var i = str.length-1; i >= 0; i--) {
    if(str.charAt(i) === " " || i === 0) {
      sentence.push(str.substr(i, wordLength+1).trim());
      wordLength = 0;
    } else {
      wordLength++;
    }
  }
  return sentence.join(" ");
}
/* reverse words in place */
function reverseInPlace(str) {
  return reverseWords(reverseString(str));
}
/* find first nonrepeating character in a string */
function findFirstNonrepeatingChar(str) {
  var hashMap = {},
      chars = [],
      numChars = 0;
  for(var i = 0; i < str.length; i++) {
    let c = str.charAt(i);
    if(!hashMap[c]) {
      hashMap[c] = 1;
      chars.push(c); // store character for lookup later
    } else {
      hashMap[c]++;
    }
  }
  for(i = 0; i < chars.length; i++) {
    let count = hashMap[chars[i]];
    if(count === 1) return chars[i];
  }
  return "A nonrepeating character does not exist.";
}
/* remove duplicated characters in a string */
function removeDuplicateChar(str) {
  var hashMap = {};
  var newStr = "";
  for(var i = 0; i < str.length; i++) {
    let c = str.charAt(i);
    if(!hashMap[c]) {
      hashMap[c] = true;
      newStr += c;
    }
  }
  return newStr;
}
/* find the first longest string in an array of strings */
function findLongestString(strings) {
  var num = 0,
      idx,
      len;
  for(var i = 0; i < strings.length; i++) {
    len = strings[i].length;
    if(len > num) {
      num = len;
      idx = i;
    }
  }
  return strings[idx];
}
/* check if a string is a palindrome, whitespaces are taken into account */
function isPalindrome(str) {
  return (str.split("").reverse().join("") === str);
}
/**
 * create a hashmap for an array of strings
 * keys are the lowercase sorted versions of the words
 */
function createAnagramHashMap(strings) {
  var hashMap = {}, str;
  for(var i = 0; i < strings.length; i++) {
    str = strings[i].toLowerCase().split("").sort().join("");
    if(!hashMap[str]) hashMap[str] = [strings[i]];
    else hashMap[str].push(strings[i]);
  }
  return hashMap;
}
/**
 * check if a string is an anagram of another string
 */
function isAnagram(str1, str2) {
  str1 = str1.toLowerCase().split("").sort().join("");
  str2 = str2.toLowerCase().split("").sort().join("");
  return str1 === str2;
}
/* flatten an array, multiple levels deep */
function flatten(strings) {
  return strings.reduce(function(accumulator, ele) {
    return accumulator.concat(Array.isArray(ele) ? flatten(ele) : ele);
  }, []);
}
/**
 * check if one string is a rotated version of another string
 * approach: check if first string is inside the concatenation of
 * the second string with the second string
 */
function isRotated(str1, str2) {
  var combinedStr = str2 + str2;
  return combinedStr.indexOf(str1) !== -1 ? true : false;
}
/**
 * filter a string for uppercase letters and arrange them alphabetically
 * assumes input is a valid ASCII string
 */
function filterString(str) {
  var res = "";
  // str = str.split("").filter(function(ele) {
  //   charCode = ele.charCodeAt(0);
  //   if(charCode >= 65 && charCode <= 90) return true;
  //   return false;
  // }).sort().join("");
  // return str;

  for(let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if(c >= 65 && c <= 90) res += str.charAt(i);
  }
  return res.split("").sort().join("");
}
/* find all DISTINCT permutations of a string, assuming no whitespaces */
function permuteString(str) {
  var arr = str.split(""),
      permutations = [],
      doneBefore = {},
      len = arr.length;
  if(arr.length === 0) {
    return [str]; // empty string
  }
  for(let i = 0; i < len; i++) {
    // we do not want the original arr modified, create copy
    let copy = arr.slice();
    let partial = copy.splice(i, 1);
    let partialPerms = permuteString(copy.join(""));
    for(let j = 0; j < partialPerms.length; j++) {
      let p = partialPerms[j];
      if(!doneBefore[p]) {
        doneBefore[p] = true;
        let result = partial.concat(p);
        permutations.push(result.join(""));
      }
    }
  }
  return permutations;
}
/* find longset common subsequence, similar approach to LCSubstring */
function findLCSubsequence(str1, str2) {
  if(str1.length === 0 || str2.length === 0) return "";
  var table = [], zeros = [],
      lcs = "",
      i, j;
  for(i = 0; i < str1.length; i++) {
    for(j = 0; j < str2.length; j++) {
      zeros.push(0);
    }
    table.push(zeros);
    zeros = [];
  }
  for(i = 0; i < str1.length; i++) {
    for(j = 0; j < str2.length; j++) {
      if(str1.charAt(i) === str2.charAt(j)) {
        if(i && j) {
          table[i][j] = table[i-1][j-1]+1;
        } else {
          table[i][j]++;
        }
      } else {
        if(i && j) {
          table[i][j] = Math.max(table[i-1][j], table[i][j-1]);
        }
      }
    }
  }
  i = str1.length-1;
  j = str2.length-1;
  // build the subsequence from the bottom right corner of the table
  while(i >= 0 && j >= 0) {
    let c1 = str1.charAt(i);
    let c2 = str2.charAt(j);
    if(c1 === c2) {
      lcs = c1 + lcs;
      i--;
      j--;
    } else if(i && j) {
      // find greater of the two and go the direction of the greater value
      if(table[i-1][j] > table[i][j-1]) i--;
      else j--;
    } else {
      // table boundaries
      if(j === 0) i--;
      else j--;
    }
  }
  return lcs;
}
/* find longest common substring */
function findLCSubstring(str1, str2) {
  var table = [], zeros = [],
      len1 = str1.length, len2 = str2.length,
      lcsLen = 0,
      endIndex, i, j;
  for(i = 0; i < len1; i++) {
    for(j = 0; j < len2; j++) {
      zeros.push(0);
    }
    table.push(zeros);
    zeros = [];
  }
  for(i = 0; i < len1; i++) {
    for(j = 0; j < len2; j++) {
      if(str1.charAt(i) === str2.charAt(j)) {
        if(i && j) { // if either i or j is zero, then we move to else case
          // part of the longest common substring
          table[i][j] = table[i-1][j-1]+1;
        } else {
          // start of the longest common substring
          table[i][j]++;
        }
        // check if substring length is greater than current lcsLen, save index
        if(table[i][j] > lcsLen) {
          lcsLen = table[i][j];
          endIndex = i;
        }
      }
    }
  }
  return str1.substr(endIndex+1-lcsLen, lcsLen);
}
/**
 * find longest palindromic substring
 * naive approach: find all possible substrings and compare
 * better approach: expand around every single character (quadratic)
 * best approach: Manacher's algorithm (linear)
 */
function findLongestPalindromicSubstring(str) {
  function preprocess(str) {
    if(str.length === 0) return "^$";
    var processedStr = "^", i;
    for(i = 0; i < str.length; i++) {
      processedStr += "#" + str.charAt(i);
    }
    processedStr += "#$";
    return processedStr;
  }
  var processedStr = preprocess(str),
      rightBound = 0, center = 0, maxLen = 0,
      arr = [],
      index, i;
  for(i = 0; i < processedStr.length; i++) {
    arr.push(0);
  }
  for(i = 1; i < processedStr.length-1; i++) {
    let mirror = center-(i-center); // center - (i - center)
    // if i is within the right bound of C's palindrome, do not expand on
    // previously calculated information
    if(i < rightBound) arr[i] = Math.min(arr[mirror], rightBound-i);
    while(processedStr.charAt(i+arr[i]+1) === processedStr.charAt(i-arr[i]-1)) {
      arr[i]++;
    }
    if(i+arr[i] > rightBound) {
      center = i;
      rightBound = i+arr[i];
    }
  }
  // loop and find largest value, account for ^ and $
  for(i = 1; i < arr.length-1; i++) {
    if(arr[i] > maxLen) {
      maxLen = arr[i];
      index = i;
    }
  }
  return str.substr(Math.floor((index-maxLen)/2), maxLen);
}
/**
 * given a string s and a dictionary, return all possible sentences that
 * can be constructed from the given string
 * dynamic programming approach: go through each possible substring, storing
 * results in a list at each index, then search through the results
 * and print out all possible sentences
 */
function wordBreak(str, dict) {
  var arr = [], sentences = [], currStr = "", i, j;
  for(i = 0; i <= str.length; i++) {
    arr.push([]);
  }
  for(i = 0; i < str.length; i++) {
    if(arr[i]) {
      // create arr of length str.length+1 since substr bounds is [i,j)
      for(j = i+1; j <= str.length; j++) {
        let sub = str.substr(i,j-i);
        if(dict[sub]) {
          // append to existing list
          arr[j].push(sub);
        }
      }
    }
  }
  // sentence cannot be constructed from the given string
  if(!arr[str.length]) return [];
  // sentence can be constructed from the given string, return possibilities
  wordBreakHelper(sentences, currStr, arr, str.length);
  return sentences;
}
function wordBreakHelper(sentences, currStr, arr, i) {
  if(i === 0) {
    sentences.push(currStr.trim());
  } else {
    for(var j = 0; j < arr[i].length; j++) {
      let str = arr[i][j];
      let combinedStr = str + " " + currStr;
      wordBreakHelper(sentences, combinedStr, arr, i-str.length);
    }
  }
}
var dict = {
  "a": true,
  "at": true,
  "ace": true,
  "am": true,
  "aid": true,
  "and": true,
  "apple": true,
  "are": true,
  "ban": true,
  "banshee": true,
  "cat": true,
  "cats": true,
  "deer": true,
  "dove": true,
  "fire": true,
  "fired": true,
  "grand": true,
  "ground": true,
  "hate": true,
  "hates": true,
  "I": true,
  "is": true,
  "mace": true,
  "menace": true,
  "never": true,
  "on": true,
  "oven": true,
  "over": true,
  "pig": true,
  "play": true,
  "playground": true,
  "pork": true,
  "sand": true,
  "sheet": true,
  "sheets": true,
  "should": true,
  "silver": true,
  "sinister": true,
  "struck": true,
  "the": true,
  "they": true,
  "those": true,
  "trick": true,
  "tricks": true,
  "tricked": true,
  "truck": true,
};
/* test suite */
function test() {
  console.log("========= test() START =========");
  console.log("=== wordBreak() ===");
  var randomStr = "catsanddeerontheplayground";
  console.log("Word break for catsanddeerontheplayground (successful):");
  console.log(wordBreak(randomStr, dict));

  randomStr = "abadaba";
  console.log("Word break for abadaba (unsuccessful):");
  console.log(wordBreak(randomStr, dict));

  randomStr = "trickstruckamace";
  console.log("Word break for trickstruckamace (successful):");
  console.log(wordBreak(randomStr, dict));

  randomStr = "bansheetsfiredoven";
  console.log("Word break for bansheetsfiredoven (successful):");
  console.log(wordBreak(randomStr, dict));

  console.log("=== permuteString() ===");
  randomStr = "cat";
  console.log("permutations for " + str + " (there should be 6)");
  console.log("[" + permuteString(randomStr) + "]");

  randomStr = "hall";
  console.log("permutations for " + str + " (there should be 12)");
  console.log("[" + permuteString(randomStr) + "]");

  randomStr = "rolls";
  console.log("permutations for " + str + " (there should be 60)");
  console.log("[" + permuteString(randomStr) + "]");

  console.log("=== findLCSubsequence() ===");
  var str1 = "mariokartisreallyfun";
  var str2 = "marketpricesarehigh";
  console.log("Longest common subsequence for " + str1 + " and " + str2);
  console.log(findLCSubsequence(str1, str2));
  str1 = "ceruleancityisblue";
  str2 = "celadoncityisgreenbutilovethehue";
  console.log("Longest common subsequence for " + str1 + " and " + str2);
  console.log(findLCSubsequence(str1, str2));
  str1 = "kirbyandthecrystalshards";
  str2 = "dynamicprogrammingishardbutcool";
  console.log("Longest common subsequence for " + str1 + " and " + str2);
  console.log(findLCSubsequence(str1, str2));

  console.log("=== findLCSubstring() ===");
  str1 = "mariokartisreallyfun";
  str2 = "marketpricesarehigh";
  console.log("Longest common substring for " + str1 + " and " + str2);
  console.log(findLCSubstring(str1, str2));
  str1 = "ceruleancityisblue";
  str2 = "celadoncityisgreenbutilovethehue";
  console.log("Longest common substring for " + str1 + " and " + str2);
  console.log(findLCSubstring(str1, str2));
  str1 = "kirbyandthecrystalshards";
  str2 = "dynamicprogrammingishardbutcool";
  console.log("Longest common substring for " + str1 + " and " + str2);
  console.log(findLCSubstring(str1, str2));

  console.log("=== findFirstNonrepeatingChar() ===");
  randomStr = "fadferwowrefdafxyz";
  console.log(randomStr + " (o): " + findFirstNonrepeatingChar(randomStr));
  randomStr = "the quick brown fox jumps over the lazy dog";
  console.log(randomStr + " (t): " + findFirstNonrepeatingChar(randomStr));
  randomStr = "sinister sundown";
  console.log(randomStr + " (i): " + findFirstNonrepeatingChar(randomStr));

  console.log("=== removeDuplicateChar() ===");
  randomStr = "fadferwowrefdafxyz";
  console.log(randomStr + ": " + removeDuplicateChar(randomStr));
  randomStr = "cherry blossom";
  console.log(randomStr + ": " + removeDuplicateChar(randomStr));
  randomStr = "sinister sundown";
  console.log(randomStr + ": " + removeDuplicateChar(randomStr));

  console.log("=== reverseString() ===");
  console.log("crimson racecar: " + reverseString("crimson racecar"));
  console.log("vermillion ashes: " + reverseString("vermillion ashes"));
  console.log("stormy weather: " + reverseString("stormy weather"));
  console.log("verdant grass: " + reverseString("verdant grass"));
  console.log("cerulean skyline: " + reverseString("cerulean skyline"));

  console.log("=== reverseWords() ===");
  console.log("the name is bond: " + reverseWords("the name is bond"));
  console.log("silent night: " + reverseWords("silent night"));
  console.log("I have a dream: " + reverseWords("I have a dream"));
  console.log("castle in the air: " + reverseWords("castle in the air"));
  console.log("flowering night: " + reverseWords("flowering night"));

  console.log("=== reverseInPlace() ===");
  console.log("unsightly matters: " + reverseInPlace("unsightly matters"));
  console.log("business conglomerate: " + reverseInPlace("business conglomerate"));
  console.log("holy cow: " + reverseInPlace("holy cow"));
  console.log("open the door: " + reverseInPlace("open the door"));
  console.log("denim jeans are expensive: " + reverseInPlace("denim jeans are expensive"));

  console.log("=== isPalindrome() ===");
  console.log("racecar (true): " + isPalindrome("racecar"));
  console.log("rotten (false): " + isPalindrome("rotten"));
  console.log("willow (false): " + isPalindrome("willow"));
  console.log("amanaplanacanalpanama (true): " + isPalindrome("amanaplanacanalpanama"));
  console.log("hex  (false, whitespace): " + isPalindrome("hex "));
  console.log("rat tar (true): " + isPalindrome("rat tar"));

  console.log("=== createAnagramHashMap() and findLongestString() ===");
  var strings = ["stars", "rats", "ratss", "starr", "start", "tarts", "never", "barren"];
  console.log(findLongestString(strings) + " is the first longest string in the array");
  console.log("Creating anagram hash map for " + strings.toString());
  console.log("hashMap: " + JSON.stringify(createAnagramHashMap(strings), null, "\t"));

  strings = ["torn", "rot", "rots", "snort", "torns", "tro", "orn", "ornament"];
  console.log(findLongestString(strings) + " is the first longest string in the array");
  console.log("Creating anagram hash map for " + strings.toString());
  console.log("hashMap: " + JSON.stringify(createAnagramHashMap(strings), null, "\t"));

  strings = ["vast", "stave", "vaster", "waste", "astew", "askew", "last", "savior"];
  console.log(findLongestString(strings) + " is the first longest string in the array");
  console.log("Creating anagram hash map for " + strings.toString());
  console.log("hashMap: " + JSON.stringify(createAnagramHashMap(strings), null, "\t"));

  console.log("=== isAnagram() ===");
  console.log("stars and rats (false): " + isAnagram("stars", "rats"));
  console.log("carts and starc (true): " + isAnagram("carts", "starc"));
  console.log("never and evern (true): " + isAnagram("never", "evern"));
  console.log("askew and skew (false): " + isAnagram("askew", "skew"));
  console.log("rotten and nettor (true): " + isAnagram("rotten", "nettor"));

  console.log("=== flatten() ===");
  var numbers = [1,[2,3,4,5],[6],[99,100,[101],[102],[103,[104]]]];
  console.log("Flattening [1,[2,3,4,5],[6],[99,100,[101],[102],[103,[104]]]]");
  console.log(flatten(numbers));

  numbers = [[[[[[[1,2,3,4,5]]]]]]];
  console.log("Flattening [[[[[[[1,2,3,4,5]]]]]]");
  console.log(flatten(numbers));

  numbers = [1,[[2,[3,[4]],5],[6],[99,100,101,102,[103,[104]]]]];
  console.log("Flattening [1,[[2,[3,[4]],5],[6],[99,100,101,102,[103,[104]]]]]");
  console.log(flatten(numbers));

  strings = ['fire',['armory'],['emblem'],['marth','roy',['arena'],['cavalier'],['battle',['vendor']]]];
  console.log("Flattening ['fire',['armory'],['emblem'],['marth','roy',['arena'],['cavalier'],['battle',['vendor']]]]");
  console.log(flatten(strings));

  strings = ['mario',[[[[[[[[['kart','yoshi','luigi','peach']]]]]]]]]];
  console.log("Flattening ['mario',[[[[[[[[['kart','yoshi','luigi','peach']]]]]]]]]");
  console.log(flatten(strings));

  strings = ['lloyd','genis',['kratos','presea'],['zelos','raine'],[[['regal','colette']]]];
  console.log("Flattening ['lloyd','genis',['kratos','presea'],['zelos','raine'],[[['regal','colette']]]]");
  console.log(flatten(strings));

  console.log("=== filterString() ===");
  var str = "aBcDzZdSedfDsEEsd";
  console.log("Filtering " + str + ", should be BDDEESZ: " + filterString(str));
  str = "fDaFdsdFOPasdfDDfE";
  console.log("Filtering " + str + ", should be DDDEFFOP: " + filterString(str));
  str = "aBcDzZZXXdEfDHDfSEsdA";
  console.log("Filtering " + str + ", should be ABDDDEEHSXXZZ: " + filterString(str));

  console.log("=== isRotated() ===");
  str1 = "helloworld";
  str2 = "orldhellow";
  console.log("Is "+str2+" a rotated version of "+str1+"? (true)");
  console.log(isRotated(str1,str2));
  str1 = "helloworld";
  str2 = "holloworld";
  console.log("Is "+str2+" a rotated version of "+str1+"? (false)");
  console.log(isRotated(str1,str2));
  str1 = "helloworld";
  str2 = "elloworldx";
  console.log("Is "+str2+" a rotated version of "+str1+"? (false)");
  console.log(isRotated(str1,str2));

  console.log("========= test() END =========");
}
test();
