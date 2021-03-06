import { action, computed, makeObservable, observable, override } from "mobx"
import { assign } from "../../utils"
import { ShapeModel, ShapeModelOptions } from "./ShapeModel"

export interface EllipseModelOptions extends ShapeModelOptions {
  radiusX?: number
  radiusY?: number
}
export class EllipseModel extends ShapeModel {
  readonly type = "Ellipse"
  @observable radiusX: number = 40
  @observable radiusY: number = 40

  constructor(options: EllipseModelOptions) {
    super()
    makeObservable(this)
    assign(this, options)
  }

  @override get _x() {
    return this.x + this.radiusX
  }

  set _x(v) {
    this.x = v - this.radiusX
  }

  @override get _y() {
    return this.y + this.radiusY
  }

  set _y(v) {
    this.y = v - this.radiusY
  }
}
