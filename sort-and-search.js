/**
 * find minimum element in a rotated sorted array, no duplicates
 * if there are duplicates, we must use a linear search
 */
function findPivot(arr) {
  var lo = 0, hi = arr.length-1, mid;
  while(arr[lo] > arr[hi]) {
    mid = lo + Math.floor((hi-lo)/2);
    if(arr[mid] > arr[hi]) lo = mid;
    else hi = mid-1;
  }
  return lo;
};
/**
 * find an element in a rotated sorted array, no duplicates
 * if there are duplicates, we must use a linear search
 */
function binarySearchRotated(arr, num) {
  var lo = 0, hi = arr.length-1, mid;
  while(lo <= hi) {
    mid = lo + Math.floor((hi-lo)/2);
    if(arr[mid] === num) return mid;
    if(arr[mid] >= arr[lo]) {
      // left side is strictly in increasing order
      if(num >= arr[lo] && num < arr[mid]) hi = mid-1;
      else lo = mid+1;
    } else {
      // right side is strictly in increasing order
      if(num <= arr[hi] && num > arr[mid]) lo = mid+1;
      else hi = mid-1;
    }
  }
  return -1;
}
function binarySearchRotatedTest() {
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
  var arr = [], i, target, result, answer, rotateNum;
  // create sorted array
  for(i = 0; i < 10; i++) {
    arr.push(Math.floor(Math.random()*10) + (i*10));
  }
  quicksort(arr, 0, arr.length-1);
  rotateNum = Math.floor(Math.random()*10);
  // rotate the array
  rotateArray(arr, rotateNum);
  console.log("Array to test: " + arr + " (rotated to the left " + rotateNum +
    " times)");
  // 30 trials
  for(i = 0; i < 30; i++) {
    target = arr[Math.floor(Math.random()*10)];
    answer = arr.indexOf(target);
    console.log("Looking for: " + target + " (located at " + answer + ")");
    result = binarySearchRotated(arr, target);
    if(result === null || result !== answer) // 0 is a falsy value
      throw new Error("FAILED: binarySearchRotated(), result was " + result);
    console.log("Result: " + result);
  }
  console.log("===binarySearchRotated(): SUCCESS===");
};

/**
 * find first instance of a number in sorted array, duplicates allowed
 * naive approach: linear search
 */
function binarySearchDuplicatesFirst(arr, num) {
  var lo = 0, hi = arr.length-1, mid;
  while(lo <= hi) {
    mid = lo + Math.floor((hi-lo)/2);
    if(num < arr[mid]) {
      hi = mid-1;
    } else if(num > arr[mid]){
      lo = mid+1;
    } else if(lo !== mid && arr[mid-1] === num) {
      hi = mid-1;
    } else return mid;
  }
  return -1;
}
function binarySearchDuplicatesFirstTest() {
  var arr = [], i, target, result, answer;
  // create sorted array
  for(i = 0; i < 10; i++) {
    arr.push(Math.floor(Math.random()*10));
  }
  quicksort(arr, 0, arr.length-1);
  console.log("Array to test: " + arr);
  // 30 trials
  for(i = 0; i < 30; i++) {
    target = arr[Math.floor(Math.random()*10)];
    answer = arr.indexOf(target);
    console.log("Looking for: " + target + " (located at " + answer + ")");
    result = binarySearchDuplicatesFirst(arr, target);
    if(result === null || result !== answer) // 0 is a falsy value
      throw new Error("FAILED: binarySearchDuplicatesFirst(), result was " + result);
    console.log("Result: " + result);
  }
  console.log("===binarySearchDuplicatesFirstTest(): SUCCESS===");
};
/**
 * find last instance of a number in sorted array, duplicates allowed
 * naive approach: linear search
 */
function binarySearchDuplicatesLast(arr, num) {
  var lo = 0, hi = arr.length-1, mid;
  while(lo <= hi) {
    mid = lo + Math.floor((hi-lo)/2);
    if(num < arr[mid]) {
      hi = mid-1;
    } else if(num > arr[mid]){
      lo = mid+1;
    } else if(hi !== mid && arr[mid+1] === num) {
      lo = mid+1;
    } else {
      return mid;
    }
  }
  return -1;
};
function binarySearchDuplicatesLastTest() {
  var arr = [], i, target, result, answer;
  // create sorted array
  for(i = 0; i < 10; i++) {
    arr.push(Math.floor(Math.random()*10));
  }
  quicksort(arr, 0, arr.length-1);
  console.log("Array to test: " + arr);
  // 30 trials
  for(i = 0; i < 30; i++) {
    target = arr[Math.floor(Math.random()*10)];
    answer = arr.lastIndexOf(target);
    console.log("Looking for: " + target + " (located at " + answer + ")");
    result = binarySearchDuplicatesLast(arr, target);
    if(result === null || result !== answer) // 0 is a falsy value
      throw new Error("FAILED: binarySearchDuplicatesLast(), result was " + result);
    console.log("Result: " + result);
  }
  console.log("===binarySearchDuplicatesLastTest(): SUCCESS===");
};
/**
 * find number of instances of a number in a sorted array, duplicates allowed
 */
