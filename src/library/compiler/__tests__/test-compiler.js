// import Compiler from "../compiler";
import Schema, { createSchema } from "../Schema";
import TokenStream from "../TokenStream";
import PatternMatch, { parseExpr } from "../PatternMatch";

const ArticleList = {
  type: "ArticleList",
  children: "Article*",
};

const Article = {
  type: "Article",
  groups: "atom",
};

const Swiper = {
  type: "Swiper",
  children: "Slide*",
};

const Slide = {
  type: "Slide",
  children: "",
  groups: "atom",
};

// const Container = {
//   type: "Container",
//   children: "*",
// };
const schema = new Schema(createSchema([ArticleList, Article, Swiper, Slide]));

describe("TokenStream methods", () => {
  const testContent = "ArticleList* (Article | Swiper)+";
  const tokenStream = new TokenStream(testContent, schema);
  test("next", () => {
    expect(tokenStream.next).toEqual("ArticleList");
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
    expect(tokenStream.next).toBe("ArticleList");
    tokenStream.forward();
    expect(tokenStream.eat("*")).toBe(true);
    expect(tokenStream.next).toBe("(");
    tokenStream.forward();
  });
  test("getToken", () => {
    expect(tokenStream.getTokens()).toEqual([
      "ArticleList",
      "*",
      "(",
      "Article",
      "|",
      "Swiper",
      ")",
      "+",
    ]);
  });
});

describe("parseExpr", () => {
  test("Article*", () => {
    const stream = new TokenStream("Article*", schema);
    expect(parseExpr(stream)).toMatchObject({
      type: "star",
      expr: { type: "name" },
    });
  });
});

