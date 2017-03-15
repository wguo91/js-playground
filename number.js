"use strict";
/* determine if a number is prime */
function isPrime(num) {
  var divisor = 3,
      limit = Math.sqrt(num);
  if(num === 2 || num === 3) return true;
  if(num % 2 === 0) return false;
  var divisor = 3;
  while(divisor <= limit) {
    if(num % divisor === 0) return false;
    divisor += 2;
  }
  return true;
}
/* get prime factors of a number */
function getPrimeFactors(num) {
  var factors = [],
      divisor = 2;
  while(num >= 2) {
    if(num % divisor === 0) {
      factors.push(divisor);
      num /= divisor;
    } else {
      divisor++;
    }
  }
  return factors;
}
/**
 * return all prime numbers up to n, assume n >= 2
 * Sieve of Eratosthenes
 */
function listPrimes(n) {
  var primes = [], final = [], i, j;
  for(i = 0; i <= n; i++) {
    primes.push(true);
  }
  for(i = 2; i <= n; i++) {
    if(primes[i]) {
      for(j = i+i; j <= n; j += i) {
        primes[j] = false;
      }
    }
  }
  primes.forEach(function(ele, idx) {
    if(ele && idx > 1) final.push(idx);
  });
  return final;
}
/* obtain the nth fibonacci number */
function fibonacci(n) {
  var fibo = [0,1];
  for(var i = 2; i <= n; i++) {
    fibo.push(fibo[i-1] + fibo[i-2]);
  }
  console.log(fibo);
  return fibo[n];
}
/* merge two sorted arrays */
function mergeSortedArray(arr1, arr2) {
  if(arr1.length === 0) return arr2;
  if(arr2.length === 0) return arr1;
  var merged = [],
      ele1 = arr1[0],
      ele2 = arr2[0],
      i = 0,
      j = 0;
  while(ele1 || ele2) {
    if(ele1 && !ele2 || ele1 < ele2) {
      merged.push(ele1);
      ele1 = arr1[++i];
    } else {
      merged.push(ele2);
      ele2 = arr2[++j];
    }
  }
  return merged;
}
/* swap numbers without using temporary variables */
function swap(a, b) {
  console.log("Before swap: a is " + a + " and b is " + b);
  a = a - b;
  b = b + a;
  a = b - a;
  console.log("After swap: a is " + a + " and b is " + b);
}
/* given an unsorted array of numbers from 1 to 100, find the missing number */
function findMissingNumber(arr) {
  var len = arr.length+1,
      expectedSum = (len+1)*(len/2),
      sum = 0;
  for(var i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return expectedSum - sum;
}
/**
 * determine if there are two numbers in an array that sum up to the given
 * value, naive approach: two for loops, better approach: use an object to
 * store the difference of the value and the value at index i
 */
function twoSum(arr, val) {
  var diffObj = {},
      len = arr.length;
  for(var i = 0, j = 1; i < len; i++) {
    let diff = val - arr[i];
    if(!diffObj[diff]) diffObj[arr[i]] = true;
    else {
      console.log(arr[i] + " + " + diff + " = " + val);
      return true;
    }
  }
  return false;
}
/**
 * given an array of n integers, construct a product array such that
 * prod[i] is equal to the product of all elements of arr[] except arr[i],
 * do not use the division operator and solve in O(n)
 */
function productArray(arr) {
  var productArray = [], left = [], right = [];
  left.push(1);
  right.push(1);
  for(let i = 1; i < arr.length; i++) {
    left[i] = left[i-1]*arr[i-1];
    right[i] = right[i-1]*arr[arr.length-i];
  }
  for(let i = 0; i < arr.length; i++) {
    productArray.push(left[i]*right[arr.length-1-i]);
  }
  return productArray;
}
/**
 * find all triplets that sum to a specified value, input array
 * is guaranteed to have length greater than or equal to three
 * naive approach: three for loops
 * better approach: sort through the array, then have two pointers starting
 * at the beginning and end of the array,
 */
function threeSum(arr, val) {
  var sortedArray = arr.sort(function(a,b) {
    return a-b;
  });
  var combinations = [];
  for(let i = 0; i < arr.length-2; i++) {
    let left = i+1;
    let right = arr.length-1;
    while(left < right) {
      let sum = arr[i] + arr[left] + arr[right];
      if(sum === val) {
        combinations.push([arr[i], arr[left], arr[right]]);
        left++;
        right--;
      } else if(sum < val) {
        left++;
      } else {
        right--;
      }
    }
  }
  return combinations;
}
/**
 * find the minimum number of coins to produce a specified amount of change
 * approach: dynamic programming where we use an array of the number
 * of coins needed to create x amount of change
 * T[i] = Math.min(T[i], 1 + T(i - coinValues[j])) where i is the index of the
 * numCoins array and j is an index of the coinValues array; time complexity is
 * pseudo-polynomial time
 */
function minCoinChange(coinValues, total) {
  var numCoins = [];
  var indexArray = [];
  var whichCoins = [];
  var counter, leftOver;
  for(let i = 0; i <= total; i++) {
    numCoins.push(Infinity);
    indexArray.push(-1);
  }
  numCoins[0] = 0;
  for(let i = 0; i < coinValues.length; i++) {
    for(let j = 1; j <= total; j++) {
      if(j >= coinValues[i]) {
        if(numCoins[j] > 1+numCoins[j-coinValues[i]]) {
          numCoins[j] = 1+numCoins[j-coinValues[i]];
          indexArray[j] = i;
        }
      }
    }
  }
  leftOver = total;
  counter = numCoins[leftOver];
  while(counter > 0) {
    let index = indexArray[leftOver];
    if(index !== -1) {
      let value = coinValues[index];
      whichCoins.push(value);
      leftOver -= value;
      counter--;
    } else {
      throw new Error("Cannot produce change for amount specified.");
    }
  }
  return whichCoins;
}
function test() {
  console.log("========= testPartOne() START =========");
  console.log("=== minCoinChange() ===");
  var arr = [1,5,10,25];
  var num = 99;
  console.log("Produce change from [" + arr + "] to make " + num + " cents");
  console.log("Correct result: [25, 25, 25, 10, 10, 1, 1, 1, 1]");
  console.log("Actual result: [" + minCoinChange(arr, num).toString() + "]");
  arr = [2,4,5,9,15];
  num = 44;
  console.log("Produce change from [" + arr + "] to make " + num + " cents");
  console.log("Correct result: [15,15,9,5]");
  console.log("Actual result: [" + minCoinChange(arr, num).toString() + "]");
  arr = [1,2,5,10,20,50,100];
  num = 357;
  console.log("Produce change from [" + arr + "] to make " + num + " cents");
  console.log("Correct result: [100,100,100,50,5,2]");
  console.log("Actual result: [" + minCoinChange(arr, num).toString() + "]");

  console.log("=== threeSum() ===");
  arr = [0,1,4,5,12,16,17,18,19,20];
  num = 16;
  console.log("Finding three sum with value "+num+" for array ["+arr+"]");
  var answers = threeSum(arr, num);
  for(let i = 0; i < answers.length; i++) {
    console.log("["+answers[i].toString()+"]");
  }
  arr = [-1,0,5,1,2,5,4,3,10,9];
  num = 4;
  console.log("Finding three sum with value "+num+" for array ["+arr+"]");
  answers = threeSum(arr, num);
  for(let i = 0; i < answers.length; i++) {
    console.log("["+answers[i].toString()+"]");
  }
  arr = [-9,-3,-1,2,3,4,5,6,10,11];
  num = 7;
  console.log("Finding three sum with value "+num+" for array ["+arr+"]");
  debugger;
  answers = threeSum(arr, num);
  for(let i = 0; i < answers.length; i++) {
    console.log("["+answers[i].toString()+"]");
  }

  console.log("=== productArray() ===");
  arr = [5,7,3,9,8];
  console.log("Constructing product array for [" + arr + "]");
  console.log(productArray(arr));
  arr = [2,8,-5,-4,20];
  console.log("Constructing product array for [" + arr + "]");
  console.log(productArray(arr));
  arr = [1,25,12,7,1,2,6,4,6,0];
  console.log("Constructing product array for [" + arr + "]");
  console.log(productArray(arr));

  console.log("=== listPrimes() ===");
  console.log("List all primes numbers from 2 to 100");
  console.log(listPrimes(100));
  console.log("List all primes numbers from 2 to 65537");
  console.log(listPrimes(65537));

  console.log("=== twoSum() ===");
  var twoSumArr = [1,3,5,1,6,35,13,15,2,5,18,8];
  var sum = 23;
  console.log("Array: [" + twoSumArr + "]");
  console.log("Finding two values that sum up to " + sum + " (true)");
  console.log(twoSum(twoSumArr, sum));
  var sum = 2;
  console.log("Finding two values that sum up to " + sum + " (true)");
  console.log(twoSum(twoSumArr, sum));
  var sum = 15;
  console.log("Finding two values that sum up to " + sum + " (true)");  console.log(twoSum(twoSumArr, sum));
  var sum = 35;
  console.log("Finding two values that sum up to " + sum + " (false)");  console.log(twoSum(twoSumArr, sum));
  var sum = 34;
  console.log("Finding two values that sum up to " + sum + " (false)");  console.log(twoSum(twoSumArr, sum));

  console.log("=== findMissingNumber ===");
  arr = [];
  for(var i = 1; i <= 100; i++) {
    arr.push(i);
  }
  arr.splice(34, 1); // remove 35 from arr
  console.log("The missing number is (35): " + findMissingNumber(arr));
  arr.splice(34, 0, 35); // undo 35 removal
  arr.splice(72, 1); // remove 73 from arr
  console.log("The missing number is (73): " + findMissingNumber(arr));
  arr.splice(72, 0, 73); // undo 35 removal
  arr.splice(98, 1); // remove 73 from arr
  console.log("The missing number is (99): " + findMissingNumber(arr));

  console.log("=== isPrime() ===");
  console.log("2 is prime (true): " + isPrime(2));
  console.log("4 is prime (false): " + isPrime(4));
  console.log("171 is prime (false): " + isPrime(171));
  console.log("556 is prime (false): " + isPrime(556));
  console.log("69 is prime (false): " + isPrime(69));
  console.log("227 is prime (true): " + isPrime(227));

  console.log("=== getPrimeFactors() ===");
  console.log("Prime factors (2): " + getPrimeFactors(2));
  console.log("Prime factors (2, 2, 2): " + getPrimeFactors(8));
  console.log("Prime factors (3, 3, 19): " + getPrimeFactors(171));
  console.log("Prime factors (2, 2, 139): " + getPrimeFactors(556));
  console.log("Prime factors (3, 23): " + getPrimeFactors(69));
  console.log("Prime factors (227): " + getPrimeFactors(227));

  console.log("=== fibonacci() ===");
  console.log("1st number in fibonacci is (1): " + fibonacci(1));
  console.log("2nd number in fibonacci is (1): " + fibonacci(2));
  console.log("3rd number in fibonacci is (2): " + fibonacci(3));
  console.log("4th number in fibonacci is (3): " + fibonacci(4));
  console.log("5th number in fibonacci is (5): " + fibonacci(5));
  console.log("6th number in fibonacci is (8): " + fibonacci(6));
  console.log("7th number in fibonacci is (13): " + fibonacci(7));
  console.log("8th number in fibonacci is (21): " + fibonacci(8));
  console.log("9th number in fibonacci is (34): " + fibonacci(9));
  console.log("10th number in fibonacci is (55): " + fibonacci(10));

  console.log("=== mergeSortedArray() ===");
  var arr1 = [3,5,18,89,193,222,235,267,1088];
  var arr2 = [34,169,333,456,789,1200];
  console.log("Merging [" + arr1 + "] and [" + arr2 + "]");
  console.log("Result: [" + mergeSortedArray(arr1, arr2) + "]");
  arr1 = [1,2,3,4,5,6,7,99,100,101,102];
  arr2 = [1,2,3,4,5,50];
  console.log("Merging [" + arr1 + "] and [" + arr2 + "]");
  console.log("Result: [" + mergeSortedArray(arr1, arr2) + "]");
  arr1 = [88,99,999];
  arr2 = [87,100,998];
  console.log("Merging [" + arr1 + "] and [" + arr2 + "]");
  console.log("Result: [" + mergeSortedArray(arr1, arr2) + "]");

  console.log("=== swap() ===");
  var a = [34,19,286];
  var b = [1, 358, 999];
  for(var i = 0; i < a.length; i++) {
    swap(a[i], b[i]);
  }
}
test();
