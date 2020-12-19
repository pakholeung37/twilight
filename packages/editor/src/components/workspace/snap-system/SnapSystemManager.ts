// TODO 这个依赖需要去掉
import Konva from "konva"

export type Node = Konva.Node
export type GuideLine = { start?: number; end?: number; offset: number }
export interface Options {
  tolerance: number
}
export class SnapSystemManager {
  private shapeSet: Set<Node> = new Set()
  private guideLineH: GuideLine[] = []
  private guideLineV: GuideLine[] = []
  private options: Options
  public constructor(options?: Partial<Options>) {
    const defaultOptions = {
      tolerance: 2,
    }
    this.options = {
      ...defaultOptions,
      ...options,
    }
  }
  public addNode(node: Node) {
    this.shapeSet.add(node)
  }
  public removeNode(node: Node) {
    if (this.shapeSet.has(node)) {
      this.shapeSet.delete(node)
    }
  }

  public freezeGuideLines({ filter }: { filter?: (node: Node) => boolean }) {
    this.shapeSet.forEach(shape => {
      if (filter?.(shape)) return
      const { x, y, width, height } = shape.getClientRect()
      this.guideLineV.push(
        { start: y, end: y + height, offset: x },
        { start: y, end: y + height, offset: x + width / 2 },
        { start: y, end: y + height, offset: x + width },
      )
      this.guideLineH.push(
        { start: x, end: x + width, offset: y },
        { start: x, end: x + width, offset: y + height / 2 },
        { start: x, end: x + width, offset: y + height },
      )
    })
    this.guideLineH.sort((a, b) => a.offset - b.offset)
    this.guideLineV.sort((a, b) => a.offset - b.offset)

    console.log(this.guideLineH, this.guideLineV)
  }

  public computedGuideLines(node: Node, { x, y }: { x: number, y: number }): [GuideLine | null, GuideLine | null] {
    const { width, height } = node.getClientRect()
    console.log(x, y)

    // 构造可对齐的线段
    const snapLineH: GuideLine[] = [
      { start: x, end: x + width, offset: y },
      { start: x, end: x + width, offset: y + height / 2 },
      { start: x, end: x + width, offset: y + height },
    ]

    const snapLineV: GuideLine[] = [
      { start: y, end: y + height, offset: x },
      { start: y, end: y + height, offset: x + width / 2 },
      { start: y, end: y + height, offset: x + width },
    ]

    const { tolerance } = this.options

    const guideLineH = this.guideLineH
    let resultH: GuideLine | null = null
    snapLineH.forEach(snapLine => {
      for (let i = 0; i < guideLineH.length; i++) {
        if (Math.abs(guideLineH[i].offset - snapLine.offset) < tolerance) {
          resultH = guideLineH[i]
          break
        }
      }
    })

    const guideLineV = this.guideLineV
    let resultV: GuideLine | null = null
    snapLineV.forEach(snapLine => {
      for (let i = 0; i < guideLineV.length; i++) {
        if (Math.abs(guideLineV[i].offset - snapLine.offset) < tolerance) {
          resultV = guideLineV[i]
          break
        }
      }
    })

    return [resultH, resultV]
  }
  public cleanGuideLines() {
    this.guideLineH = []
    this.guideLineV = []
  }
}
