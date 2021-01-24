import Konva from "konva"
import { uniqueId } from "lodash"
import { action, observable } from "mobx"
import { assign } from "../../utils"
import {ShapeType} from "./def"
export interface ShapeModelOptions {
  x?: number
  y?: number
  name?: string
}
export abstract class ShapeModel {
  readonly id: string = uniqueId()
  abstract readonly type: ShapeType
  @observable x: number = 0
  @observable y: number = 0
  @observable name: string = ""

  ref: Konva.Node | null = null

  @action setPosition = ({ x, y }: { x: number, y: number }) => {
    this.x = x
    this.y = y
  }

  setRef = (ref: Konva.Node | null) => {
    this.ref = ref
  }
}
