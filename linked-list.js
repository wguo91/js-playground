"use strict";
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  add(data) {
    if(!this.head) {
      this.head = new Node(data);
      this.size++;
      return this;
    }
    var cursor = this.head;
    while(cursor.next !== null) {
      cursor = cursor.next;
    }
    cursor.next = new Node(data);
    this.size++;
    return this;
  }
  remove(data) {
    if(this.head.data === data) {
      this.head = this.head.next;
      this.size--;
    }
    var cursor = this.head;
    var prev = null;
    while(cursor) {
      if(cursor.data === data) {
        prev.next = cursor.next;
        this.size--;
      } else {
        prev = cursor;
      }
      cursor = cursor.next;
    }
  }
  contains(data) {
    var cursor = this.head;
    while(cursor !== null) {
      if(cursor.data === data) return true;
      cursor = cursor.next;
    }
    return false;
  }
  getSize() {
    return this.size;
  }
  print() {
    var cursor = this.head;
    var str = "";
    while(cursor !== null) {
      str += (cursor.data + " -> ");
      cursor = cursor.next;
    }
    str += "null";
    console.log(str);
  }
  reverse() {
    if(!this.head) throw new Error("Linked list is empty");
    var prev = null;
    var curr = this.head;
    var next = null;
    while(curr) {
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    this.head = prev;
  }
}
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
function testLinkedList() {
  console.log("========= testLinkedList() START =========");
  var linkedList = new LinkedList();
  // testing add and size
  linkedList.add(1);
  linkedList.add(2);
  linkedList.add(2);
  linkedList.add(3);
  linkedList.add(5);
  console.log("1 -> 2 -> 2 -> 3 -> 5 (CORRECT)");
  linkedList.print();
  console.log("Size should be 5: " + linkedList.getSize());
  linkedList.add(7);
  linkedList.add(2);
  linkedList.add(9);
  linkedList.add(5);
  linkedList.add(2);
  console.log("1 -> 2 -> 2 -> 3 -> 5 -> 7 -> 2 -> 9 -> 5 -> 2 (CORRECT)");
  linkedList.print();
  console.log("Reversing...");
  console.log("2 -> 5 -> 9 -> 2 -> 7 -> 5 -> 3 -> 2 -> 2 -> 1 (CORRECT)");
  linkedList.reverse();
  linkedList.print();
  console.log("Reverting to original order...");
  console.log("1 -> 2 -> 2 -> 3 -> 5 -> 7 -> 2 -> 9 -> 5 -> 2 (CORRECT)");
  linkedList.reverse();
  linkedList.print();
  console.log("Size should be 10: " + linkedList.getSize());

  // testing remove and contains
  console.log("=== linkedList.remove(2) ===");
  console.log("Contains should return true for 2: " + linkedList.contains(2));
  linkedList.remove(2);
  console.log("Contains should return false for 2: " + linkedList.contains(2));
  console.log("1 -> 3 -> 5 -> 7 -> 9 -> 5 (CORRECT)");
  linkedList.print();
  console.log("Size should be 6: " + linkedList.getSize());

  console.log("=== linkedList.remove(2) ===");
  console.log("Contains should return false for 2: " + linkedList.contains(2));
  linkedList.remove(2);
  console.log("Contains should return false for 2: " + linkedList.contains(2));
  console.log("1 -> 3 -> 5 -> 7 -> 9 -> 5 (CORRECT)");
  linkedList.print();
  console.log("Size should be 6: " + linkedList.getSize());

  console.log("=== linkedList.remove(5) ===");
  console.log("Contains should return true for 5: " + linkedList.contains(5));
  linkedList.remove(5);
  console.log("Contains should return false for 5: " + linkedList.contains(5));
  console.log("1 -> 3 -> 7 -> 9 (CORRECT)");
  linkedList.print();
  console.log("Size should be 4: " + linkedList.getSize());

  console.log("=== linkedList.remove(4) ===");
  console.log("Contains should return false for 4: " + linkedList.contains(4));
  linkedList.remove(4);
  console.log("Contains should return false for 4: " + linkedList.contains(4));
  console.log("1 -> 3 -> 7 -> 9 (CORRECT)");
  linkedList.print();
  console.log("Size should be 4: " + linkedList.getSize());

  console.log("=== linkedList.remove(1) ===");
  console.log("Contains should return true for 1: " + linkedList.contains(1));
  linkedList.remove(1);
  console.log("Contains should return false for 1: " + linkedList.contains(1));
  console.log("3 -> 7 -> 9 (CORRECT)");
  linkedList.print();
  console.log("Size should be 3: " + linkedList.getSize());

  console.log("=== linkedList.remove(9) ===");
  console.log("Contains should return true for 9: " + linkedList.contains(9));
  linkedList.remove(9);
  console.log("Contains should return false for 9: " + linkedList.contains(9));
  console.log("3 -> 7 (CORRECT)");
  linkedList.print();
  console.log("Size should be 2: " + linkedList.getSize());

  linkedList.reverse();
  console.log("REVERSED: 7 -> 3 (CORRECT)");
  linkedList.print();
  console.log("========= testLinkedList() END =========");
}
testLinkedList();
