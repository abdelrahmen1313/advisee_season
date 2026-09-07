/**
 * datastructures-js/binary-search-tree
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */
/**
 * this is a general implementation of a binary search tree
 */

import { BinarySearchTreeNode } from "./binarySearchNode.js";

/** default compare function (a > b ? 1 : -1) */
export const defaultCompare = (a: any, b: any) => {
    if (a === b) return 0;
    return a > b ? 1 : -1;
};

export class BinarySearchTree<T> {
    compare: Function;
    options: { key?: string | number } | undefined ;
    root: BinarySearchTreeNode<T> | null = null;
    count: number;

    constructor(compare?: Function, options?: { key?: string | number } ) {
        if (compare && typeof compare !== 'function') {
            throw new Error('BinarySearchTree constructor expects a compare function');
        };

        this.compare = compare || defaultCompare;
        this.options = options ?? undefined;
        this.root = null;
        this.count = 0;
    }

    /**
    * Inserts a node with a key/value into the tree (recursive implementation)
    * @public
    * @param {T} value
    * @return {BinarySearchTree}
    */
    insert(value: T): BinarySearchTree<T> {
        const newNode = new BinarySearchTreeNode(value);

        const insertRecursive = (current: BinarySearchTreeNode<T>) => {
            const compare = this.compare(newNode.getValue(), current.getValue());
            if (compare < 0) {
                if (!current.getEdge("left")) {
                    current.setEdge("left", newNode.setParent(current));
                    this.count += 1;
                } else {
                    insertRecursive(current.getEdge("left") as BinarySearchTreeNode<T>)
                }
            } else if (compare > 0) {
                if (!current.getEdge("right")) {
                    current.setEdge("right", newNode.setParent(current));
                    this.count += 1;
                } else {
                    insertRecursive(current.getEdge("right") as BinarySearchTreeNode<T>);
                }
            } else {
                current.setValue(value);
            }
        }

        if (this.root === null) {
            this.root = newNode;
            this.count += 1;
        } else {
            insertRecursive(this.root);
        }

        return this;
    };

    /**
    * Inserts a node with a key/value into the tree (iterative implementation)
    * @public
    * @param {T} value
    * @return {BinarySearchTree}
    */
    insertIterative(value: T): BinarySearchTree<T> {
        const newNode = new BinarySearchTreeNode(value);
        let node = this.root;
        if (!node) {
            // root node insertion
            this.root = newNode;
            this.count += 1;
        } else {
            let inserted = false;
            while (!inserted) {
                const compare = this.compare(newNode.getValue(), node?.getValue());
                if (compare < 0) {
                    // newnode < currentnode
                    if (node && node.hasEdge("left")) {
                        node = node?.getEdge("left")
                    } else {
                        node?.setEdge("left", newNode.setParent(node));
                        this.count + 1;
                        inserted = true;
                    }
                } else if (compare > 0) {
                    if (node && node.hasEdge("right")) {
                        node = node?.getEdge("right");
                    } else {
                        node?.setEdge("right", newNode.setParent(node));
                        this.count += 1;
                        inserted = true;
                    }
                } else {
                    // equal values.
                    inserted = true;
                }
            }
        }
        return this;
    }

    /**
    * Checks if a value exists in the tree by its value (recursive implementation)
    * @public
    * @param {T} value
    * @return {boolean}
    */
    has(value: T): boolean {
        const hasRecursive = (current: BinarySearchTreeNode<T> | null) => {
            if (current === null) return false;

            const compare = this.compare(value, current.getValue());
            if (compare === 0) return true;
            if (compare < 0) return hasRecursive(current.getEdge('left') as BinarySearchTreeNode<T>);
            return hasRecursive(current.getEdge("right") as BinarySearchTreeNode<T>);
        };

        return hasRecursive(this.root);
    };

