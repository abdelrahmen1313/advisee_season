import { join } from "path";
import { encodeName, type nameCode } from "../../enc/name";
import { getFacDir } from "../faculty";
import { existsSync, readFileSync, writeFileSync } from "fs";


// generate a member id?

function newMemberId(name : string) 
{
  const nameToken : number[] = encodeName(name);
  const dateSegment = newDateSegment();

  return nameToken[0]?.toString() + '-' + dateSegment;
}






// we need to save a member record under
// faculty->{name_prefix.json}
/**
 *
 * @param {string} name
 * @returns {void}
 */
export async function addMember(name : string, fname:string, dataDirPath : string) : Promise<void>
{
 
  const uid = newMemberId(name);
  const target = join(dataDirPath, `${uid}.json`);
  const data = { "id" : uid, "name" : name, "fname" : fname};
  if (existsSync(target)) {
    throw new Error("DUPP_ERR::ID_CONFLICT");
  }
  writeFileSync(target, JSON.stringify(data), {encoding : "utf-8"});
  
  
  // TODO : save an index copy
  const name_idx_path = join(process.env.DATA_DIR_UNIX ?? './data', "indexes", "names");

  const key = uid.slice(0, uid.indexOf("-"));
  const idxTarget = join(name_idx_path, `${key}.json`)
  const haveTwin = existsSync(idxTarget);
  
  const obj = {
    id : uid,
    name: name,
    
  }
  if (!haveTwin) {
    writeFileSync(idxTarget, `[${JSON.stringify(obj)}]`, {"encoding" : "utf-8"});
  } else {
    const index = JSON.parse(readFileSync(idxTarget, {encoding : "utf-8"}));
    index.push(obj);
    writeFileSync(idxTarget, JSON.stringify(index), {"encoding" : "utf-8"});
  }
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

