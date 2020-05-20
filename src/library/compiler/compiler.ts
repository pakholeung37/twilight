import NodeSchema, { NodeSchemaSpec } from "./NodeSchema";
import { Node } from "./types";
import Schema from "./Schema";

export interface CompileHook {
  (node: Node, parent: Node | null): void;
}

export default class Compiler {
  constructor(schema: Schema) {
    /* TODO */
  }
  compile() {
    /* TODO */
  }

  addRules() {
    /* TODO */
  }

  schemaCheck() {
    /* TODO */
  }

  traverser(root: Node, schema: Schema) {
    function traverse(node: Node, parent: Node | null) {
      const nodeType = node.type;
      const nodeSchema = schema.nodes[nodeType];
      if (!nodeSchema)
        throw TypeError(
          `[compiler] nodeType ${node.type} is not on the schema`
        );

      if (node.children) {
        node.children.map(child => traverse(child, node));
      }
    }

    traverse(root, null);
  }
}