    /**
    * Finds a node by its value (iterative implementation)
    * @public
    * @param {number|string|object} value
    * @return {BinarySearchTreeNode}
    */
    hasIterative(value: T): boolean {
        let curr = this.root;
        while (curr != null) {
            const compare = this.compare(value, curr.getValue());
            if (compare === 0) {
                return true;
            }
            if (compare < 0) {
                curr = curr.getEdge("left");
            } else {
                curr = curr.getEdge("right");
            }
        }
        return false;
    };

    /**
    * Checks if a value exists in the tree by its key
    * @public
    * @param {number|string} key
    * @return {boolean}
    */
    hasKey(key: string | number) {
      
        return this.has({ [this.options.key]: key } as T);
    }


    /**
    * Finds a node by its value (recursive implementation)
    * @public
    * @param {T} value
    * @return {BinarySearchTreeNode}
    */
    find(value: T) {
        const findRecursive = (current: BinarySearchTreeNode<T>) => {
            if (current === null) return null;

            const compare = this.compare(value, current.getValue());
            if (compare === 0) return current;
            if (compare < 0) return findRecursive(current.getEdge("left") as BinarySearchTreeNode<T> || null);
            return findRecursive(current.getEdge("right") as BinarySearchTreeNode<T> || null);
        };

        return findRecursive(this.root as BinarySearchTreeNode<T> || null);
    };


    /**
    * Finds a node by its value (iterative implementation)
    * @public
    * @param {T} value
    * @return {BinarySearchTreeNode}
    * */
    findIterative(value: T): BinarySearchTreeNode<T> | null {
        let curr = this.root;

        while (curr != null) {
            const compare = this.compare(value, curr.getValue());
            if (compare == 0) {
                return curr;
            };
            if (compare < 0) {
                curr = curr.getEdge("left");
            } else {
                curr = curr.getEdge("right");
            }
        };

        return null;
    }

    /**
    * Finds a node by its object's key
    * @public
    * @param {number|string} key
    * @return {BinarySearchTreeNode}
    */
    findKey(key: string | number) {
        if (this.options.key === undefined || this.options.key === null) {
            throw new Error('Missing key prop name in constructor options');
        }
        return this.find({ [this.options.key]: key } as T);
    }

    /**
    * Finds the node with max key (most right) in the tree (recursive implementation)
    * @public
    * @param {BinarySearchTreeNode} [current]
    * @return {BinarySearchTreeNode}
    */
    max(current: BinarySearchTreeNode<T> | null = this.root): BinarySearchTreeNode<T> | null {
        if (current === null) return null;
        if (current.hasEdge("right")) return this.max(current.getEdge("right"));
        return current;
    }


    /**
    * Finds the node with max key (most right) in the tree (iterative implementation)
    * @public
    * @param {BinarySearchTreeNode} [current]
    * @return {BinarySearchTreeNode}
    */
    maxIterative(current: BinarySearchTreeNode<T> | null = this.root): BinarySearchTreeNode<T> | null {
        if (current === null) return null;
        let node = current;
        while (node && node.hasEdge("right")) {
            node = node.getEdge("right") as BinarySearchTreeNode<T>;
        }
        return node;
    }

    /**
   * Finds the node with min key (most left) in the tree (recursive implementation)
   * @public
   * @param {BinarySearchTreeNode} [current]
   * @return {BinarySearchTreeNode}
   */
    min(current: BinarySearchTreeNode<T> | null = this.root): BinarySearchTreeNode<T> | null {
        if (current === null) return null;
        if (current.hasEdge("left")) return this.min(current.getEdge("left"));
        return current;
    }

    /**
     * Finds the node with min key (most left) in the tree (iterative implementation)
     * @public
     * @param {BinarySearchTreeNode} [current] (default:root)
     * @return { BinarySearchTreeNode | null } 
     */
    minIterative(current: BinarySearchTreeNode<T> | null = this.root): BinarySearchTreeNode<T> | null {
        if (current === null) return null;
        let node = current;
        while (node && node.hasEdge("left")) {
            node = node.getEdge("right") as BinarySearchTreeNode<T>
        }
        return node;
    }

