// bst_json.js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
// -------------------- BST Implementation --------------------
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    insert(value) {
        if (typeof value !== 'number') {
            throw new Error('BST only supports numeric values.');
        }
        this.root = this._insertRec(this.root, value);
    }

    _insertRec(node, value) {
        if (!node) return new Node(value);
        if (value < node.value) node.left = this._insertRec(node.left, value);
        else if (value > node.value) node.right = this._insertRec(node.right, value);
        return node; // Ignore duplicates
    }

    // Serialize BST to plain object for JSON
    toJSON() {
        return JSON.stringify(this.root, null, 2);
    }

    // Rebuild BST from plain object
    static fromJSON(jsonString) {
        const obj = JSON.parse(jsonString);
        const bst = new BST();
        bst.root = BST._buildTree(obj);
        return bst;
    }

    static _buildTree(obj) {
        if (!obj) return null;
        const node = new Node(obj.value);
        node.left = BST._buildTree(obj.left);
        node.right = BST._buildTree(obj.right);
        return node;
    }

    // In-order traversal (for testing)
    inorder(node = this.root, result = []) {
        if (node) {
            this.inorder(node.left, result);
            result.push(node.value);
            this.inorder(node.right, result);
        }
        return result;
    }
}

// -------------------- Save BST to JSON --------------------
try {
    const bst = new BST();
    [50, 30, 70, 20, 40, 60, 80].forEach(v => bst.insert(v));

    const filePath = path.join(__dirname, 'bst.json');
    fs.writeFileSync(filePath, bst.toJSON(), 'utf8');
    console.log(`BST saved to ${filePath}`);

    // -------------------- Load BST from JSON --------------------
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const loadedBST = BST.fromJSON(jsonData);

    console.log('In-order traversal of loaded BST:', loadedBST.inorder());
} catch (err) {
    console.error('Error:', err.message);
}
