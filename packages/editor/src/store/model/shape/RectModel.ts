import { action, computed, makeObservable, observable } from "mobx"
import { assign } from "../../utils"
import { ShapeModel, ShapeModelOptions } from "./ShapeModel"

export interface RectModelOptions extends ShapeModelOptions {
  width?: number
  height?: number
}
export class RectModel extends ShapeModel {
  readonly type = "Rect"

  constructor(options: RectModelOptions) {
    super()
    makeObservable(this)
    assign(this, options)
  }
}
