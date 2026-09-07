import type { BinarySearchTreeNode } from "./binarySearchNode";
import type { BinarySearchTree } from "./binarySearchTree";


export class BST<T> {
    
    compare: Function;
    root : BinarySearchTreeNode<T>;

    constructor(root : BinarySearchTreeNode<T>, compare : Function) {
        this.root = root;
        this.compare = compare;
    }
}