import PatternMatch from "./PatternMatch";
import Schema from "./Schema";
export interface NodeSchemaSpec {
  type: string;
  children?: string;
  groups?: string;
}

export default class NodeSchema {
  private _type: string;
  private _children: PatternMatch | string;
  private _groups: string[];
  // if the compiler create several time
  // this patternMatchCache cans make a good performance.
  private static patternMatchCache: {
    [key: string]: PatternMatch | undefined;
  } = {};

  public constructor({ type, children = "", groups = "" }: NodeSchemaSpec) {
    this._type = type;
    // this is a lazy create, when calls createChildrenPattern,
    // it will finally turn this into a PatternMatch
    this._children = children;
    this._groups = groups ? groups.split(" ") : [];
  }

  get type() {
    return this._type;
  }
  get groups() {
    return this._groups;
  }

  createChildrenPattern(schema: Schema) {
    if (this._children instanceof PatternMatch) return;
    this._children =
      NodeSchema.patternMatchCache[this._children] ||
      PatternMatch.parse(this._children, schema);
  }
}