    /**
   * Returns the node with the biggest value less or equal a given value (recursive implementation)
   * @public
   * @param {T} value
   * @param {boolean} includeEqual
   * @return {BinarySearchTreeNode|null}
   */
    lowerBound(value: T, includeEqual: boolean = true): BinarySearchTreeNode<T> | null {
        let lb: BinarySearchTreeNode<T> | null = null;
        const lbRecursive = (current: BinarySearchTreeNode<T> | null) => {
            if (current === null) { return null };

            const compare = this.compare(value, current.getValue());
            if (compare > 0 || (includeEqual && compare === 0)) {
                if (lb === null || this.compare(lb.getValue(), current.getValue()) <= 0) {
                    lb = current;
                }
                return lbRecursive(current.getEdge("right"))
            }
            return lbRecursive(current.getEdge("left"));
        }

        return lbRecursive(this.root);
    };

    /**
    * Returns the node with the biggest value less or equal a given value (recursive implementation)
    * @public
    * @param {T} value
    * @param {boolean} includeEqual
    * @return {BinarySearchTreeNode|null}
    */
    lowerBoundIterative(value: T, includeEqual: boolean = true): BinarySearchTreeNode<T> | null {
        let lb: BinarySearchTreeNode<T> | null = null;
        let curr = this.root;
        while (curr != null) {
            const compare = this.compare(value, curr.getValue());
            if (compare > 0 || (includeEqual && compare === 0)) {
                if (lb === null || this.compare(lb.getValue(), curr.getValue()) < 0) {
                    lb = curr;
                }
                curr = curr.getEdge("right");
            } else {
                curr = curr.getEdge("left");
            }
        }
        return lb
    }

    /**
     * Returns the node with the biggest object's key less or equal a given key
     * @public
     * @param {number|string} key
     * @param {boolean} includeEqual
     * @return {BinarySearchTreeNode|null}
    */
    lowerBoundKey(key: string | number, includeEqual = true): BinarySearchTreeNode<T> | null {
        if (this.options.key === undefined || this.options.key === null) {
            throw new Error('Missing key prop name in constructor options');
        }

        return this.lowerBound({ [this.options.key]: key } as T, includeEqual);
    }

    /**
   * Returns the node with the biggest value less or equal a given value
   * @public
   * @param {number|string|object} value
   * @param {boolean} includeEqual
   * @return {BinarySearchTreeNode|null}
   */
    floor(value: T, includeEqual: boolean = true): BinarySearchTreeNode<T> | null {
        return this.lowerBound(value, includeEqual);
    }

    /**
    * Returns the node with the biggest object's key less or equal a given value
    * @public
    * @param {number|string} value
    * @param {boolean} includeEqual
    * @return {BinarySearchTreeNode|null}
    */
    floorKey(key: string | number, includeEqual = true): BinarySearchTreeNode<T> | null {
        return this.lowerBoundKey(key, includeEqual);
    }

    /**
  * Returns the node with the smallest value greater or equal a given value (recursive implementation)
  * @public
  * @param {number|string|object} value
  * @param {boolean} includeEqual
  * @return {BinarySearchTreeNode|null}
  */
    upperBound(value: T, includeEqual = true): BinarySearchTreeNode<T> | null {
        let ub: BinarySearchTreeNode<T> | null = null;

        const upperBoundRecursive = (current: BinarySearchTreeNode<T> | null) => {
            if (current === null) return null;

            const compare = this.compare(value, current.getValue());
            if (compare < 0 || (includeEqual && compare === 0)) {
                if (ub === null || this.compare(ub.getValue(), current.getValue()) >= 0) {
                    ub = current;
                }
                return upperBoundRecursive(current.getEdge("left"));
            }

            return upperBoundRecursive(current.getEdge("right"));
        };

        return upperBoundRecursive(this.root);
    }

