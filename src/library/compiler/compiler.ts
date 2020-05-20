import NodeSchema, { NodeSchemaSpec } from "./NodeSchema";
import { Schema, Node } from "./types";

export function createSchema(schemas: NodeSchemaSpec[]): Schema {
  return {
    nodes: schemas.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.type]: new NodeSchema(cur),
      }),
      {}
    ),
  };
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
      if (nodeSchema.enter) {
        nodeSchema.enter(node, parent);
      }

      if (node.children) {
        node.children.map(child => traverse(child, node));
      }

      if (nodeSchema.exit) {
        nodeSchema.exit(node, parent);
      }
    }

    traverse(root, null);
  }
}
