export interface NodeSchema {
  type: string;
  children?: string;
  group?: string;
  enter?: (node: Node, parent: Node | null) => void;
  exit?: (node: Node, parent: Node | null) => void;
}
export interface Schema {
  nodes: { [key: string]: NodeSchema | undefined };
  rules?: ((node: Node) => void)[];
}

export interface Node {
  type: string;
  props: any[];
  children: Node[];
}

const ArticleList: NodeSchema = {
  type: "ArticleList",
  children: "Article*",
};

const Article: NodeSchema = {
  type: "Article",
  group: "atom",
};

const Swiper: NodeSchema = {
  type: "Swiper",
  children: "Slide*",
};

const Slide: NodeSchema = {
  type: "Slide",
  children: "container+",
};

function createSchema(schemas: NodeSchema[]) {
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

const schema: Schema = createSchema([ArticleList, Article]);

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
