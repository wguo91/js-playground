"use strict";
class Stack {
  constructor() {
    this.stack = [];
  }
  push(data) {
    if(data !== undefined) this.stack.push(data);
  }
  pop() {
    if(this.stack.length === 0) throw new Error("Stack is empty");
    return this.stack.pop();
  }
  peek() {
    if(this.stack.length === 0) throw new Error("Stack is empty.");
    return this.stack[this.stack.length-1];
  }
  isEmpty() {
    return this.stack.length === 0;
  }
  toString() {
    return this.stack.toString();
  }
}
/**
 * given an expression string, write a program to examine whether the pairs
 * and the orders of {, }, (, ), [, and ] are valid
 * approach: use a stack, pop the stack when matching parenthesis is encountered
 */
function areParenthesesBalanced(str) {
  var s = new Stack();
  for(let i = 0; i < str.length; i++) {
    let c = str.charAt(i);
    if(isOpen(c)) {
      s.push(c);
    } else {
      if(s.isEmpty()) return false;
      let popped = s.pop();
      if(!isMatch(popped, c)) return false;
    }
  }
  if(!s.isEmpty()) return false;
  return true;
}
/**
 * given a string consisting of opening and closing parentheses, find the
 * length of the longest valid parenthesis substring; '(' and ')' only
 */
function findLongestValidSubstring(str) {
  // baseIndex must be initialized to -1 for length subtraction to work
  var s = new Stack(), maxLength = 0, baseIndex = -1;
  for(let i = 0; i < str.length; i++) {
    let c = str.charAt(i);
    if(str.charAt(i) === "(") {
      s.push(i);
    } else {
      // found closing parenthesis
      if(s.isEmpty()) {
        // update the "base" of the string, since this case means there
        // is no matching opening parenthesis, essentially a "restart"
        baseIndex = i;
      } else {
        // found a pair of matching parentheses and stack is not empty
        s.pop();
        if(s.isEmpty()) {
          // all parentheses popped thus far are part of the same valid string
          maxLength = Math.max(maxLength, i-baseIndex);
        } else {
          // there were invalid matches before this pair
          maxLength = Math.max(maxLength, i-s.peek());
        }
      }
    }
  }
  return maxLength;
}
/**
 * helper functions for findLongestValidSubstring() and
 * areParenthesesBalanced()
 */
function isOpen(c) {
  if(c === "(" || c === "{" || c === "[")
    return true;
  return false;
}
function isMatch(c1, c2) {
  if(c1 === "(" && c2 === ")" ||
    c1 === "[" && c2 === "]" ||
    c1 === "{" && c2 === "}")
    return true;
  return false;
}
/* reverse a stack using recursion */
function reverseStack(s) {
  function popAll(s, arr) {
    if(!s.isEmpty()) {
      arr.push(s.pop());
      popAll(s, arr);
    }
  }
  function pushAll(s, arr, i) {
    if(i !== arr.length) {
      s.push(arr[i]);
      pushAll(s, arr, i+1);
    }
  }
  var arr = [];
  popAll(s, arr);
  pushAll(s, arr, 0);
}
/* sort a stack using recursion, largest element at the bottom */
function sortStack(s) {
  function sortedPush(s, ele) {
    if(s.isEmpty() || ele > s.peek()) {
      s.push(ele);
    } else {
      let tmp = s.pop(); // take top element away temporarily
      sortedPush(s, ele);
      s.push(tmp); // push top element back onto the stack
    }
  }
  if(!s.isEmpty()) {
    var popped = s.pop();
    sortStack(s); // recursively call sort to sort rest of stack
    sortedPush(s, popped);
  }
}
/**
 * find the NGE for each element in an array, return -1 if NGE does not exist
 * rightmost element will always have a NGE of -1
 * naive approach: use two for loops
 * best approach: use a stack for linear runtime
 */
function findNGE(arr) {
  var s = new Stack();
  var results = []; // store results
  for(let i = 0; i < arr.length; i++) {
    // keep popping while arr[i] > top element
    while(!s.isEmpty() && arr[i] > s.peek()) {
      results.push([s.pop(), arr[i]].toString());
    }
    s.push(arr[i]); // find NGE for each element
  }
  while(!s.isEmpty()) {
    results.push([s.pop(), -1].toString());
  }
  return results;
}
/**
 * determine if array represents preorder traversal of a BST
 * approach: elements after the NGE of an element i will always be greater
 * than i
 */
