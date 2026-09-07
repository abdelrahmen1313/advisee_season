/*import { join } from "node:path";
import { addMember } from "./modules/members/add";
import { loadEnvFile } from "node:process";
import { existsSync } from "node:fs";
loadEnvFile();

const fname1 = "twenty-four";
const fname1_url = join(process.env.DATA_DIR_UNIX ?? './', "faculties", fname1);
const f1_members = ["lexa", "lee", "ian"];

console.log(fname1_url);

console.log(existsSync(fname1_url));

f1_members.forEach((m) => addMember(m, fname1, fname1_url));
*/