import { action, makeObservable, observable, computed } from "mobx"
import { assign } from "../utils"
import { ShapeModel, shapeFactory, ShapeCreator } from "../model"
import { TreeProps } from "../../components/tree/Tree"
interface SketchStoreOptions {
  width?: number
  height?: number
}
export class SketchStore {
  @observable width: number = 375
  @observable height: number = 625
  @observable shapes: ShapeModel[] = []
  @observable selectedShape: ShapeModel | null = null

  @computed get shapeTreeData(): TreeProps {
    return {
      treeData: this.shapes.map(shape => ({
        title: shape.name,
        active: shape === this.selectedShape,
        key: shape.id
      })),
    }
  }

  constructor(options: SketchStoreOptions) {
    makeObservable(this)
    assign(this, options)
  }

  @action setSelectedShape = (shapeModel: ShapeModel | null) => {
    this.selectedShape = shapeModel
  }

  @action addShape = (options: ShapeCreator) => {
    this.shapes.push(shapeFactory.get(options))
  }

  @action removeShape = (shapeModel: ShapeModel) => {
    this.shapes = this.shapes.filter(shape => shape !== shapeModel)
  }
}