function isPreorder(arr) {
  var s = new Stack();
  var root = 0;
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] < root) return false;
    // save last removed element as root (right subtree)
    while(!s.isEmpty() && arr[i] > s.peek()) {
      root = s.peek();
      s.pop();
    }
    // stack is empty at this point or arr[i] < s.peek()
    s.push(arr[i]);
  }
  return true;
}
function stackTest() {
  console.log("===stackTest(): START===");
  var s = new Stack();
  var arr = [];
  for(let i = 0; i < 30; i++) {
    let num = Math.floor(Math.random()*100);
    console.log("Now pushing " + num + " to the stack");
    arr.push(num);
    console.log("Correct stack: [" + arr + "]");
    s.push(num);
    console.log("Actual stack: [" + s.toString() + "]");
    if(s.isEmpty()) throw new Error("FAILED: s.isEmpty() in stackTest()");
  }
  console.log("Reversing stack...");
  reverseStack(s);
  console.log("[" + s.toString() + "]");
  console.log("Reversing the reversed stack...");
  reverseStack(s);
  console.log("[" + s.toString() + "]");
  for(let i = 0; i < 30; i++) {
    let ele = arr.pop();
    let stackEle = s.peek();
    console.log("Now removing top element from the stack (should be " + ele + ")");
    console.log("Removing element: " + stackEle);
    let stackElePopped = s.pop();
    if(ele !== stackElePopped) throw new Error("FAILED: mismatch in stackTest()");
  }
  if(!s.isEmpty()) throw new Error("FAILED: stack not empty in stackTest()");
  console.log("===stackTest(): SUCCESS===");
}
function sortStackTest() {
  console.log("===sortStackTest(): START===");
  for(let i = 0; i < 10; i++) {
    let s = new Stack();
    let arr = [];
    for(let j = 0; j < 30; j++) {
      let num = Math.floor(Math.random()*100);
      arr.push(num);
      s.push(num);
      if(s.isEmpty()) throw new Error("FAILED: s.isEmpty() in stackTest()");
    }
    console.log("Sorting the following stack: [" + s.toString() + "]");
    arr.sort(function(a, b) {
      return a - b;
    });
    sortStack(s);
    console.log("Sorted stack (correct): [" + arr.toString() + "]");
    console.log("Sorted stack (actual): [" + s.toString() + "]");
    console.log("===sortStackTest(): SUCCESS===");
  }
}
/* test suite */
function test() {
  console.log("========= test() START =========");
  console.log("=== isPreorder() ===");
  var arr = [2,4,3,1];
  console.log("Is [" + arr.toString() + "] a valid preorder path? (false)");
  console.log(isPreorder(arr));
  arr = [45,30,25,40,80,100];
  console.log("Is [" + arr.toString() + "] a valid preorder path? (true)");
  console.log(isPreorder(arr));
  arr = [45,30,25,40,80,100,90,85,70];
  console.log("Is [" + arr.toString() + "] a valid preorder path? (false)");
  console.log(isPreorder(arr));

  console.log("=== areParenthesesBalanced() ===");
  var str = "{{{[]()()[]}}}";
  console.log("Is " + str + "balanced? (true)");
  console.log("Result: " + areParenthesesBalanced(str));
  str = "{{{[]([])()[]}}";
  console.log("Is " + str + "balanced? (false)");
  console.log("Result: " + areParenthesesBalanced(str));
  str = "[]](){}[[]][";
  console.log("Is " + str + "balanced? (false)");
  console.log("Result: " + areParenthesesBalanced(str));

  console.log("=== findLongestValidSubstring() ===");
  str = "))))((((";
  console.log("Longest valid substring for " + str + " is 0");
  console.log("Result: " + findLongestValidSubstring(str));
  str = "()()()))";
  console.log("Longest valid substring for " + str + " is 6");
  console.log("Result: " + findLongestValidSubstring(str));
  str = "))))()(((((";
  console.log("Longest valid substring for " + str + " is 2");
  console.log("Result: " + findLongestValidSubstring(str));
  str = "))(()))())((())))(";
  console.log("Longest valid substring for " + str + " is 6");
  console.log("Result: " + findLongestValidSubstring(str));

  console.log("=== findNGE() ===");
  arr = [1,2,3,4,5];
  console.log(findNGE(arr));
  arr = [99,98,97,96,95];
  console.log(findNGE(arr));
  arr = [1,2,15,14,17,3,18,9];
  console.log(findNGE(arr));

  console.log("========= test() END =========");
}
stackTest();
test();
sortStackTest();
