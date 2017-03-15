"use strict";
class BinarySearchTree {
  constructor() {
    this.root = null;
    this.size = 0;
  }
  add(node) {
    var cursor = this.root;
    if(!cursor) {
      this.root = node;
      this.size++;
      return true;
    }
    while(true) {
      if(node.data < cursor.data) {
        if(!cursor.left) {
          cursor.left = node;
          break;
        }
        cursor = cursor.left;
      } else if(node.data > cursor.data) {
        if(!cursor.right) {
          cursor.right = node;
          break;
        }
        cursor = cursor.right;
      } else {
        throw new Error("No duplicates allowed.");
      }
    }
    this.size++;
    return true;
  }
  contains(data) {
    var cursor = this.root;
    if(!cursor) return false;
    while(true) {
      if(data < cursor.data) {
        if(!cursor.left) return false;
        cursor = cursor.left;
      } else if(data > cursor.data) {
        if(!cursor.right) return false;
        cursor = cursor.right;
      } else {
        return true;
      }
    }
  }
  findLeftSubtreeMax(node) {
    while(node.right) {
      node = node.right;
    }
    return node;
  }
  getRoot() {
    return this.root;
  }
  getSize() {
    return this.size;
  }
  /**
   * return the preorder, inorder, postorder, and breadth first search
   * traversals of a BST (iterative)
   */
  preorder() {
    var path = [];
    var stack = new Stack();
    stack.push(this.root);
    while(!stack.isEmpty()) {
      let ele = stack.pop();
      path.push(ele.data);
      if(ele.right) stack.push(ele.right);
      if(ele.left) stack.push(ele.left);
    }
    return path;
  }
  inorder() {
    var path = [];
    var stack = new Stack();
    var cursor = this.root;
    while(cursor) {
      stack.push(cursor);
      cursor = cursor.left;
    }
    while(!stack.isEmpty()) {
      let ele = stack.pop();
      path.push(ele.data);
      if(ele.right) {
        let node = ele.right;
        while(node) {
          stack.push(node);
          node = node.left;
        }
      }
    }
    return path;
  }
  postorder() {
    var path = [];
    var s1 = new Stack();
    var s2 = new Stack();
    s1.push(this.root);
    while(!s1.isEmpty()) {
      let ele = s1.pop();
      s2.push(ele);
      if(ele.left) s1.push(ele.left);
      if(ele.right) s1.push(ele.right);
    }
    while(!s2.isEmpty()) {
      path.push(s2.pop().data);
    }
    return path;
  }
  breadthFirstSearch() {
    var path = [];
    var q = new Queue();
    q.enqueue(this.root);
    while(!q.isEmpty()) {
      let ele = q.dequeue();
      path.push(ele.data);
      if(ele.left) q.enqueue(ele.left);
      if(ele.right) q.enqueue(ele.right);
    }
    return path;
  }
  printBreadthFirstSearch() {
    var path = [];
    var currLevel = new Queue();
    var nextLevel = new Queue();
    var level = "Height 0: ";
    var height = 0;
    currLevel.enqueue(this.root);
    while(!currLevel.isEmpty()) {
      let ele = currLevel.dequeue();
      level += ele.data + " ";
      if(ele.left) nextLevel.enqueue(ele.left);
      if(ele.right) nextLevel.enqueue(ele.right);
      if(currLevel.isEmpty()) {
        console.log(level);
        currLevel = nextLevel;
        nextLevel = new Queue();
        height++;
        level = "Height " + height + ": ";
      }
    }
  }
}
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
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
class Queue {
  constructor() {
    this.queue = [];
  }
  enqueue(data) {
    if(data) this.queue.push(data);
  }
  dequeue() {
    if(this.queue.length === 0) throw new Error("Queue is empty");
    return this.queue.shift();
  }
  peek() {
    if(this.queue.length === 0) throw new Error("Queue is empty");
    return this.queue[0];
  }
  size() {
    return this.queue.length;
  }
  isEmpty() {
    return this.queue.length === 0;
  }
  toString() {
    return this.queue.toString();
  }
}
/**
 * determine if array represents preorder traversal of a BST
 * approach: elements after the NGE of an element i will always be greater
 * than i (also in stack.js)
 */
