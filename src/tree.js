import { Node } from "./node";

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  root() {
    // uses the return value of buildTree
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

    console.log(root.left, root, root.right);

    return root;
  }

  insert(value) {}

  deleteItem(value) {}

  find(value) {}

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
