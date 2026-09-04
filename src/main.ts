/** main repl program for the advising season */
import * as readline from "node:readline";
import { BinarySearchTreeNode } from "./bst/binarySearchNode.js";
import { fileRegistry } from "./files/fileRegistry.js";
import { loadEnvFile } from "node:process";
import { join, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";


const PRINT = "p";
const ADD_A = "a";
const ADD_F = "f";
const TOTAL = "t";
const SLACKER = "s";
const QUIT = "q";

export type Member = {
    name: string
}
type TFacultyMember = typeof BinarySearchTreeNode<Member>

let dataStore: Member[] = [];



async function getDataStore(fname: string) {
    const dataUrl = process.env.dataDir ?? "./data";
    const srcPath = join(dataUrl, `members-${fname}.json`);


    if (!fileRegistry.getFile(srcPath)) {
        fileRegistry.add(srcPath);
    };

    if (fileRegistry.getStatus(srcPath) === "f") {
        fileRegistry.aquireLock(srcPath)
        const { default: facData } = await import(pathToFileURL(resolve(srcPath)).href, {
            with: { type: "json" }
        });
        return facData

    } else {
        console.log("file locked?")
        return 0;
    }
}

function main() {


    const faculty_name = process.argv.slice(2).join("");


    if (typeof faculty_name != "string") {
        console.log("Please specify a datastore");
        return;
    };

    loadEnvFile();


    getDataStore(faculty_name)
        .then((d) => {
            if (d !== 0) {
                dataStore = d;
                d = null;
            }
            console.log("fac:", d);
            console.log("working under : ", faculty_name);
            console.log(dataStore[0]?.name);

        })
        .catch((err) => {
            console.log("error getting data_store_file ", err)
        })





    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "\nassignees> "
    });


    rl.on("line", async (input: string) => {
        switch (input[0]) {
            case "t": {
                let name = input.slice(1);
                if (!name) { console.log("please put in a name"); return; }
                console.log("hi ", name);
                return;
            }
            default: {
                process.stdout.write("hello world\n");
                return;
            }
        }
    });

    rl.on("keypress", (key) => {
        if (key.ctrl && key.name == 'l') {
            process.stdout.write('\u001B[2J\u001B[0;0f');
        }
    })

    rl.on("SIGINT", () => {
        process.exit(0);
    })

    rl.on("close", () => {
        process.exit(0);
    });

    rl.prompt();

};

main();