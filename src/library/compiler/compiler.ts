export interface NodeSchema {
  type: string;
  children?: string;
  group?: string;
}
export interface Schema {
  nodes: { [key: string]: NodeSchema };
  rules: ((node: Node) => void)[];
}

const ArticleList: NodeSchema = {
  type: "ArticleList",
  children: "Article*",
};

const Article: NodeSchema = {
  type: "Article",
  group: "atom",
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
}
