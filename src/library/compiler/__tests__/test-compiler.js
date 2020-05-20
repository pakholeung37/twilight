import Compiler, { createSchema } from "../compiler";
import NodeSchema from "../NodeSchema";
import TokenStream from "../TokenStream";
import PatternMatch, { parseExpr } from "../PatternMatch";

const ArticleList = {
  type: "ArticleList",
  children: "Article*",
};

const Article = {
  type: "Article",
  group: "atom",
};

const Swiper = {
  type: "Swiper",
  children: "Slide*",
};

const Slide = {
  type: "Slide",
  children: "Container+",
};

const Container = {
  type: "Container",
  children: "*",
};
const schema = createSchema([ArticleList, Article, Swiper, Slide, Container]);

describe("create schema", () => {
  test("schema.nodes exist", () => {
    expect(schema.nodes).toBeDefined();
  });
  test("schema.ArticleList instance of NodeSchema", () => {
    expect(schema.nodes.ArticleList).toBeInstanceOf(NodeSchema);
  });
  test("schema.abc not exist", () => {
    expect(schema.nodes.abc).toBeUndefined();
  });
});

describe("TokenStream methods", () => {
  const testContent = "Article* (Container|Swiper)+";
  const tokenStream = new TokenStream(testContent, schema);
  test("next", () => {
    expect(tokenStream.next).toEqual("Article");
  });
  test("schema", () => {
    expect(tokenStream.schema).toEqual(schema);
  });
  test("err", () => {
    expect(() => tokenStream.err("h")).toThrow();
  });
  test("eat and forward", () => {
    expect(
      tokenStream.eat("(") && tokenStream.eat(")") && tokenStream.eat("+")
    ).toBe(false);
    expect(tokenStream.next).toBe("Article");
    tokenStream.forward();
    expect(tokenStream.eat("*")).toBe(true);
    expect(tokenStream.next).toBe("(");
    tokenStream.forward();
  });
  test("getToken", () => {
    expect(tokenStream.getTokens()).toEqual([
      "Article",
      "*",
      "(",
      "Container",
      "|",
      "Swiper",
      ")",
      "+",
    ]);
  });
});

describe("parseExpr", () => {
  test("Article*", () => {
    const testContent = "Article*";
    const stream = new TokenStream(testContent, schema);
    expect(parseExpr(stream)).toMatchObject({
      type: "star",
      expr: { type: "name" },
    });
  });
});

describe("PatternMatch", () => {
  const testContent = "(ArticleList | Swiper)";
  // test(`${testContent}`, () => {
  //   expect(PatternMatch.parse(testContent, schema)).toBe(true);
  // });
  // testContent = "ArticleList*";
  test(`${testContent}`, () => {
    expect(PatternMatch.parse(testContent, schema)).toBe(true);
  });
});
