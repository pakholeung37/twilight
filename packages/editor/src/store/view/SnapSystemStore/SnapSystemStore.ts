import { makeObservable, observable } from "mobx"
import { SnapLineModel, ShapeModel } from "../../model"
import RootStore from "../../RootStore"

export type SnapLine = { start?: number; end?: number; offset: number }

export class SnapSystemStore {
  readonly rootStore: RootStore
  toolerance = 4
  private reserveSnapLinesV: SnapLine[] = []
  private reserveSnapLinesH: SnapLine[] = []

  @observable snapLineV: SnapLineModel = new SnapLineModel({
    direction: "vertical",
  })
  @observable snapLineH: SnapLineModel = new SnapLineModel({
    direction: "horizontal",
  })
  @observable isSnapping = false

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeObservable(this)
  }

  snapStart = (target: ShapeModel) => {
    const { shapes } = this.rootStore.sketchStore
    // 构造所有可能的对齐线
    shapes.forEach(shape => {
      if (shape === target) return
      const node = shape.ref
      if (!node) {
        console.warn(`shape ${shape.name} have not a ref.`)
        return
      }
      const { x, y, width, height } = node.getClientRect()
      this.reserveSnapLinesV.push(
        { start: y, end: y + height, offset: x },
        { start: y, end: y + height, offset: x + width / 2 },
        { start: y, end: y + height, offset: x + width },
      )
      this.reserveSnapLinesH.push(
        { start: x, end: x + width, offset: y },
        { start: x, end: x + width, offset: y + height / 2 },
        { start: x, end: x + width, offset: y + height },
      )
      this.reserveSnapLinesV.sort((a, b) => a.offset - b.offset)
      this.reserveSnapLinesH.sort((a, b) => a.offset - b.offset)
    })
  }

  snapMove = (target: ShapeModel) => {
    const node = target.ref
    if (!node) {
      console.warn(`shape ${target.name} have not a ref.`)
      return
    }
    const { x, y, width, height } = node.getClientRect()
    const reserveSnapLinesH: SnapLine[] = [
      { start: x, end: x + width, offset: y },
      { start: x, end: x + width, offset: y + height / 2 },
      { start: x, end: x + width, offset: y + height },
    ]
    const reserveSnapLinesV: SnapLine[] = [
      { start: y, end: y + height, offset: x },
      { start: y, end: y + height, offset: x + width / 2 },
      { start: y, end: y + height, offset: x + width },
    ]

    let resultV: SnapLine | null = null
    this.reserveSnapLinesV.some(snapLine => {
      for (let i = 0; i < reserveSnapLinesV.length; i++) {
        if (
          Math.abs(reserveSnapLinesV[i].offset - snapLine.offset) <
          this.toolerance
        ) {
          resultV = snapLine
          return true
        }
      }
      return false
    })

    let resultH: SnapLine | null = null
    this.reserveSnapLinesH.some(snapLine => {
      for (let i = 0; i < reserveSnapLinesH.length; i++) {
        if (
          Math.abs(reserveSnapLinesH[i].offset - snapLine.offset) <
          this.toolerance
        ) {
          resultH = snapLine
          return true
        }
      }
      return false
    })

    this.setSnapLineV(resultV)
    this.setSnapLineH(resultH)
  }

  snapEnd = () => {
    this.reserveSnapLinesH = []
    this.reserveSnapLinesV = []
    this.snapLineV.update({ offset: -1000 })
    this.snapLineH.update({ offset: -1000 })
  }

  setSnapLineV = (options: SnapLine | null) => {
    if (options) {
      this.snapLineV.update(options)
    } else {
      this.snapLineV.update({ offset: -1000 })
    }
  }
  setSnapLineH = (options: SnapLine | null) => {
    if (options) {
      this.snapLineH.update(options)
    } else {
      this.snapLineH.update({ offset: -1000 })
    }
  }
}