function isPreorder(arr) {
  var s = new Stack();
  var root = 0;
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] < root) return false;
    // save last removed element as root (right subtree)
    while(!s.isEmpty() && arr[i] > s.peek()) {
      let ele = s.pop();
      root = ele;
    }
    // stack is empty at this point or arr[i] < s.peek()
    s.push(arr[i]);
  }
  return true;
}
/* determine if array represents inorder traversal of a BST */
function isInorder(arr) {
  for(let i = 0; i < arr.length-1; i++) {
    if(arr[i] > arr[i+1]) return false;
  }
  return true;
}
/* determine if array represents postorder traversal of a BST */
function isPostorder(arr, lo, hi) {
  var rootValue = arr[hi];
  var i, j, left = true, right = true;
  for(i = lo; i <= hi-1; i++) {
    if(arr[i] > rootValue) {
      break;
    }
  }
  for(j = i; j <= hi-1; j++) {
    if(arr[j] < rootValue) {
      return false;
    }
  }
  if(lo < i-1) left = isPostorder(arr, lo, i-1);
  if(i < hi-1) right = isPostorder(arr, i, hi-1);
  return left && right;
}
/**
 * inorder traversal using no extra space
 * approach: Morris traversal
 */
function inorderMorris(rootNode) {
  var cursor = rootNode;
  var path = [];
  var pre;
  while(cursor) {
    if(cursor.left) {
      pre = cursor.left;
      // find current's inorder predecessor
      while(pre.right && pre.right !== cursor)
        pre = pre.right;
      if(!pre.right) {
        // need to point to inorder successor and move cursor to the left
        pre.right = cursor;
        cursor = cursor.left;
      } else {
        // finished with left subtree, repair the tree
        pre.right = null;
        path.push(cursor.data);
        cursor = cursor.right;
      }
    } else {
      // finished with left subtree
      path.push(cursor.data);
      cursor = cursor.right;
    }
  }
  return path;
}
/**
 * find kth smallest element in a BST
 * approach: use a stack
 */
