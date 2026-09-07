import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"


export function checkFaculty(fname : string) {
    const path = join(process.env.DATA_DIR_UNIX ?? "./data", "faculties",fname);    
    return existsSync(path);   
}

export function getFacDir(fname : string) {
        const path = join(process.env.DATA_DIR_UNIX ?? "./data", "faculties",fname);    
        if(existsSync(path)) {
            return path;
        };  
        return null;
}

export function getFaculties() {
    const path = join(process.env.DATA_DIR_UNIX ?? "./data", "faculties");
    return readdirSync(path);
}


