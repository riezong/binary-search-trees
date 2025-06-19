import "./styles.css";

import { Tree } from "./tree";

const test = new Tree();
test.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

test.prettyPrint(
  test.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]),
);

test.insert(10);

test.prettyPrint(test.root);

test.deleteItem(67);

test.prettyPrint(test.root);

console.log(test.find(324));
