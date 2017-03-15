"use strict";
/* flatten an array, multiple levels deep */
function flatten(strings) {
  strings.reduce(function(accumulator, ele) {
    accumulator.concat(ele.isArray() ? flatten(ele) : ele);
  }, []);
}
/**
 * swap method for array
 */
function swap(arr, a, b) {
  var temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
/**
 * reverse elements in an array in-place
 */
function reverse(arr, start, end) {
  for(var i = start; i <= Math.floor((start+end)/2); i++) {
    swap(arr, i, start+end-i);
  }
}
/**
 * remove duplicates in an array
 * assume inputs are of the same type and are primitives
 * remember that hash table keys can only be strings
 */
function removeDuplicates(arr) {
  var hashMap = {};
  var newArray = [];
  for(let i = 0; i < arr.length; i++) {
    let ele = arr[i];
    if(!hashMap[ele]) {
      hashMap[ele] = 1;
      newArray.push(ele);
    }
  }
  return newArray;
}
function testPartOne() {
  console.log("========= testPartOne() START =========");

  console.log("=== removeDuplicates() ===");
  var strs = ["Hello", "my", "name", "is", "Wilson", "and", "his", "name",
    "is", "Jackson"];
  console.log("Removing duplicates for the following array: [" + strs + "]");
  console.log("CORRECT: [Hello,my,name,is,Wilson,and,his,Jackson]");
  console.log("ACTUAL: [" + removeDuplicates(strs) + "]");

  console.log("=== gcd() ===");
  var a = [12, 19, 258, 948, 1063];
  var b = [39, 69, 345, 321, 2599];
  console.log("gcd of " + a[0] + " and " + b[0] + " is " + gcd(a[0], b[0]));
  console.log("Correct value is 3");

  console.log("gcd of " + a[1] + " and " + b[1] + " is " + gcd(a[1], b[1]));
  console.log("Correct value is 1");

  console.log("gcd of " + a[2] + " and " + b[2] + " is " + gcd(a[2], b[2]));
  console.log("Correct value is 3");

  console.log("gcd of " + a[3] + " and " + b[3] + " is " + gcd(a[3], b[3]));
  console.log("Correct value is 3");

  console.log("gcd of " + a[4] + " and " + b[4] + " is " + gcd(a[4], b[4]));
  console.log("Correct value is 1:");
}

/**
 * rotate an array in linear time and without using extra storage space
 * naive approach: rotate the array's elements one by one O(n*d)
 *  - this requires multiple function calls to rotateArray()
 * best approach: use the juggling algorithm O(n)
 * duplicates allowed, rotations are to the LEFT
 */
function rotateArray(arr, rotateNum) {
  var numSets = gcd(rotateNum, arr.length);
  var temp, j, k;
  for(var i = 0; i < numSets; i++) {
    temp = arr[i];
    j = i;
    while(true) {
      k = rotateNum + j; // get number to increment by
      if(k >= arr.length) k = k - arr.length;
      if(k === i) break;
      arr[j] = arr[k];
      j = k;
    }
    arr[j] = temp;
  }
}
function rotateArrayTest() {
  var arr = [], model = [], i, j, ele, r, rMod, index;
  // create sorted array
  for(i = 0; i < 20; i++) {
    ele = Math.floor(Math.random()*10) + (i*5);
    arr.push(ele);
    model.push(ele);
  }
  quicksort(arr, 0, arr.length-1);
  quicksort(model, 0, arr.length-1);
  console.log("Array to test: " + arr);
  // 20 trials
  for(i = 0; i < 20; i++) {
    r = Math.floor(Math.random()*100);
    rMod = r % arr.length;
    console.log("Rotating array by " + r + " elements (" + rMod + ")");
    rotateArray(arr, rMod);
    for(j = 0; j < arr.length; j++) {
      index = (j + rMod) % arr.length;
      if(arr[j] !== model[index])
        throw new Error("FAILED: rotateArray() failed to match "
          + model[index]);
    }
    console.log("Result: " + arr);
    // revert to original array for next cycle of testing
    for(j = 0; j < arr.length; j++) {
      arr[j] = model[j];
    }
  }
  console.log("===rotateArrayTest(): SUCCESS===");
}
