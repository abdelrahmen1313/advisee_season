🔧 Core CLI Functions

# 1* addMember(name: string, department?: string)

Creates a new faculty JSON file.

Syn/ack check: reject if the name already exists.

Complexity: 
𝑂(1) with cache.
DONE






----------------------------------------------------
# 2*listMembers()

Prints all faculty names from the directory.

Useful for debugging and overview.

- DONE









____________________________________________________

3- **addSupervision(supervisor: string, supervisee: string)**

Updates supervision.json.

Enforces the “up to two supervisees” rule.

If supervisor already has two, reject.

- DONE

_____________________________________________________

4-  **addAdvising(advisor: string, advisee: string)**

Updates advising.json.

No limit on advisees/advisors.

______________________________________________________

5 - **getSupervisees(supervisor: string)**

Queries the BST or supervision list.

Returns direct supervisees.
_____________________________________________________
6- **getAdvisors(advisee: string)**

Queries advising list.

Returns all advisors for a given member.
_________________________________________________

7- **getHierarchy(supervisor: string)**

Recursively prints the supervision tree starting from a supervisor.

Example:
Dr. Smith
  ├─ Dr. Lee
  │   └─ Dr. Garcia
  └─ Dr. Patel

__________________________________________________

8- **getAdvisingNetwork(member: string)**

Prints all advisees and advisors for a given member.

Example:
 Dr. Patel
  Advisors: Dr. Smith, Dr. Lee
  Advisees: Dr. Garcia


9- **removeMember(name: string)**

Deletes the faculty JSON file.

Cleans up references in supervision/advising lists.

10- **searchMember(name: string)**

BST lookup by name.

Returns member info if found.



🖥 CLI Flow
Commands like:
cli add-member "Dr. Smith" CS
cli add-supervision "Dr. Smith" "Dr. Lee"
cli add-advising "Dr. Lee" "Dr. Patel"
cli get-hierarchy "Dr. Smith"
cli get-advising "Dr. Patel"

Each command maps directly to one of the functions above.