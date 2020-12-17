import React from "react"
// TODO 这个依赖需要去掉
import Konva from "konva"

type GuideLine = { start?: number; end?: number; position: number }
export class SnapSystemManager {
  private shapeSet: Set<Konva.Node> = new Set()
  private guideLineH: GuideLine[] = []
  private guideLineV: GuideLine[] = []
  public constructor() {}
  protected addNode(node: Konva.Node) {
    this.shapeSet.add(node)
  }
  protected removeNode(node: Konva.Node) {
    if (this.shapeSet.has(node)) {
      this.shapeSet.delete(node)
    }
  }

  protected freeze() {
    this.shapeSet.forEach(shape => {
      const box = shape.getClientRect()
      this.guideLineV.push(
        ...[
          { start: box.y, end: box.y + box.height, position: box.x },
          {
            start: box.y,
            end: box.y + box.height,
            position: box.x + box.width / 2,
          },
          {
            start: box.y,
            end: box.y + box.height,
            position: box.x + box.width,
          },
        ],
      )
      this.guideLineH.push(
        ...[
          { start: box.x, end: box.x + box.width, position: box.y },
          {
            start: box.x,
            end: box.x + box.width,
            position: box.y + box.height / 2,
          },
          {
            start: box.x,
            end: box.x + box.width,
            position: box.y + box.height,
          },
        ],
      )
    })
    this.guideLineH.sort((a, b) => a.position - b.position)
    this.guideLineV.sort((a, b) => a.position - b.position)
  }
}

export const snapSystemManager = new SnapSystemManager()
export const SnapSystem: React.FC = () => {
  return <div></div>
}
