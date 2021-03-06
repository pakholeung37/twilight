import { Expression, NameExpression } from "./types"
import NodeSchema from "./NodeSchema"
import TokenStream from "./TokenStream"
import { Schema } from "./types"
import dfa from "./dfa"
import nfa from "./nfa"

export default class PatternMatch {
  validEnd: boolean
  next: any[] = []
  wrapCache = []
  constructor(validEnd: boolean) {
    this.validEnd = validEnd
  }

  static parse(string: string, nodeSchema: Schema) {
    const stream = new TokenStream(string, nodeSchema)
    if (stream.next == null) return PatternMatch.empty
    const expr = parseExpr(stream)
    if (stream.next) stream.err("Unexpected trailing text")
    const match = dfa(nfa(expr))
    return match
  }

  static empty = new PatternMatch(true)
}

export function parseExpr(stream: TokenStream): Expression {
  const exprs: Expression[] = []
  do {
    exprs.push(parseExprSeq(stream))
  } while (stream.eat("|"))
  return exprs.length == 1 ? exprs[0] : { type: "choice", exprs }
}

export function parseExprSeq(stream: TokenStream): Expression {
  const exprs: Expression[] = []
  do {
    exprs.push(parseExprSubscript(stream))
  } while (stream.next && stream.next != ")" && stream.next != "|")
  return exprs.length == 1 ? exprs[0] : { type: "seq", exprs }
}

export function parseExprSubscript(stream: TokenStream): Expression {
  let expr = parseExprAtom(stream)
  while (true) {
    if (stream.eat("+")) expr = { type: "plus", expr }
    else if (stream.eat("*")) expr = { type: "star", expr }
    else if (stream.eat("?")) expr = { type: "opt", expr }
    else if (stream.eat("{")) expr = parseExprRange(stream, expr)
    else break
  }
  return expr
}

function parseExprAtom(stream: TokenStream): Expression {
  if (stream.eat("(")) {
    const expr = parseExpr(stream)
    if (!stream.eat(")")) stream.err("Missing closing paren")
    return expr
  } else if (!/\W/.test(stream.next)) {
    const exprs = resolveName(stream, stream.next).map(type => {
      return { type: "name", value: type } as NameExpression
    })
    stream.forward()
    return exprs.length == 1 ? exprs[0] : { type: "choice", exprs }
  } else {
    stream.err("Unexpected token '" + stream.next + "'")
  }
  throw new Error()
}

export function parseNum(stream: TokenStream): number {
  if (/\D/.test(stream.next))
    stream.err("Expected number, got '" + stream.next + "'")
  const result = Number(stream.next)
  stream.forward()
  return result
}

export function parseExprRange(
  stream: TokenStream,
  expr: Expression,
): Expression {
  const min = parseNum(stream)
  let max = min
  if (stream.eat(",")) {
    if (stream.next != "}") max = parseNum(stream)
    else max = -1
  }
  if (!stream.eat("}")) stream.err("Unclosed braced range")
  return { type: "range", min, max, expr }
}
/**
 * resovle a giving name and return a group of compatible nodeSchema;
 * compatible means: 1. the name is a nodeSchema.type then this nodeSchema is compatible;
 * or 2.the name is in some nodeSchema.groups, then this nodeSchema is compatible.
 *
 * @param stream tokenizer
 * @param name name should be a nodeType or a group name;
 * @return return a group of nodeSchema
 */
function resolveName(stream: TokenStream, name: string): NodeSchema[] {
  const schema = stream.schema
  const types = schema.nodes
  const type = types[name]
  if (type) return [type]
  // if name is not a type in schema, maybe it is a groups name,
  const result = []
  for (const typeName in types) {
    const type = types[typeName] as NodeSchema
    if (type.groups && type.groups.indexOf(name) > -1) result.push(type)
  }
  if (result.length == 0)
    stream.err("No node type or group '" + name + "' found")
  return result
}
