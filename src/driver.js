// driver.js
import { Node } from "./node.js";
import { Tree } from "./tree.js";

function Driver() {
  // 1. Create a binary search tree from an array of random numbers < 100. You can create a function that
  //    returns an array of random numbers every time you call it if you wish.
  let randomSize = Math.random() * 20 + 5;
  let array = [];
  for (let i = 0; i < randomSize; i++) {
    array.push(Math.floor(Math.random() * 100));
  }

  const BST = new Tree();
  BST.buildTree(array);

  // 2. Confirm that the tree is balanced by calling isBalanced.
  console.log(BST.isBalanced());
  BST.prettyPrint(BST.root);

  // 3. Print out all elements in level, pre, post, and in order.
  let levelOrderArray = [];
  let preOrderArray = [];
  let postOrderArray = [];
  let inOrderArray = [];
  BST.levelOrder((node) => levelOrderArray.push(node.data));
  BST.preOrder((node) => preOrderArray.push(node.data));
  BST.postOrder((node) => postOrderArray.push(node.data));
  BST.inOrder((node) => inOrderArray.push(node.data));
  console.log(levelOrderArray);
  console.log(preOrderArray);
  console.log(postOrderArray);
  console.log(inOrderArray);

  // 4. Unbalance the tree by adding several numbers > 100.
  randomSize = Math.random() * 20;
  for (let i = 0; i < randomSize; i++) {
    BST.insert(Math.floor(Math.random() * 10 + 101));
  }
  BST.prettyPrint(BST.root);

  // 5. Confirm that the tree is unbalanced by calling isBalanced.
  console.log(BST.isBalanced());

  // 6. Balance the tree by calling rebalance.
  BST.rebalance();

  // 7. Confirm that the tree is balanced by calling isBalanced.
  console.log(BST.isBalanced());
  BST.prettyPrint(BST.root);

  // 8. Print out all elements in level, pre, post, and in order.
  levelOrderArray = [];
  preOrderArray = [];
  postOrderArray = [];
  inOrderArray = [];
  BST.levelOrder((node) => levelOrderArray.push(node.data));
  BST.preOrder((node) => preOrderArray.push(node.data));
  BST.postOrder((node) => postOrderArray.push(node.data));
  BST.inOrder((node) => inOrderArray.push(node.data));
  console.log(levelOrderArray);
  console.log(preOrderArray);
  console.log(postOrderArray);
  console.log(inOrderArray);
}

export { Driver };
