import Node from "./Node";

export default class Fragment {
  private content: Node[] = [];
  constructor(content: Node[]) {
    this.content = content;
  }
}
