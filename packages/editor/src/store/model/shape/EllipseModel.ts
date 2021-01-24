import { action, makeObservable, observable } from "mobx"
import { assign } from "../../utils"
import { ShapeModel, ShapeModelOptions } from "./ShapeModel"

export interface EllipseModelOptions extends ShapeModelOptions {
  fill?: string
  radiusX?: number
  radiusY?: number
}
export class EllipseModel extends ShapeModel {
  readonly type = "Ellipse"
  @observable radiusX: number = 40
  @observable radiusY: number = 40
  @observable fill: string = "#ffff00"

  constructor(options: EllipseModelOptions) {
    super()
    makeObservable(this)
    assign(this, options)
  }
}
