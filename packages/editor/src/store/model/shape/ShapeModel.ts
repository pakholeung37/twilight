import { uniqueId } from "lodash"
import { makeObservable, observable } from "mobx"
import { assign } from "../../utils"

export interface ShapeModelInterface {
  x: number
  y: number
}
export class ShapeModel implements ShapeModelInterface {
  @observable id: string = uniqueId()
  @observable x: number = 0
  @observable y: number = 0
  constructor(options: Partial<ShapeModelInterface>) {
    makeObservable(this)
    assign(this, options)
  }
}