    /**
    * Returns the node with the smallest value greater or equal a given value (iterative implementation)
    * @public
    * @param {number|string|object} value
    * @param {boolean} includeEqual
    * @return {BinarySearchTreeNode|null}
    */
    upperBoundIterative(value: T, includeEqual: boolean = true) {
        let upperBound = null;
        let current = this.root;

        while (current !== null) {
            const compare = this.compare(value, current.getValue());

            if (compare < 0 || (includeEqual && compare === 0)) {
                if (upperBound === null || this.compare(upperBound.getValue(), current.getValue()) > 0) {
                    upperBound = current;
                }
                current = current.getEdge("left");
            } else {
                current = current.getEdge("right");
            }
        }

        return upperBound;
    }

    /**
    * Returns the node with the smallest object's key greater or equal a given key
    * @public
    * @param {number|string} key
    * @param {boolean} includeEqual
    * @return {BinarySearchTreeNode|null}
    */
    upperBoundKey(key: string | number, includeEqual: boolean = true): BinarySearchTreeNode<T> | null {
        if (this.options.key === undefined || this.options.key === null) {
            throw new Error('Missing key prop name in constructor options');
        }

        return this.upperBound({ [this.options.key]: key } as T, includeEqual);
    }

    /**
   * Returns the node with the smallest value greater or equal a given value
   * @public
   * @param {number|string|object} value
   * @param {boolean} includeEqual
   * @return {BinarySearchTreeNode|null}
   */
    ceil(value: T, includeEqual: boolean = true): BinarySearchTreeNode<T> | null {
        return this.upperBound(value, includeEqual);
    }

    /**
    * Returns the node with the smallest object's key greater or equal a given key
    * @public
    * @param {number|string} key
    * @param {boolean} includeEqual
    * @return {BinarySearchTreeNode|null}
    */
    ceilKey(key: string | number, includeEqual = true) {
        return this.upperBoundKey(key, includeEqual);
    }


    /**
    * Returns the root node
    * @public
    * @return {BinarySearchTreeNode}
    */
    getRoot(): BinarySearchTreeNode<T> | null {
        return this.root;
    }

    /**
    * Returns the nodes count
    * @public
    * @return {number}
    */
    getCount() {
        return this.count;
    }

    /**
  * Removes a node by its value (recursive implementation)
  * @public
  * @param {number|string|object} value
  * @return {boolean}
  */
    remove(value: T): boolean {
        const removeRecursively = (val: T, current: BinarySearchTreeNode<T> | null) => {
            if (current === null) return false;

            const compare = this.compare(val, current.getValue());
            if (compare < 0) return removeRecursively(val, current.getEdge("left"));
            if (compare > 0) return removeRecursively(val, current.getEdge("right"));

            return this.removeNode(current);
        };

        return removeRecursively(value, this.root);
    }


    /**
   * Removes a node by its value (iterative implementation)
   * @public
   * @param {number|string|object} value
   * @return {boolean}
   */
    removeIterative(value: T): boolean {
        let current = this.root;

        while (current !== null) {
            const compare = this.compare(value, current.getValue());

            if (compare === 0) {
                this.removeNode(current);
                return true;
            }
            if (compare < 0) {
                current = current.getEdge("left");
            } else {
                current = current.getEdge("right");
            }
        }

        return false;
    }

