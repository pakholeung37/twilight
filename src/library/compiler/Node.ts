import Fragment from "./Fragment";

export interface NodeSpec {
  type: string;
  props?: any[];
  children: Node[];
}
export default class Node implements NodeSpec {
  type: string;
  props?: any[];
  children: Node[];
  constructor({ type, props, children }: NodeSpec) {
    if (!type) throw Error("[compiler] node type can't be falsy");
    this.type = type;
    this.props = props;
    this.children = children;
  }

  toJSON() {
    return "";
  }
}
