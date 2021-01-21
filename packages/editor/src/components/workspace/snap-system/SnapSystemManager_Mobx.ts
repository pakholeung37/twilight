import Konva from "konva"
import { GuideLineModel } from "../../../store/model"

export type Node = Konva.Node

export interface SnapOptions {
  tolerance: number
}

export class SnapSystemManager {
  private shapeSet: Set<Node> = new Set()
  private guideLinesH: GuideLineModel[] = []
  private guideLinesV: GuideLineModel[] = []
  private options: SnapOptions

  constructor(options?: Partial<SnapOptions>) {
    const defaultOPtions = {
      tolerance: 4,
    }
    this.options = {
      ...defaultOPtions,
      ...options
    }
  }

  addNode(node:Node) {
    this.shapeSet.add(node)
  }

  removeNode(node: Node) {
    if(this.shapeSet.has(node)) {
      this.shapeSet.delete(node)
    }
  }


}
