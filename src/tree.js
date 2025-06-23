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
      this.root = newNode;
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
    if (value < parentNode.data) {
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
    // Start deletion from the root
    this.root = this._deleteNode(this.root, value);
  }

  // Helper recursive function to delete a node
  _deleteNode(node, value) {
    if (node === null) {
      console.log(`Value ${value} not found.`);
      return null; // Value not found
    }

    // Traverse to find the node to delete
    if (value < node.data) {
      node.left = this._deleteNode(node.left, value);
    } else if (value > node.data) {
      node.right = this._deleteNode(node.right, value);
    } else {
      // Node to be deleted found (value === node.data)

      // Case 1: Node with no children or only one child
      if (node.left === null) {
        console.log(`Deleting node ${value} with no left child.`);
        return node.right; // Return the right child (or null if no children)
      } else if (node.right === null) {
        console.log(`Deleting node ${value} with no right child.`);
        return node.left; // Return the left child
      }

      // Case 2: Node with two children
      // Find the inorder successor (smallest in the right subtree)
      console.log(`Deleting node ${value} with two children.`);
      let tempNode = node.right;
      while (tempNode.left !== null) {
        tempNode = tempNode.left;
      }
      // Copy the inorder successor's data to this node
      node.data = tempNode.data;
      // Delete the inorder successor from the right subtree
      node.right = this._deleteNode(node.right, tempNode.data);
    }
    return node;
  }

  find(value) {
    let currNode = this.root;

    while (currNode !== null) {
      // Loop while currNode is not null
      if (value === currNode.data) {
        console.log(`Found ${value}.`);
        return currNode; // Found the node
      } else if (value < currNode.data) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }
    }

    console.log(`Value ${value} not found.`);
    return null; // Value not found
  }

  levelOrder(callback) {
    if (callback === undefined || typeof callback !== "function") {
      throw new Error(
        "A callback function is required for levelOrder traversal.",
      );
    }

    if (this.root === null) {
      return;
    }

    const queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      let currentNode = queue.shift();

      callback(currentNode);

      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
  }

  inOrder(callback) {
    if (callback === undefined || typeof callback !== "function") {
      throw new Error("A callback function is required for inOrder traversal.");
    }

    this._inOrderHelper(this.root, callback);
  }

  _inOrderHelper(node, callback) {
    if (node === null) {
      return;
    }

    this._inOrderHelper(node.left, callback);
    callback(node);
    this._inOrderHelper(node.right, callback);
  }

  preOrder(callback) {
    if (callback === undefined || typeof callback !== "function") {
      throw new Error(
        "A callback function is required for preOrder traversal.",
      );
    }

    this._preOrderHelper(this.root, callback);
  }

  _preOrderHelper(node, callback) {
    if (node === null) {
      return;
    }

    callback(node);
    this._preOrderHelper(node.left, callback);
    this._preOrderHelper(node.right, callback);
  }

  postOrder(callback) {
    if (callback === undefined || typeof callback !== "function") {
      throw new Error(
        "A callback function is required for postOrder traversal.",
      );
    }

    this._postOrderHelper(this.root, callback);
  }

  _postOrderHelper(node, callback) {
    if (node === null) {
      return;
    }

    this._postOrderHelper(node.left, callback);
    this._postOrderHelper(node.right, callback);
    callback(node);
  }

  height(value) {
    let node = this.find(value);
    let height = this._calculateHeightRecursive(node);
    console.log(height);
    return height;
  }

  _calculateHeightRecursive(node) {
    if (node === null) {
      return -1;
    }

    if (node.left === null && node.right === null) {
      let height = 0;
      return height;
    }

    let leftHeight = this._calculateHeightRecursive(node.left);
    let rightHeight = this._calculateHeightRecursive(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  depth(value) {
    let currNode = this.root;

    let depth = 0;

    while (currNode !== null) {
      // Loop while currNode is not null
      if (value === currNode.data) {
        console.log(`Found ${value}. Depth of ${depth}`);
        return depth; // Found the node
      } else if (value < currNode.data) {
        depth += 1;
        currNode = currNode.left;
      } else {
        depth += 1;
        currNode = currNode.right;
      }
    }

    console.log(`Value ${value} not found.`);
    return null; // Value not found
  }

  isBalanced() {
    let node = this.root;
    return this._isBalancedRecursive(node);
  }

  _isBalancedRecursive(node) {
    if (node === null) return true;

    // Recursion
    let leftBalanced = this._isBalancedRecursive(node.left);
    let rightBalanced = this._isBalancedRecursive(node.right);

    // Height check
    let leftHeight = this._calculateHeightRecursive(node.left);
    let rightHeight = this._calculateHeightRecursive(node.right);
    let currentBalanced = Math.abs(leftHeight - rightHeight) <= 1;

    return leftBalanced && rightBalanced && currentBalanced; // All three conditions must be true
  }

  rebalance() {
    if (this.root === null) return;
    // Flatten the tree into a sorted array
    const sortedArray = [];
    this.inOrder((node) => sortedArray.push(node.data));
    // Build a new balanced tree from the sorted array
    this.root = this.buildTree(sortedArray);
  }

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
