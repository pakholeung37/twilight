import { action, makeObservable, observable } from "mobx"
import { assign } from "../utils"
import { ShapeModel, shapeFactory, ShapeCreator } from "../model"
interface SketchStoreInterface {
  width: number
  height: number
  shapes: ShapeModel[]
}
export class SketchStore implements SketchStoreInterface {
  @observable width: number = 375
  @observable height: number = 625
  @observable shapes: ShapeModel[] = []
  @observable selectedShape: ShapeModel | null = null

  constructor(options: Partial<SketchStoreInterface>) {
    makeObservable(this)
    assign(this, options)
  }

  @action setSelectedShape = (shapeModel: ShapeModel | null) => {
    this.selectedShape = shapeModel
  }

  @action.bound addShape = (options: ShapeCreator) => {
    this.shapes.push(shapeFactory.get(options))
  }
}