function findNumberOfInstances(arr, num) {
  return binarySearchDuplicatesLast(arr, num) -
    binarySearchDuplicatesFirst(arr, num) + 1;
}
/**
 * binary search in sorted array, duplicates not allowed
 */
function binarySearch(arr, num) {
  var lo = 0, hi = arr.length-1, mid;
  while(lo <= hi) {
    mid = lo + Math.floor((hi-lo)/2);
    if(num === arr[mid]) return mid;
    else if(num > arr[mid]) lo = mid+1;
    else if(num < arr[mid]) hi = mid-1;
  }
  return null;
};
function binarySearchTest() {
  var arr = [], i, target, result;
  // create sorted array
  for(i = 0; i < 10; i++) {
    arr.push(Math.floor(Math.random()*10) + (i*10));
  }
  console.log("Array to test: " + arr);
  // 30 trials
  for(i = 0; i < 30; i++) {
    target = arr[Math.floor(Math.random()*10)];
    console.log("Looking for: " + target);
    result = binarySearch(arr, target);
    if(result === null) // 0 is a falsy value
      throw new Error("FAILED: binarySearch() returned null");
    console.log("Result: " + result);
  }
  console.log("===binarySearchTest(): SUCCESS===");
};

/**
 * find the greatest common divisor of two numbers
 * REQUIRED for rotateArray()
 */
function gcd(a, b) {
  if(b === 0) return a;
  return gcd(b, a % b);
}
/**
 * my favorite sorting function in the world: quicksort
 */
function partition(arr, lo, hi) {
  var pivot = lo + Math.floor((hi-lo)/2);
  var val = arr[pivot];
  var l = lo, r = hi;
  while(l <= r) {
    while(arr[l] < val) l++;
    while(arr[r] > val) r--;
    if(l <= r) {
      let tmp = arr[l];
      arr[l] = arr[r];
      arr[r] = tmp;
      l++;
      r--;
    }
  }
  return l;
}
function quicksort(arr, lo, hi) {
  let index = partition(arr, lo, hi);
  if(lo < index-1) quicksort(arr, lo, index-1);
  if(hi > index) quicksort(arr, index, hi);
  return arr;
}
function quicksortTest() {
  var arr = [], model = [], target, result, i, j, ele;
  for(i = 0; i < 30; i++) {
    // push random elements into array
    for(j = 0; j < 15; j++) {
      ele = Math.floor(Math.random()*50)
      arr.push(ele);
      model.push(ele);
    }
    console.log("Array to quicksort: [" + arr + "]");
    arr = quicksort(arr, 0, arr.length-1);
    model.sort(function(x, y) {
      return x - y;
    });
    for(j = 0; j < arr.length; j++) {
      if(arr[j] !== model[j])
        throw new Error("FAILED: quicksort() " +
          "failed to match Array.prototype.sort() results");
    }
    console.log("quicksort() successful: [" + arr + "]");
    arr = model = [];
  }
  console.log("===quicksortTest(): SUCCESS===");
}
function mergesort(arr, lo, hi) {
  if(lo < hi) {
    let mid = lo + Math.floor((hi-lo)/2);
    mergesort(arr, lo, mid);
    mergesort(arr, mid+1, hi);
    merge(arr, lo, mid, hi);
  }
  return arr;
}
function merge(arr, lo, mid, hi) {
  var temp = [], l = lo, r = mid+1, currIndex = lo;
  // copy data into a temporary array
  for(let i = 0; i < arr.length; i++) {
    temp.push(arr[i]);
  }
  while(l <= mid && r <= hi) {
    if(temp[l] <= temp[r]) {
      arr[currIndex] = temp[l];
      l++;
      currIndex++;
    } else if(temp[l] > temp[r]) {
      arr[currIndex] = temp[r];
      r++;
      currIndex++;
    }
  }
  // if there are leftover elements on the left side
  while(l <= mid) {
    arr[currIndex] = temp[l];
    l++;
    currIndex++;
  }
}
function mergesortTest() {
  var arr = [], model = [];
  for(let i = 0; i < 30; i++) {
    // push random elements into array
    for(let j = 0; j < 15; j++) {
      let ele = Math.floor(Math.random()*50);
      arr.push(ele);
      model.push(ele);
    }
    console.log("Array to mergesort: [" + arr + "]");
    arr = mergesort(arr, 0, arr.length-1);
    model.sort(function(x, y) {
      return x - y;
    });
    for(let j = 0; j < arr.length; j++) {
      if(arr[j] !== model[j])
        throw new Error("FAILED: mergesort() failed to match" +
          "Array.prototype.sort() results");
    }
    console.log("mergesort() successful: [" + arr + "]");
    arr = model = [];
  }
  console.log("===mergesortTest(): SUCCESS===");
}
binarySearchRotatedTest();
binarySearchDuplicatesFirstTest();
binarySearchDuplicatesLastTest();
quicksortTest();
mergesortTest();
