import NodeSchema from "./NodeSchema"

export type Expression =
  | ChoiceExpression
  | SeqExpression
  | StarExpression
  | PlusExpression
  | OpreateExpression
  | RangeExpression
  | NameExpression

export interface ChoiceExpression {
  type: "choice"
  exprs: Expression[]
}

export interface SeqExpression {
  type: "seq"
  exprs: Expression[]
}

export interface StarExpression {
  type: "star"
  expr: Expression
}

export interface PlusExpression {
  type: "plus"
  expr: Expression
}

export interface OpreateExpression {
  type: "opt"
  expr: Expression
}

export interface RangeExpression {
  type: "range"
  expr: Expression
  min: number
  max: number
}

export interface NameExpression {
  type: "name"
  value: NodeSchema
}
export type PreExpression = Partial<Expression>

export interface Schema {
  nodes: { [key: string]: NodeSchema | undefined }
  rules?: ((node: Node) => void)[]
}

export interface Node {
  type: string
  props: any[]
  children: Node[]
}
