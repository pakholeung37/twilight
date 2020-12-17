// TODO 这个依赖需要去掉
import Konva from "konva"

type Node = Konva.Node
type GuideLine = { start?: number; end?: number; position: number }
export class SnapSystemManager {
  private shapeSet: Set<Node> = new Set()
  private guideLineH: GuideLine[] = []
  private guideLineV: GuideLine[] = []
  private targetNode: Node | null = null
  public constructor() {}
  public addNode(node: Node) {
    this.shapeSet.add(node)
  }
  public removeNode(node: Node) {
    if (this.shapeSet.has(node)) {
      this.shapeSet.delete(node)
    }
  }

  public computedGuideLines({
    target,
    filter,
  }: {
    target: Node
    filter?: (node: Node) => boolean
  }) {
    this.shapeSet.forEach(shape => {
      if (filter?.(shape)) return
      if (shape === target) {
        this.targetNode = shape
        return
      }
      const box = shape.getClientRect()
      this.guideLineV.push(
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
      )
      this.guideLineH.push(
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
      )
    })
    this.guideLineH.sort((a, b) => a.position - b.position)
    this.guideLineV.sort((a, b) => a.position - b.position)

    console.log(this.guideLineH, this.guideLineV)
  }

  public cleanGuideLines() {
    this.guideLineH = []
    this.guideLineV = []
  }
}
