/**
 * datastructures-js/binary-search-tree
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * 
 * @license MIT
 */


/**
 * @class BinarySearchTreeNode
 */

export class BinarySearchTreeNode<T> {
    private _value: T;
    private left: BinarySearchTreeNode<T> | null = null;
    private right: BinarySearchTreeNode<T> | null = null;
    private _parent: BinarySearchTreeNode<T> | null = null;

    constructor(value: T) {
        this._value = value;
        this.left = null;
        this.right = null;
        this._parent = null;
    }

    /**
 * @public
 * @param {T} value
 * @returns {BinarySearchTreeNode}
 */
    setValue(value: T) : BinarySearchTreeNode<T> {
        this._value = value;
        return this;
    }

    /**
     * @public
     * @return {T}
     */
    getValue() : T {
        return this._value;
    }

    /** 
   * @param { pos : 'left' | 'right'}
   * @param { val : BinarySearchTreeNode} 
   * @returns {BinarySearchTreeNode}
   */
    setEdge(pos: 'left' | 'right', val: BinarySearchTreeNode<T> | null, cb?: Function): BinarySearchTreeNode<T> {
        if (val && !(val instanceof BinarySearchTreeNode)) {
            throw new Error('setLeft expects a BinarySearchTreeNode');
        }

        if (cb) {
            cb();
        }

        this[pos] = val || null;
        return this;
    }


    /**
     * @public
     * @param pos {'left' | 'right'}
     * @return {BinarySearchTreeNode}
     */
    getEdge(pos: 'left' | 'right'): BinarySearchTreeNode<T> | null {
        return this[pos];
    }

    /**
    * @public
    * @param pos {'left' | 'right'}
    * @return {boolean}
    */
    hasEdge(pos: 'left' | 'right'): boolean {
        return this[pos] instanceof BinarySearchTreeNode;
    };


    /**
    * @public
    * @param {BinarySearchTreeNode} parent
    * @returns {BinarySearchTreeNode}
    */
    setParent(parent: BinarySearchTreeNode<T> | null): BinarySearchTreeNode<T> | null {
        if (parent && !(parent instanceof BinarySearchTreeNode)) {
            throw new Error('setParent expects a BinarySearchTreeNode or null');
        }

        this._parent = parent || null;
        return this;
    }

    /**
     * @brief get node parent
     * @public
     * @return {BinarySearchTreeNode}
     */
    getParent(): BinarySearchTreeNode<T> | null {
        return this._parent;
    }

    /**
     * @brief node have a parent node (child node)
     * @public
     * @return {boolean}
     */
    hasParent() {
        return this._parent instanceof BinarySearchTreeNode;
    }

    /**
     * @brief node have no parent node (root)
     * @public
     * @return {boolean}
     */
    isRoot() {
        return this._parent === null;
    }

    /**
     * @brief node have no left or right edges
     * @public
     * @return {boolean}
     */
    isLeaf() {
        return !this.hasEdge("left") && !this.hasEdge("right");
    }

}