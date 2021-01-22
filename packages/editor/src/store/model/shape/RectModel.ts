import { action, makeObservable, observable } from "mobx"
import { assign } from "../../utils"
import { ShapeModel, ShapeModelOptions } from "./ShapeModel"

export interface RectModelOptions extends ShapeModelOptions {
  width?: number
  height?: number
  fill?: string
}
export class RectModel extends ShapeModel {
  @observable width: number = 40
  @observable height: number = 40
  @observable fill: string = "#ffff00"

  constructor(options: RectModelOptions) {
    super(options)
    makeObservable(this)
    assign(this, options)
    this.type = "Rect"
  }
}
