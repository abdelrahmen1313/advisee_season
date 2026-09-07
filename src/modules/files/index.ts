import type { PathLike } from "node:fs";

export type FileState = "f" | "b";

export interface IFileLock {
    status: FileState,
    size : number,   
}