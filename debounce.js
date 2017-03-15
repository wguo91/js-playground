function debounce(fn, immediate, delay) {
  var timeout;
  return function() {
    var self = this;
    var args = arguments;
    // if immediate is true and fn is not in a timeout then yes
    var callNow = immediate && !timeout;
    // if produced function is called, clear and reset the timeout
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      // clear the timeout variable so that we can call with immediate again
      // reverts back to the pre first call "state"
      timeout = null;
      // we do not want to call the function twice in a row
      if(!immediate) console.log(fn.apply(self, args));
    }, delay);
    // execute the function now if immediate is true and fn is not in timeout
    if(callNow) console.log(fn.apply(self, args));
  };
}

function permuteString(str) {
  if(str.length === 0) return [str];
  var arr = str.split("");
  var result;
  var removed;
  var partialPerms;
  var permutations = [];
  var copy;
  for(let i = 0; i < arr.length; i++) {
    copy = Object.create(arr);
    removed = copy.splice(i, 1);
    partialPerms = permuteString(copy.join(""));
    for(let j = 0; j < partialPerms.length; j++) {
      if(!doneBefore[partialPerms[j]]) {
        result = removed.concat([partialPerms[j]]);
        doneBefore[partialPerms[j]] = true;
        permutations.push(result.join(""));
      }
    }
  }
  return permutations;
}
function bstRemoveTest() {
  console.log("==========bstRemoveTest()==========");
  var bst = new BinarySearchTree();
  var reference1 = [3,19,36,23,6,13,68,8,22,27];
  for(var i = 0; i < reference1.length; i++) {
    let num = reference1[i];
    console.log("Adding " + num + " to the BST");
    let successAdd = bst.add(new Node(num));
    let successContains = bst.contains(num);
    let size = bst.getSize();
    let correctSize = i + 1;
    if(!successAdd) throw new Error("FAILED: remove() unsuccessful");
    if(!successContains) throw new Error("FAILED: contains() returned false");
    if(size !== correctSize) throw new Error("FAILED: getSize() "+
      " returned the incorrect size");
  }
  for(var i = 0; i < reference1.length; i++) {
    let num = reference1[i];
    console.log("Removing " + num + " from the BST");
    let successRemove = bst.remove(num, bst.getRoot());
    let successContains = bst.contains(num);
    let size = bst.getSize();
    let correctSize = reference1.length-i-1;
    console.log("Binary Search Tree:");
    bst.printBreadthFirstSearch();

    if(!successRemove) throw new Error("FAILED: remove() unsuccessful");
    if(successContains) throw new Error("FAILED: contains() returned true");
    if(size !== correctSize) throw new Error("FAILED: getSize() "+
      " returned the incorrect size");
  }
}

bstRemoveTest();
