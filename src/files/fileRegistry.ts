/**
 * @brief
 * this class is used to safely manipulate files used by a processus
 */

import { statSync } from "node:fs";
import type { IFileLock } from "./index.js";


class FileRegistry {
  
    private files = new Map<string, IFileLock>();
    public bufferedBytes: number = 0;
    public maxBuffSize: number = 65650;



    add(url: string) {
        if (this.files.get(url)) {
            return 0;
        }
        const { size } = statSync(url, {throwIfNoEntry : true});
        if (!size) {
            return 0;
        }
        this.files.set(url, { "size": size, "status": "f" });
    };

    getStatus(url: string) {
        const file = this.files.get(url);
        if (file === undefined) {
            return 0;
        };
        return file.status;
    }

    getFile(url: string) {
        const file = this.files.get(url);
        if (file === undefined) {
            return 0;
        };
        return file;
    }

    aquireLock(url: string) {
        const file = this.getFile(url);
        if (!file) {
            return 0;
        };

        if (file.size + this.bufferedBytes > this.maxBuffSize) {
            return 0;
        }

        this.files.set(url, { "status": "b", size: file.size });
        this.bufferedBytes += file.size;
    };

    freeFile(url: string) {
        const file = this.getFile(url);
        if (!file) {
            return 0
        };

        this.files.set(url, {"size" : file.size, "status" : "f"});
        this.bufferedBytes -= file.size;

    };

};

export const fileRegistry = new FileRegistry()