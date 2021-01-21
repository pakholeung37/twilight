import { action, makeObservable, observable } from "mobx"
import { assign } from "../../utils"
import { ShapeModel, ShapeModelInterface } from "./ShapeModel"

export interface RectModelInterface extends ShapeModelInterface {
  width: number
  height: number
  name: string
  fill: string
}
export class RectModel extends ShapeModel implements RectModelInterface {
  @observable width: number = 40
  @observable height: number = 40
  @observable fill: string = "#ffff00"
  @observable name: string = "rect"

  constructor(options: Partial<RectModelInterface>) {
    super(options)
    makeObservable(this)
    assign(this, options)
  }
}
