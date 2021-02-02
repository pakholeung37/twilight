import { action, computed, makeObservable, observable, override } from "mobx"
import { assign } from "../../utils"
import { ShapeModel, ShapeModelOptions } from "./ShapeModel"

export interface CircleModelOptions extends ShapeModelOptions {
  radius?: number
}
export class CircleModel extends ShapeModel {
  readonly type = "Circle"
  @observable radius: number = 40

  constructor(options: CircleModelOptions) {
    super()
    makeObservable(this)
    assign(this, options)
  }

  @override get _x() {
    return this.x + this.radius
  }

  set _x(v) {
    this.x = v - this.radius
  }

  @override get _y() {
    return this.y + this.radius
  }

  set _y(v) {
    this.y = v - this.radius
  }

}
