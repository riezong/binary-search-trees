class Node {
  constructor(data, leftChild, rightChild) {
    this.data = data;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }

  data() {
    return this.data;
  }

  leftChild() {
    return this.leftChild;
  }

  rightChild() {
    return this.rightChild;
  }
}

export { Node };
