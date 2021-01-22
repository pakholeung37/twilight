import { makeObservable, observable } from "mobx"
import { assign } from "../utils"
import { ShapeModel } from "../model"

interface SketchStoreInterface {
  width: number
  height: number
  shapes: ShapeModel[]
}
export class SketchStore implements SketchStoreInterface {
  @observable width: number = 375
  @observable height: number = 625
  @observable shapes: ShapeModel[] = []

  constructor(options: Partial<SketchStoreInterface>) {
    makeObservable(this)
    assign(this, options)
  }
}