    /**
    * Removes a node from the tree
    * @public
    * @param {BinarySearchTreeNode} node
    * @return {boolean}
    */
    removeNode(node: BinarySearchTreeNode<T> | null): boolean {
        if (node === null || !(node instanceof BinarySearchTreeNode)) {
            return false;
        }

        // case 1: node has no children
        if (node.isLeaf()) {
            if (node.isRoot()) {
                this.root = null;
            } else {
                const parent = node.getParent();
                if (parent && this.compare(node.getValue(), parent.getValue()) < 0) {
                    parent.setEdge("left", null);
                } else {
                    parent?.setEdge("right", null);
                }
            }
            this.count -= 1;
            return true;
        }

        // case 2: node has a left child and no right child
        if (!node.hasEdge("right")) {
            if (node.isRoot()) {
                this.root = node.getEdge("left");
            } else {
                const parent = node.getParent();
                if (parent && this.compare(node.getValue(), parent.getValue()) < 0) {
                    parent.setEdge("left", null)
                } else {
                    parent?.setEdge("right", null);
                }
            }
            node = null;
            this.count -= 1;
            return true;
        }

        // case 3: node has a right child and no left child
        if (!node.hasEdge("left")) {
            if (node.isRoot()) {
                this.root = node.getEdge("right");
            } else {
                const parent = node.getParent();
                if (parent && this.compare(node.getValue(), parent.getValue()) < 0) {
                    parent.setEdge("left", node.getEdge("right"))
                } else {
                    parent?.setEdge("right", node.getEdge("right"))
                }
            }
            const right = node.getEdge("right");
            right?.setParent(node.getParent());

            this.count -= 1;
            return true;
        }

        // case 4: node has left and right children
        const minRight = this.min(node.getEdge("right"));
        if (minRight) {
            node.setValue(minRight.getValue());
        }
        return this.removeNode(minRight);
    }

    /**
     * Traverses the tree in-order (left-node-right) (recursive)
     * @param {function} cb
     * @param {function} [abortCb]
     */
    traverseInOrder(cb: Function, abortCb: Function) {
        if (typeof cb != "function") {
            throw new Error(".traverseInOrder expects a cb function");
        }

        const traverseRecursive = (current: BinarySearchTreeNode<T> | null) => {
            if (current === null || (abortCb && abortCb())) return;
            traverseRecursive(current.getEdge("left"));
            if (abortCb && abortCb()) return;
            cb(current);
            traverseRecursive(current.getEdge("right"));
        }

        traverseRecursive(this.root);
    }

    /**
     * Traverses the tree in-order (left-node-right) (recursive)
     * @param {function} cb
     * @param {function} [abortCb]
     */
    traverseInOrderIterative(cb: Function, abortCb: Function) {
        if (typeof cb !== 'function') {
            throw new Error('.traverseInOrderIterative expects a callback function');
        };

        let current: BinarySearchTreeNode<T> | null = this.root;
        const stack = [];

        while (current != null || stack.length > 0) {
            while (current !== null) {
                stack.push(current);
                current = current.getEdge("left");
            }
            current = stack.pop() ?? null;

            if (abortCb && abortCb()) {
                return;
            }

            cb(current);
            current = current?.getEdge("right") ?? null;
        }
    }

    /**
     * Traverses the tree per-order (node-left-right) (recursive)
     * @param {Function} cb -> cb to execute on node
     * @param {Function} abortCb -> function that aborts the loop 
     */
    traversePerOrder(cb: Function, abortCb: Function) {
        if (typeof cb !== 'function') {
            throw new Error('.traversePreOrder expects a callback function');
        };

        const traverseRecursive = (current: BinarySearchTreeNode<T> | null) => {
            if ((current === null) || (abortCb && abortCb())) return;
            cb(current);
            traverseRecursive(current.getEdge("left"));
            traverseRecursive(current.getEdge("right"));
        };

        traverseRecursive(this.root);
    }

    /**
     * Traverses the tree per-order (node-left-right) (iterative)
     * @param {Function} cb -> cb to execute on node
     * @param {Function} abortCb -> function that aborts the loop 
     */

    traversePerOrderIterative(cb: Function, abortCb: Function) {
        if (typeof cb !== 'function') {
            throw new Error('.traversePreOrder expects a callback function');
        };

        const s1 = [];
        const s2 = [];
        s1.push(this.root);

        while (s1.length) {
            const curr = s1.pop();

            s2.push(curr);

            if (abortCb && abortCb()) break;
            if (curr) {
                s1.push(curr.getEdge("left"));
                s2.push(curr.getEdge("right"));
            }
        }
        while (s2.length) {
            const curr = s2.pop();
            if (abortCb && abortCb()) break;
            if (curr) {
                cb(curr);
            }
        }
    }




}






