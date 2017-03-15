"use strict";
window.addEventListener("DOMContentLoaded", function() {
  class Stack {
    constructor() {
      this.stack = [];
      this.top = null;
    }
    push(data) {
      this.stack.push(data);
      this.top = data;
    }
    pop() {
      var data = this.stack.pop();
      this.top = this.peek();
      return data;
    }
    peek() {
      return this.stack[this.stack.length-1];
    }
    isEmpty() {
      if(this.stack.length === 0) return true;
      return false;
    }
  }
  /**
   * depth-first search on all DOM elements, provide an option to filter
   * by class
   */
  function domDFS(root, className) {
    var stack = new Stack(),
        eleArray = [];
    stack.push(root);
    while(!stack.isEmpty()) {
      let ele = stack.pop();
      // if className is provided, then filter
      if(className && ele.className === className) {
        eleArray.push(ele);
        console.log(ele.tagName);
      } else if(!className) {
        eleArray.push(ele);
        console.log(ele.tagName);
      }
      for(let i = ele.children.length-1; i >= 0; i--) { // left to right
        stack.push(ele.children[i]);
      }
    }
    console.log(eleArray);
  }
  domDFS(document.body);
  domDFS(document.body, "special");

  /* find all images (including background images) and display the URLs */
  function findImages() {
    var stack = new Stack();
    stack.push(document.body);
    while(!stack.isEmpty()) {
      let ele = stack.pop();
      let style = window.getComputedStyle(ele);
      if(ele.tagName === "IMG") {
        console.log(ele.tagName + ": " + ele.src);
      } else if(style.backgroundImage && style.backgroundImage !== "none") {
        console.log(ele.tagName + ": " + style.backgroundImage.slice(5, -2));
      }
      for(let i = ele.children.length-1; i >= 0; i--) {
        stack.push(ele.children[i]);
      }
    }
  }
  findImages();

  /* design a color picker */
  function colorPicker(r, g, b) {
    // convert all decimal values to hexadecimal
    var red = r.toString(16);
    var green = g.toString(16);
    var blue = b.toString(16);
    if(red.length === 1) red = "0" + red;
    if(green.length === 1) green = "0" + green;
    if(blue.length === 1) blue = "0" + blue;
    var color = "#"+red+green+blue;
    document.getElementById("main-heading").style.color = color;
    console.log("Changed color of main heading to " + color);
  }
  colorPicker(124,100,0);
}, false);
