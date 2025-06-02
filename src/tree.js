import { Node } from "./node";

class Tree {
  constructor(array) {}

  root() {
    // uses the return value of buildTree
  }

  buildTree(array) {
    // takes an array of data and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!).
    // The buildTree function should return the level-0 root node.
    const uniqueNumbers = array.filter(
      (value, index, array) => array.indexOf(value) === index,
    );
    const sortedArray = uniqueNumbers.sort((a, b) => a - b);
    console.log(sortedArray);

    let start = 0;
    let end = sortedArray.length - 1;
    let mid = Math.floor((start + end) / 2);
    console.log(start, mid, end);

    let value = sortedArray[mid];
    let leftChild = sortedArray.slice(start, mid);
    let rightChild = sortedArray.slice(mid + 1);
    console.log(value, leftChild, rightChild);

    return value;
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

  // prettyPrint(node, prefix = "", isLeft = true) {
  //   if (node === null) {
  //     return;
  //   }
  //   if (node.right !== null) {
  //     prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  //   }
  //   console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  //   if (node.left !== null) {
  //     prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  //   }
  // }
}

export { Tree };
