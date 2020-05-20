import NodeSchema, { NodeSchemaSpec } from "./NodeSchema";

export interface SchemaSpec {
  nodes: { [key: string]: NodeSchemaSpec | undefined };
  rules?: ((node: Node) => void)[];
}

export function createSchema(schemas: NodeSchemaSpec[]): SchemaSpec {
  return {
    nodes: schemas.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.type]: cur,
      }),
      {}
    ),
  };
}

export default class Schema {
  public nodes: { [key: string]: NodeSchema | undefined } = {};

  constructor(spec: SchemaSpec) {
    for (const typeName in spec.nodes) {
      this.nodes[typeName] = new NodeSchema(
        spec.nodes[typeName] as NodeSchemaSpec
      );
    }
    // when schema.nodes created,
    // it ready for NodeSchema to compile it's children pattern match
    for (const typeName in this.nodes) {
      this.nodes[typeName]?.createChildrenPattern(this);
    }
  }
}
