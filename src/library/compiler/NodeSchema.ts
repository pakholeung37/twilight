import { Node } from "./types"
export interface NodeSchemaSpec {
  type: string
  children?: string
  groups?: string
  enter?: CompileHook
  exit?: CompileHook
}

export interface CompileHook {
  (node: Node, parent: Node | null): void
}

export default class NodeSchema {
  private _type: string
  private _children?: string
  private _groups?: string
  private _enter?: CompileHook
  private _exit?: CompileHook

  public constructor({
    type,
    children = "",
    groups = "",
    enter,
    exit,
  }: NodeSchemaSpec) {
    this._type = type
    this._children = children
    this._groups = groups
    this._enter = enter
    this._exit = exit
  }

  get type() {
    return this._type
  }
  get groups() {
    return this._groups
  }

  public enter(node: Node, parent: Node | null): void {
    this._enter && this._enter(node, parent)
  }
  public exit(node: Node, parent: Node | null): void {
    this._exit && this._exit(node, parent)
  }
}
