/** main repl program for the advising season */
import * as readline from "node:readline";

function main() {
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
                console.log("hi ",name);
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