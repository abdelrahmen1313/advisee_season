import { encodeName } from "../../enc/name";

interface supNode {
  name : string;
  name_alias : string;
}

function getSupervisionsTree() {

}

/**
 * returns all the active supervisions of a member
 */
function createMemberNode(name : string) : supNode
{
  const enc_name = encodeName(name);
  return {
    name : name,
    name_alias : enc_name.slice(1, enc_name.length).join("")
  };
}

/**
 *
 */
function addSupervision(
  supervisor : string,
  supervisee : string
) {

  const visor_node = createMemberNode(supervisor);
  const visee_node = createMemberNode(supervisee);


}
