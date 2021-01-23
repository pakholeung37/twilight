import { uniqueId } from "lodash"
import { action, makeObservable, observable } from "mobx"
import { assign } from "../../utils"
import {ShapeType} from "./def"
export interface ShapeModelOptions {
  type?: ShapeType
  x?: number
  y?: number
  name?: string
}
export class ShapeModel {
  id: string = uniqueId()
  type: ShapeType = ""
  @observable x: number = 0
  @observable y: number = 0
  @observable name: string = ""

  constructor(options: ShapeModelOptions) {
    makeObservable(this)
    assign(this, options)
  }

  @action setPosition = ({ x, y }: { x: number, y: number }) => {
    this.x = x
    this.y = y
  }
}
