import { Node } from "./node";

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    // takes an array of data and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!).
    // The buildTree function should return the level-0 root node.

    // sort and remove duplicates
    const uniqueNumbers = [...new Set(array)]; // More concise way to get unique elements
    const sortedArray = uniqueNumbers.sort((a, b) => a - b);
    // console.log(sortedArray);

    if (sortedArray.length === 0) return null;

    let start = 0;
    let end = sortedArray.length - 1;
    let mid = Math.floor((start + end) / 2);
    // console.log(start, mid, end);

    let root = new Node(sortedArray[mid]);
    // Recursively build the left and right subtrees
    // The left child will be the root of the subtree built from the left half of the array
    root.left = this.buildTree(sortedArray.slice(start, mid));
    // The right child will be the root of the subtree built from the right half of the array
    root.right = this.buildTree(sortedArray.slice(mid + 1));
    // console.log(root.left, root, root.right);

    this.root = root;
    return root;
  }

  insert(value) {
    const newNode = new Node(value);
    console.log(newNode);

    let currNode = this.root;
    let parentNode = null;
    console.log(currNode.data);

    if (currNode === null) {
      this.root = new Node(value);
      console.log(`Inserted ${value}. Tree is now root: ${this.root.data}`);
      return;
    }

    // Traverse the tree until you find a null spot
    while (currNode !== null) {
      parentNode = currNode;

      if (value === currNode.data) {
        // Handle duplicates: if value already exists, do nothing and return.
        // You might want to adjust this behavior based on your specific requirements (e.g., allow duplicates, update a counter).
        console.log(`Value ${value} already exists. Not inserting duplicate.`);
        return;
      } else if (value < currNode.data) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }
    }

    // After the loop, currentNode is null, meaning parentNode is the node
    // where the new node should be attached.
    // Now, attach the newNode to the correct child of parentNode.
    if (value <= parentNode.data) {
      parentNode.left = newNode;
    } else {
      parentNode.right = newNode;
    }

    console.log(`Inserted ${value}. Parent: ${parentNode.data}.`);
    // You can add more detailed logs here, e.g., to show the new child
    // console.log(`Parent ${parentNode.data} now has left: ${parentNode.left ? parentNode.left.data : 'null'} and right: ${parentNode.right ? parentNode.right.data : 'null'}`);
    // return currNode;
  }

  deleteItem(value) {
    let currNode = this.root;
    let parentNode = null;
    console.log(currNode.data);
    let counter = 1;

    // Traverse the tree until you find target value
    while (currNode.data !== value) {
      parentNode = currNode;
      console.log("level " + counter);
      counter += 1;

      if (value < currNode.data) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }
    }
    // target acquired!
    console.log("level " + counter);
    console.log("found " + value);

    console.log(parentNode);
    console.log(currNode);

    if (currNode.left === null && currNode.right === null) {
      // delete leaf node
      console.log("leaf node");
      if (parentNode.left === value) {
        console.log("value is on left");
        parentNode.left = null;
      } else {
        console.log("value is on right");
        parentNode.right = null;
      }
    } else if (currNode.left !== null && currNode.right !== null) {
      // delete node with both children
      console.log("both children");
      // right, then left until no more left
      let replacementNode = currNode.right;
      console.log(replacementNode);
      while (replacementNode.left !== null) {
        replacementNode = replacementNode.left;
        console.log(replacementNode);
        return replacementNode;
      }
      if (parentNode.left.data === value) {
        console.log("value is on left");
        parentNode.left = replacementNode;
        replacementNode.left = currNode.left;
      } else {
        console.log("value is on right");
        parentNode.right = replacementNode;
        replacementNode.left = currNode.left;
      }
    } else {
      // delete node with single child
      console.log("one child");
      if (parentNode.left === value) {
        console.log("value is on left");
        if (currNode.left !== null) {
          parentNode.left = currNode.left;
        } else {
          parentNode.left = currNode.right;
        }
      } else {
        console.log("value is on right");
        if (currNode.left !== null) {
          parentNode.right = currNode.left;
        } else {
          parentNode.right = currNode.right;
        }
      }
    }
  }

  find(value) {
    let currNode = this.root;
    let parentNode = null;
    console.log(currNode.data);
    let counter = 1;

    // Traverse the tree until you find target value
    while (currNode.data !== value) {
      parentNode = currNode;
      console.log("level " + counter);
      counter += 1;

      if (value < currNode.data) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }
    }
    // target acquired!

    console.log("level " + counter);
    console.log("found " + value);

    return currNode;
  }

  levelOrder(callback) {}

  inOrder(callback) {}

  preOrder(callback) {}

  postOrder(callback) {}

  height(value) {}

  depth(value) {}

  isBalanced() {}

  rebalance() {}

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

export { Tree };
