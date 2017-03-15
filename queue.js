"use strict";
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
