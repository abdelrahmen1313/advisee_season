/**
 * binary search program for faculty members advisings
 * The rule is simple
 * a faculty member could be having a supervisor, therefore, could be having advisors.
 * the supervisor cannot be an advisor.
 * 
 * if a member is not having no advisors and no supervisor it is called a slacker.
 * 
 * ** another rule
 *   if james is a supervisor,
 *   and jane is it's first supervisee,
 *   jane cannot be the next supervisee.
 * 
 * also,
 *   a supervisor can supervise up to 2 members;
 * 
 * The program is about 50 life-coaching sessions,
 * so keeping it tight to a single list (linked list) may be more adequate
 * then using so many.
 */

// relationships
// member n->n member (advice)
// member 1->n(2) member (supervise)

// typedef
type t_activity = 'advising' | 'supervising';

type Member = {
   
    name: string,
    supervisee1: Member,
    supervisee2 : Member,
    advisee_count: number
};

// First Approach:
// just create a list of members, and then do all the work on top of it.

let members : Member[] = [];

async function getMembers(source : string) {
    const srcPath = `members-${source}.json`
    
    return await import(`./${srcPath}`);
}

getMembers("data1")
  .then((data) => {members = data; console.log(members)})
  .catch((err) => {
    console.log("error reading member list");
    return;
  })



// second Approach
// include seperate advising and supervisions lists, this will add more simplicty
// using some ts oop patterns
// but with so extra consumption and maybe latency.
// actually voiding it.