function findKthSmallest(rootNode, k) {
  var s = new Stack();
  s.push(rootNode);
  while(!s.isEmpty()) {
    while(rootNode.left !== null) {
      s.push(rootNode.left);
      rootNode = rootNode.left;
    }
    let ele = s.pop();
    if(--k === 0) return ele;
    if(ele.right) {
      let n = ele.right;
      while(n) {
        s.push(n);
        n = n.left;
      }
    }
  }
}
function bstTest() {
  console.log("==========bstTest() PART ONE==========");
  var bst = new BinarySearchTree();
  var reference1 = [3,19,36,23,6,13,68,8,22,27];
  for(var i = 0; i < reference1.length; i++) {
    let num = reference1[i];
    console.log("Adding " + num + " to the BST");
    let successAdd = bst.add(new Node(num));
    let successContains = bst.contains(num);
    let size = bst.getSize();
    let correctSize = i + 1;
    if(!successAdd) throw new Error("FAILED: add() unsuccessful");
    if(!successContains) throw new Error("FAILED: contains() returned false");
    if(size !== correctSize) throw new Error("FAILED: getSize() "+
      " returned the incorrect size");
  }
  console.log("Binary Search Tree:");
  bst.printBreadthFirstSearch();
  var preorderArray = bst.preorder();
  var inorderArray = bst.inorder();
  var postorderArray = bst.postorder();
  var bfsArray = bst.breadthFirstSearch();
  console.log("Preorder traversal (ACTUAL): ["+ preorderArray.toString()+"]");
  console.log("Preorder traversal (CORRECT): [3,19,6,13,8,36,23,22,27,68]")
  console.log("Inorder traversal (ACTUAL): ["+inorderArray.toString()+"]");
  console.log("Inorder traversal (CORRECT): [3,6,8,13,19,22,23,27,36,68]")
  console.log("Postorder traversal (ACTUAL): ["+postorderArray.toString()+"]");
  console.log("Postorder traversal (CORRECT): [8,13,6,22,27,23,68,36,19,3]")
  console.log("Breadth first traversal: ["+bfsArray.toString()+"]");
  if(!isPreorder(preorderArray) || preorderArray.length !== bst.getSize()) {
    throw new Error("preorder() returned invalid path");
  }
  if(!isInorder(inorderArray) || inorderArray.length !== bst.getSize()) {
    throw new Error("inorder() returned invalid path");
  }
  if(!isPostorder(postorderArray, 0, postorderArray.length-1) ||
    preorderArray.length !== bst.getSize()) {
    throw new Error("postorder() returned invalid path");
  }
  console.log("Inorder traversal using Morris traversal: ["+
    inorderMorris(bst.getRoot()).toString()+"]");

  console.log("Kth smallest when k = 1 (3): " +
    findKthSmallest(bst.getRoot(), 1).data);
  console.log("Kth smallest when k = 5 (19): " +
    findKthSmallest(bst.getRoot(), 5).data);
  console.log("Kth smallest when k = 10 (68): " +
    findKthSmallest(bst.getRoot(), 10).data);

  console.log("==========bstTest() PART TWO==========")
  bst = new BinarySearchTree();
  var reference2 = [18,14,16,10,28,11,38,58,22,9];
  for(var i = 0; i < reference2.length; i++) {
    let num = reference2[i];
    console.log("Adding " + num + " to the BST");
    let successAdd = bst.add(new Node(num));
    let successContains = bst.contains(num);
    let size = bst.getSize();
    let correctSize = i + 1;
    if(!successAdd) throw new Error("FAILED: add() unsuccessful");
    if(!successContains) throw new Error("FAILED: contains() returned false");
    if(size !== correctSize) throw new Error("FAILED: getSize() "+
      " returned the incorrect size");
  }
  console.log("Binary Search Tree:");
  bst.printBreadthFirstSearch();
  var preorderArray = bst.preorder();
  var inorderArray = bst.inorder();
  var postorderArray = bst.postorder();
  var bfsArray = bst.breadthFirstSearch();
  console.log("Preorder traversal (ACTUAL): ["+ preorderArray.toString()+"]");
  console.log("Preorder traversal (CORRECT): [18,14,10,9,11,16,28,22,38,58]");
  console.log("Inorder traversal (ACTUAL): ["+inorderArray.toString()+"]");
  console.log("Inorder traversal (CORRECT): [9,10,11,14,16,18,22,28,38,58]");
  console.log("Postorder traversal (ACTUAL): ["+postorderArray.toString()+"]");
  console.log("Postorder traversal (CORRECT): [9,11,10,16,14,22,58,38,28,18]");
  console.log("Breadth first traversal: ["+bfsArray.toString()+"]");
  if(!isPreorder(preorderArray) || preorderArray.length !== bst.getSize()) {
    throw new Error("preorder() returned invalid path");
  }
  if(!isInorder(inorderArray) || inorderArray.length !== bst.getSize()) {
    throw new Error("inorder() returned invalid path");
  }
  if(!isPostorder(postorderArray, 0, postorderArray.length-1) ||
    preorderArray.length !== bst.getSize()) {
    throw new Error("postorder() returned invalid path");
  }
  console.log("Inorder traversal using Morris traversal: ["+
    inorderMorris(bst.getRoot()).toString()+"]");

debugger;
  console.log("Kth smallest when k = 1 (9): " +
    findKthSmallest(bst.getRoot(), 1).data);
  console.log("Kth smallest when k = 5 (16): " +
    findKthSmallest(bst.getRoot(), 5).data);
  console.log("Kth smallest when k = 10 (58): " +
    findKthSmallest(bst.getRoot(), 10).data);

  console.log("==========bstTest() PART THREE==========")
  bst = new BinarySearchTree();
  var reference3 = [50,46,24,28,99,87,86,85,84,23];
  for(var i = 0; i < reference3.length; i++) {
    let num = reference3[i];
    console.log("Adding " + num + " to the BST");
    let successAdd = bst.add(new Node(num));
    let successContains = bst.contains(num);
    let size = bst.getSize();
    let correctSize = i + 1;
    if(!successAdd) throw new Error("FAILED: add() unsuccessful");
    if(!successContains) throw new Error("FAILED: contains() returned false");
    if(size !== correctSize) throw new Error("FAILED: getSize() "+
      " returned the incorrect size");
  }
  console.log("Binary Search Tree:");
  bst.printBreadthFirstSearch();
  var preorderArray = bst.preorder();
  var inorderArray = bst.inorder();
  var postorderArray = bst.postorder();
  var bfsArray = bst.breadthFirstSearch();
  console.log("Preorder traversal (ACTUAL): ["+ preorderArray.toString()+"]");
  console.log("Preorder traversal (CORRECT): [50,46,24,23,28,99,87,86,85,84]")
  console.log("Inorder traversal (ACTUAL): ["+inorderArray.toString()+"]");
  console.log("Inorder traversal (CORRECT): [23,24,28,46,50,84,85,86,87,99]")
  console.log("Postorder traversal (ACTUAL): ["+postorderArray.toString()+"]");
  console.log("Postorder traversal (CORRECT): [23,28,24,46,84,85,86,87,99,50]")
  console.log("Breadth first traversal: ["+bfsArray.toString()+"]");
  if(!isPreorder(preorderArray) || preorderArray.length !== bst.getSize()) {
    throw new Error("preorder() returned invalid path");
  }
  if(!isInorder(inorderArray) || inorderArray.length !== bst.getSize()) {
    throw new Error("inorder() returned invalid path");
  }
  if(!isPostorder(postorderArray, 0, postorderArray.length-1) ||
    preorderArray.length !== bst.getSize()) {
    throw new Error("postorder() returned invalid path");
  }
  console.log("Inorder traversal using Morris traversal: ["+
    inorderMorris(bst.getRoot()).toString()+"]");

  console.log("Kth smallest when k = 1 (23): " +
    findKthSmallest(bst.getRoot(), 1).data);
  console.log("Kth smallest when k = 5 (50): " +
    findKthSmallest(bst.getRoot(), 5).data);
  console.log("Kth smallest when k = 10 (99): " +
    findKthSmallest(bst.getRoot(), 10).data);
}
bstTest();
