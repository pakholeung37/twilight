import { action, makeObservable, observable } from "mobx"
import { assign } from "../../utils"
import { ShapeModel, ShapeModelOptions } from "./ShapeModel"

export interface RectModelOptions extends ShapeModelOptions {
  width?: number
  height?: number
}
export class RectModel extends ShapeModel {
  readonly type = "Rect"
  @observable width: number = 40
  @observable height: number = 40

  constructor(options: RectModelOptions) {
    super()
    makeObservable(this)
    assign(this, options)
  }
}
