"use strict";
/**
 * write a function that will loop through a list of integers and print
 * the index of each element after a three second delay
 */
function fn(numbers) {
  for(var i = 0; i < numbers.length; i++) {
    (function(i) {
      setTimeout(function() {
        console.log(numbers[i]);
      }, 3000);
    })(i);
  }
}
/**
 * attach an event listener to a list of items, refer to event-delegation.html
 * however, if we have a huge list of over 100 items, we must consider
 * efficiency, since adding 100+ event listeners is performance-heavy
 */
document.addEventListener("DOMContentLoaded", function() {
  var items = document.getElementsByClassName("item");
  if(items.length > 0) {
    console.time("Not using event delegation");
    for(var i = 0; i < items.length; i++) {
      items[i].addEventListener("click", function() {
        console.log("[WITHOUT EVENT DELEGATION]: You clicked on " + this.innerText);
      }, false);
    }
    console.timeEnd("Not using event delegation");
  }
  // as an alternative, we can add an event listener to ul instead
  var lotsOfItems = document.getElementById("long-todo-list");
  if(lotsOfItems) {
    console.time("Using event delegation");
    lotsOfItems.addEventListener("click", function(evt) {
      // target is the element that triggers the event
      // currentTarget is the element the event listener is attached to
      if(evt.target && evt.target.nodeName === "LI") {
        let item = evt.target;
        console.log("[WITH EVENT DELEGATION]: You clicked on " + item.innerText);
      }
    }, false);
    console.timeEnd("Using event delegation");
  }
  /**
   * RESULTS:
   * Not using event delegation: 0.580ms
   * Using event delegation: 0.103ms
   */
   /**
    * implement SIMPLE debounce and throttle functions
    * the debounced function is only called after x amount of ms has passed
    * the throttled function is guaranteed to call every x amount of ms
    */
   function debounce(fun, delay, immediate) {
     // triggers on either leading edge or trailing edge
     var timeout;
     return function() {
       var context = this,
           args = arguments;
       var callNow = immediate && !timeout;
       clearTimeout(timeout);
       timeout = setTimeout(function() {
         // when immediate is true, we just reset the timeout to null so that
         // the debounced function can run again when delay ms has passed
         timeout = null;
         if(!immediate) fun.apply(context, args);
       }, delay);
       if(callNow) fun.apply(context, args);
     };
   }
   function displayTime(type) {
     var output = document.getElementById("output");
     var p = document.createElement("p");
     var text = document.createTextNode(type + " The time and date is " + new Date());
     // use appendChild instead of innerHTML (DOM will not be reconstructed)
     p.appendChild(text);
     output.appendChild(p);
   }
   var debouncedDisplayTime1 = debounce(displayTime, 1000, true);
   var debouncedDisplayTime2 = debounce(displayTime, 1000, false);
   var debounceLeadingBtn = document.getElementById("debounce-leading");
   var debounceTrailingBtn = document.getElementById("debounce-trailing");
   if(debounceLeadingBtn && debounceTrailingBtn) {
     debounceLeadingBtn.addEventListener("click", function() {
       debouncedDisplayTime1("[DEBOUNCE (LEADING EDGE)]");
     }, false);
     debounceTrailingBtn.addEventListener("click", function() {
       debouncedDisplayTime2("[DEBOUNCE (TRAILING EDGE)]");
     }, false);
   }
   function throttle(fun, delay, options) {
     var inThrottle, lastFun, timeout;
     return function() {
       var context = this,
           args = arguments;
       if(options.leadingEdge && !inThrottle) {
         inThrottle = true;
         fun.apply(context, args);
         setTimeout(function() {
           inThrottle = false;
         }, delay);
       } else if(options.trailingEdge && !inThrottle){
         inThrottle = true;
         setTimeout(function() {
           inThrottle = false;
           fun.apply(context, args);
         }, delay);
       }
     }
   }

   var throttleLeadingBtn = document.getElementById("throttle-leading");
   var throttleTrailingBtn = document.getElementById("throttle-trailing");
   var throttledDisplayTime1 = throttle(displayTime, 2000, {
     leadingEdge: true
   });
   var throttledDisplayTime2 = throttle(displayTime, 2000, {
     trailingEdge: true
   });
   if(throttleLeadingBtn && throttleTrailingBtn) {
     throttleLeadingBtn.addEventListener("click", function() {
       throttledDisplayTime1("[THROTTLE - LEADING]");
     }, false);
     throttleTrailingBtn.addEventListener("click", function() {
       throttledDisplayTime2("[THROTTLE - TRAILING]");
     }, false);
  }
  /* convert a Node list into an array */
  var moreItems = document.getElementsByClassName("item");
  if(moreItems) {
    moreItems = [].slice.call(moreItems);
    moreItems.forEach(function(ele) {
      console.log(ele.nodeName);
    });
  }
  /**
   * implement getElementsByAttribute()
   * naive approach: grab all of the elements in the DOM, then looping
   * through all of them and checking attributes
   * faster approach: checking attributes as we grab every element (DFS)
   * refer to dom-manipulation.html
   */
  function getElementsByAttribute(attr) {
    var found = [];
    function checkNode(node) {
      // check if node has children (remember [] returns true)
      if(node && node.getAttribute) {
        if(node.getAttribute(attr)) {
          found.push(node);
        }
        if(node.childNodes && node.childNodes.length) {
          for(let i = 0; i < node.childNodes.length; i++) {
            let ele = node.childNodes[i];
            checkNode(ele);
          }
        }
      }
    }
    checkNode(document.body);
    return found;
  }
  console.log("=== getElementsByAttribute() ===");
  console.log(getElementsByAttribute("class"));
  /**
   * given two identical DOM tree structures A and B, and a node from A,
   * find the corresponding node in B
   */
  function constructPath(treeRoot, node) {
    console.log("Constructing path for: " + node + " in tree structure A");
    var cursor = node, path = [];
    while(cursor && cursor !== treeRoot) {
      let nodeList = cursor.parentNode.childNodes;
      console.log("Analyzing the following list of nodes:")
      console.log(nodeList);
      // node list does not have an indexOf method, borrow []'s
      let idx = [].indexOf.call(nodeList, cursor);
      // save the idx
      path.push(idx);
      cursor = cursor.parentNode;
    }
    return path;
  }
  function findNode(treeRoot, path) {
    console.log("Traversing through DOM tree with following path array: " + path);
    var node = treeRoot;
    for(var i = path.length-1; i >= 0; i--) {
      node = node.childNodes[path[i]];
    }
    console.log("Found " + node + " in tree structure B");
    return node;
  }
  console.log("=== locateCorrespondingNode() ===");
  function locateCorrespondingNode(treeRootA, treeRootB, target) {
    findNode(treeRootB, constructPath(treeRootA, target));
  }
  var label = document.querySelector(".form-label");
  locateCorrespondingNode(document.body, document.body, label);

  /**
   * check if child node is a descendant of parent
   */
  function isDescendant(parent, child) {
    while(child.parentNode) {
      if(child.parentNode === parent) return true;
      child = child.parentNode;
    }
    return false;
  }
  var listItem = document.getElementsByClassName("list-item")[0];
  var mainContainer = document.getElementsByClassName("container")[0];
  var p = document.getElementsByClassName("para")[0];
  if(listItem && mainContainer) {
    console.log("=== isDescendant() ===");
    console.log("Is listItem a descendant of mainContainer (true)?: " + isDescendant(mainContainer, listItem));
    console.log("Is p a descendant of mainContainer (true)?: " + isDescendant(mainContainer, p));
    console.log("Is p a descendant of listItem (false)?: " + isDescendant(listItem, p));
  }

  /**
   * DOM manipulation optimization
   * avoid reflows when manipulating the DOM by using document fragments
   * avoid setting multiple inline styles
   * avoid applying animation to absolute or fixed positioned elements
   * reflows are different from repaints, reflows involve changes in geometry
   * repaints involve changes in color and visibility (not display)
   */
  function insertDOM1() {
    var form = document.getElementsByClassName("name-form")[0];
    if(form) {
      for(let i = 0; i < 30; i++) {
        let div = document.createElement("div");
        div.innerText = "[WITHOUT DOCUMENT FRAGMENT] Iteration " + i;
        div.style.color = "red";
        form.appendChild(div);
      }
    }
  }
  function insertDOM2() {
    var fragment = document.createDocumentFragment();
    var form = document.getElementsByClassName("name-form")[0];
    if(form) {
      for(let i = 0; i < 30; i++) {
        let div = document.createElement("div");
        div.innerText = "[WITHOUT DOCUMENT FRAGMENT] Iteration " + i;
        div.style.color = "red";
        fragment.appendChild(div);
      }
      form.appendChild(fragment);
    }
  }
  console.time("insertDOM1");
  insertDOM1();
  console.timeEnd("insertDOM1");
  console.time("insertDOM2");
  insertDOM2();
  console.timeEnd("insertDOM2");

  /* grab JSON from webserver using JSONP */
  function jsonp(url, callback) {
    var script = document.createElement("script");
    var id = "callback_" + +new Date();
    var encodedURL = url+"&callback="+id;
    console.log(encodedURL);
    window[id] = function(data) {
      if(callback) {
        callback(data);
      }
    }
    script.src = encodedURL;
    document.head.appendChild(script);
  }
});
