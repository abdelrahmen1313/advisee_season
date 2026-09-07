import { existsSync } from "fs";
import { encodeName } from "../../enc/name";
import { join } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";

interface supNode {
  name: string;
  name_alias: string;
}

type supervision = {
  supervisor: string,
  supervisees: string[]
}

/**
 * returns all the active supervisions of a member
 * + supervisions of it's own supervisees
 */
export function getSupervisionsTree(name: string): string[]
{
  const sups = getMemberSupervisions(name);
  if (!sups) {
    return [];
  }

  return sups.supervisees.flatMap((supervisee) => [
    `${sups.supervisor} -> ${supervisee}`,
    ...getSupervisionsTree(supervisee)
  ]);
}


function getMemberSupervisions(name: string): supervision | null {
  const visor_node = createMemberNode(name);
  // extract the member supervisings list.
  const _supsPath = join(process.env.DATA_DIR_UNIX ?? "./data", "supervision", `${visor_node.name_alias}.json`);
  if (!existsSync(_supsPath)) {
    return null;
  } else {
    const sups : supervision = JSON.parse(readFileSync(_supsPath, { "encoding": "utf-8" }));
    return sups
  }
};




function createMemberNode(name: string): supNode {
  const enc_name = encodeName(name);
  return {
    name: name,
    name_alias: enc_name.slice(1, enc_name.length).join("")
  };
}

/**
 * add a new supervision node
 * @param {string} supervisor
 * @param {string} supervisee
 */
export function addSupervision(
  supervisor: string,
  supervisee: string
) {

  const visor_node = createMemberNode(supervisor);
  // extract the member supervisings list.
  const _supsPath = join(process.env.DATA_DIR_UNIX ?? "./data", "supervision", `${visor_node.name_alias}.json`);
  let data = {
    "supervisor": supervisor,
    "supervisees": [supervisee]
  }
  if (!existsSync(_supsPath)) {
    writeFileSync(_supsPath, JSON.stringify(data), { "encoding": "utf-8" });
  } else {
    // member alredy have a supervision record
    const record: supervision = JSON.parse(readFileSync(_supsPath, { "encoding": "utf-8" }));
    if (record.supervisees.length === 2) {
      throw new Error("ERROR:MAX_VISIONS_REACHED")
    } else {
      record.supervisees.push(supervisee);
      writeFileSync(_supsPath, JSON.stringify(record), { "encoding": "utf-8" });
    }
  }
  return;

}

/*addSupervision("ahmed", "mounira");*/
//addSupervision("salma", "samir");
//console.log(getMemberSupervisions("salma"))
//console.log(getSupervisionsTree("ahmed"));