describe("PatternMatch", () => {
  describe("parse", () => {
    test("ArticleList", () => {
      expect(PatternMatch.parse("ArticleList", schema)).toBeInstanceOf(
        PatternMatch
      );
    });
    test("ArticleList+", () => {
      expect(PatternMatch.parse("ArticleList+", schema)).toBeInstanceOf(
        PatternMatch
      );
    });
    test("ArticleList*", () => {
      expect(PatternMatch.parse("ArticleList*", schema)).toBeInstanceOf(
        PatternMatch
      );
    });
    test("ArticleList{2}", () => {
      expect(PatternMatch.parse("ArticleList{2}", schema)).toBeInstanceOf(
        PatternMatch
      );
    });
    test("ArticleList{2, 4}", () => {
      expect(PatternMatch.parse("ArticleList{2, 4}", schema)).toBeInstanceOf(
        PatternMatch
      );
    });
    test("ArticleList?", () => {
      expect(PatternMatch.parse("ArticleList?", schema)).toBeInstanceOf(
        PatternMatch
      );
    });
    test("ArticleList Swiper", () => {
      expect(PatternMatch.parse("ArticleList Swiper", schema)).toBeInstanceOf(
        PatternMatch
      );
    });
    test("ArticleList Swiper Swiper", () => {
      expect(
        PatternMatch.parse("ArticleList Swiper Swiper", schema)
      ).toBeInstanceOf(PatternMatch);
    });
    test("ArticleList ArticleList+", () => {
      expect(
        PatternMatch.parse("ArticleList ArticleList+", schema)
      ).toBeInstanceOf(PatternMatch);
    });
    test("ArticleList ArticleList* ArticleList+", () => {
      expect(
        PatternMatch.parse("ArticleList ArticleList* ArticleList+", schema)
      ).toBeInstanceOf(PatternMatch);
    });
    test("ArticleList | Swiper", () => {
      expect(PatternMatch.parse("ArticleList | Swiper", schema)).toBeInstanceOf(
        PatternMatch
      );
    });
    test("(ArticleList | Swiper)", () => {
      expect(
        PatternMatch.parse("(ArticleList | Swiper)", schema)
      ).toBeInstanceOf(PatternMatch);
    });
    test("(ArticleList+ | Swiper*)", () => {
      expect(
        PatternMatch.parse("(ArticleList+ | Swiper*)", schema)
      ).toBeInstanceOf(PatternMatch);
    });
    test("(ArticleList+ | Swiper*) ArticleList+", () => {
      expect(
        PatternMatch.parse("(ArticleList+ | Swiper*) ArticleList+", schema)
      ).toBeInstanceOf(PatternMatch);
    });
    test("(ArticleList | Swiper)+", () => {
      expect(
        PatternMatch.parse("(ArticleList | Swiper)+", schema)
      ).toBeInstanceOf(PatternMatch);
    });
    test("(ArticleList | Swiper){2, 4}", () => {
      expect(
        PatternMatch.parse("(ArticleList | Swiper){2, 4}", schema)
      ).toBeInstanceOf(PatternMatch);
    });
    test("", () => {
      expect(PatternMatch.parse("", schema)).toBe(PatternMatch.empty);
    });
    test("ArticleLists", () => {
      expect(() => PatternMatch.parse("ArticleLists", schema)).toThrow();
    });
    test("+", () => {
      expect(() => PatternMatch.parse("+", schema)).toThrow();
    });
    test("*", () => {
      expect(() => PatternMatch.parse("*", schema)).toThrow();
    });
    test("{2}", () => {
      expect(() => PatternMatch.parse("{2}", schema)).toThrow();
    });
    test("?", () => {
      expect(() => PatternMatch.parse("{2}", schema)).toThrow();
    });
    test("ArticleLists*+", () => {
      expect(() => PatternMatch.parse("ArticleLists*+", schema)).toThrow();
    });
    test("(ArticleLists | +)", () => {
      expect(() => PatternMatch.parse("(ArticleLists | +)", schema)).toThrow();
    });
    test("(ArticleLists | {2})", () => {
      expect(() =>
        PatternMatch.parse("(ArticleLists | {2})", schema)
      ).toThrow();
    });
    test("(ArticleLists | ?)", () => {
      expect(() => PatternMatch.parse("(ArticleLists | ?)", schema)).toThrow();
    });
  });

  describe("matchType", () => {
    function mapTypes(str) {
      return str == "" ? [] : str.split(" ").map(type => schema.nodes[type]);
    }
    function match(expr, typstr) {
      let pattern = PatternMatch.parse(expr, schema);
      const typs = mapTypes(typstr);

      for (let i = 0; pattern && i < typs.length; i++)
        pattern = pattern.matchType(typs[i]);

      return !!pattern && pattern.isValidEnd();
    }

    test("pattern <ArticleList>", () => {
      expect(match("ArticleList", "ArticleList")).toBe(true);
      expect(match("ArticleList", "Swiper")).toBe(false);
      expect(match("ArticleList", "ArticleList ArticleList")).toBe(false);
      expect(match("ArticleList", "")).toBe(false);
    });
    test("pattern <ArticleList+>", () => {
      expect(match("ArticleList+", "ArticleList")).toBe(true);
      expect(match("ArticleList+", "ArticleList ArticleList ArticleList")).toBe(
        true
      );
      expect(match("ArticleList+", "")).toBe(false);
      expect(match("ArticleList+", "Swiper")).toBe(false);
    });
    test("pattern <ArticleList*>", () => {
      expect(match("ArticleList*", "ArticleList")).toBe(true);
      expect(match("ArticleList*", "ArticleList ArticleList ArticleList")).toBe(
        true
      );
      expect(match("ArticleList*", "")).toBe(true);
      expect(match("ArticleList*", "Swiper")).toBe(false);
    });
    test("pattern <ArticleList?>", () => {
      expect(match("ArticleList?", "ArticleList")).toBe(true);
      expect(match("ArticleList?", "")).toBe(true);
      expect(match("ArticleList?", "Swiper")).toBe(false);
    });
    test("pattern <ArticleList | Swiper>", () => {
      expect(match("ArticleList | Swiper", "ArticleList")).toBe(true);
      expect(match("ArticleList | Swiper", "Swiper")).toBe(true);
      expect(match("ArticleList | Swiper", "")).toBe(false);
      expect(match("ArticleList | Swiper", "ArticleList ArticleList")).toBe(
        false
      );
      expect(match("ArticleList | Swiper", "Article")).toBe(false);
    });
    test("pattern <ArticleList{2, 4}>", () => {
      expect(match("ArticleList{2, 4}", "ArticleList ArticleList")).toBe(true);
      expect(
        match("ArticleList{2, 4}", "ArticleList ArticleList ArticleList")
      ).toBe(true);
      expect(
        match(
          "ArticleList{2, 4}",
          "ArticleList ArticleList ArticleList ArticleList"
        )
      ).toBe(true);
      expect(match("ArticleList{2, 4}", "")).toBe(false);
      expect(match("ArticleList{2, 4}", "ArticleList")).toBe(false);
    });

    test("pattern <atom>", () => {
      expect(match("atom", "Article")).toBe(true);
      expect(match("atom", "Slide")).toBe(true);
      expect(match("atom", "")).toBe(false);
      expect(match("atom", "ArticleList")).toBe(false);
    });

    test("pattern <atom+>", () => {
      expect(match("atom+", "Article")).toBe(true);
      expect(match("atom+", "Slide")).toBe(true);
      expect(match("atom+", "Article Article Article")).toBe(true);
      expect(match("atom+", "Slide Slide Slide")).toBe(true);
      expect(match("atom+", "Slide Article Slide")).toBe(true);
      expect(match("atom+", "ArticleList")).toBe(false);
      expect(match("atom+", "Artilce ArticleList")).toBe(false);
      expect(match("atom+", "")).toBe(false);
    });

    test("pattern <ArticleList+ Swiper>", () => {
      expect(match("ArticleList+ Swiper", "ArticleList Swiper")).toBe(true);
      expect(
        match("ArticleList+ Swiper", "ArticleList ArticleList Swiper")
      ).toBe(true);
      expect(match("ArticleList+ Swiper", "")).toBe(false);
      expect(match("ArticleList+ Swiper", "ArticleList")).toBe(false);
      expect(match("ArticleList+ Swiper", "Swiper")).toBe(false);
    });
  });
});
