/** main repl program for the advising season */
import * as readline from "node:readline";
import { BinarySearchTreeNode } from "./templates/bst/binarySearchNode.js";
import { fileRegistry } from "./modules/files/fileRegistry.js";
import { loadEnvFile } from "node:process";
import { join, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { checkFaculty, getFacDir, getFaculties } from "./modules/faculty.js";
import { printHelp } from "./utils/printHelp.js";
import { addMember } from "./modules/members/add.js";


const PRINT = "p";
const ADD_M = "add_member"
const ADD_A = "a"; // add advising
const ADD_F = "f"; // add supervising
const TOTAL = "t"; // -> t (member_name) => print(advisees).sort(a-z)
const SLACKER = "s";
const QUIT = "q";

export type Member = {
    id : string,
    name: string
}

export type Supervision = {
    name: string,
    supervisee1: string,
    supervisee2: string,
}

export type advision = {
    mem1: string,
    mem2: string,
}





function main() {


    const faculty_name = process.argv.slice(2).join("");


    if (!faculty_name || typeof faculty_name != "string") {
        console.log("Please specify a datastore\n");
        printHelp();
        return;
    };


    loadEnvFile();

    if (faculty_name === "list_facs") {
        console.log(getFaculties());
        return;
    }


    const facUrl = getFacDir(faculty_name);
    if (!facUrl) {
        console.log("Please check you faculty name\n");
        printHelp();
        return;
    }




    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "\nassignees> "
    });


    rl.on("line", async (input: string) => {
        const tokens = input.split(" ");

        switch (tokens[0]) {
            case ADD_M: {
                const name = tokens[1];
                if (name && name?.length > 3) {
                    try {
                        addMember(name, faculty_name, facUrl);
                        console.log("member added successefully")
                    } catch(err) {
                        console.log("Error Adding new member :\n" , err);
                    }
                    
                    return;
                }
                else {
                    console.log("Please enter a member name")
                    return;
                }
            }
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