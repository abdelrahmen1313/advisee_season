import { join } from "path";
import { encodeName, type nameCode } from "../../enc/name";
import { existsSync, readFileSync, writeFileSync } from "fs";


/**
 * @brief generate a new memberId
 * @param {string} name
 * @returns {string} memberId
 */
function newMemberId(name : string) : string
{
  const nameToken : number[] = encodeName(name);
  const dateSegment = newDateSegment();

  return nameToken[0]?.toString() + '-' + dateSegment;
}



/**
 *
 * @param {string} name
 * @returns {Promise<void>}
 */
export async function addMember(name : string, fname:string, dataDirPath : string) : Promise<void>
{

  const uid = newMemberId(name);
  const target = join(dataDirPath, `${uid}.json`);
  const data = { "id" : uid, "name" : name, "fname" : fname};

  const name_idx_path = join(process.env.DATA_DIR_UNIX ?? './data', "indexes", "names");

  const key = uid.slice(0, uid.indexOf("-"));
  const idxTarget = join(name_idx_path, `${key}.json`)
  const haveTwin = existsSync(idxTarget); // transferring complexity to the OS.

  const obj = {
    id : uid,
    name: name,
  }
  if (!haveTwin) {
    writeFileSync(idxTarget, `[${JSON.stringify(obj)}]`, {"encoding" : "utf-8"});
  } else {
    const index = JSON.parse(readFileSync(idxTarget, {encoding : "utf-8"}));
    for (const mem of index) {
      if (mem.name === name) {
        throw new Error("DUPP::ERR: A meber with this name already exists!")
      }
    }
    index.push(obj);
    writeFileSync(idxTarget, JSON.stringify(index), {"encoding" : "utf-8"});
  }

  writeFileSync(target, JSON.stringify(data), {encoding : "utf-8"});

  return;
}

/**
 * @brief Generates a 12-bits segment {[3]-[9]}
 * @param {authorId : string} authorId - The author id to use in the upload id
 */
export function newDateSegment() : string {

  const date = new Date();
  let msSignature = date.getMilliseconds().toString();
  while (msSignature.length < 3) {
    msSignature = '0' + msSignature;
  };


  let dayPart = date.getDate().toString()
  while (dayPart.length < 2) {
    dayPart = '0' + dayPart;
  }
  let monthPart = (date.getMonth() + 1).toString()

  while (monthPart.length < 2) {
    monthPart = '0' + monthPart;
  }
  const datePart = dayPart + monthPart + date.getFullYear().toString();


  return `${msSignature}-${datePart}`;
}
