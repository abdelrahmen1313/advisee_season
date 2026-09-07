
export type nameCode = {
    tokens : number[],
    sum : number
};


/**
 * @param {string} name
 * @returns {nameCode | number[]}
 */
export function encodeName(name : string) :  number[] {
   let tokens : number[] = [];
   let sum : number = 0;
   if (!name || name.length > 32) {
    throw new Error("Error: must provide a name");
   }
   for (let i = 0; i < name.length; i++) {
    tokens.push(name[i]!.charCodeAt(0));
    sum += name[i]!.charCodeAt(0)
   };

  return [sum, ...tokens]

}
