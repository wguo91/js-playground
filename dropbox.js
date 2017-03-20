/**
 * implement a function log hits on a web server
 * approach: use an array of Date objects
 */
arr = [];
function logHits() {
  var index = getIndex();
  arr.push(Date.now());
  arr.splice(0, index); // remove all elements outside the five minute range
}
function logHitsLastFiveMin() {
  var index = getIndex();
  return arr.length - index; // return the number of hits
}
/**
 * getIndex() is a helper function that returns the index of the first element
 * that fits within the five minute range, if there are no such elements,
 * the function returns arr.length
 */
function getIndex() {
  var index;
  var currentTime = Date.now();
  const fiveMinutes = 300000; // five minutes
  for(let i = 0; i < arr.length; i++) {
    // if arr[i] is within the five mnute range
    if(arr[i] >= currentTime - fiveMinutes) {
      // save the index of first log hit and break
      index = i;
      break;
    }
  }
  // all hits are outside the five minute range, return length of array
  if(index === undefined) return arr.length;
  return index;
}
/**
 * print out all possible letter combinations given a phone number (iterative)
 * phoneNumber is a string representation of a phone number
 */
function printCombinations(phoneNumber) {
  var digitMap = {
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz"
  };
  var output = [""];
  for(let i = 0; i < phoneNumber.length; i++) {
    let letters = digitMap[phoneNumber.charAt(i)];
    let partial = [];
    for(let j = 0; j < letters.length; j++) {
      for(let k = 0; k < output.length; k++) {
        partial.push(output[k] + letters[j]);
      }
    }
    // replace the output array with new combinations
    output = partial;
  }
  return output;
}
