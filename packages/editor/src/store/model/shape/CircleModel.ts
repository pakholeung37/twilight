import { action, makeObservable, observable } from "mobx"
import { assign } from "../../utils"
import { ShapeType } from "./def"
import { ShapeModel, ShapeModelOptions } from "./ShapeModel"

export interface CircleModelOptions extends ShapeModelOptions {
  fill?: string
  radius?: number
}
export class CircleModel extends ShapeModel {
  type: ShapeType = "Circle"
  @observable radius: number = 40
  @observable fill: string = "#ffff00"

  constructor(options: CircleModelOptions) {
    super(options)
    makeObservable(this)
    assign(this, options)
  }
}
