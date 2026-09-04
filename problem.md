# advisee, supervise season

(url)[https://www.programminghomeworkhelp.com/samples/cpp-binary-search-tree-query/]
(url)[https://www.programminghomeworkhelp.com/uploads/images/querying-binary-3.webp]

# problem
some faculty members will directly advise students, 
and some faculty members will supervise up to two other faculty members.

These roles (advising and supervising) will never be mixed. (an advisor cannot be a supervisor and vice-versa)

a member supervising another members, will not be assigned advisees.

# Target Audience
this program is being written for a faculty administrator that LOVES alphabetizing things.

# Relationship breakdown

* Supervisor -> supervisee
A faculty member (the supervisor) is responsible for one or more other members (the supervisees).
In the BST context, this is like linking nodes — the supervisor node “points” to its supervisees.

* advisor -> advisee
This is a separate relationship, more like mentorship.
Any member can advise any other member, regardless of whether they are in the same supervision chain.

So, the advising relationship is not limited by the tree structure — it’s more like a cross-link between nodes.

* Examples :

- Dr. Smith supervises Dr. Lee and Dr. Patel (so Smith → Lee, Smith → Patel).

- Dr. Lee advises Dr. Patel on a research project (Lee → Patel as advisor).

## Data Sources Design
Keep a members list per faculty.
seperate the relationships models into a broader landscape

## Other trade-offs

