import { SketchStore } from "./view/SketchStore"
import { SnapSystemStore } from "./view/SnapSystemStore"
import { LeftPanelStore } from "./view/LeftPanelStore"
import { RightPanelStore } from "./view/RightPanelStore"
export default class RootStore {
  sketchStore: SketchStore
  snapSystemStore: SnapSystemStore
  leftPanelStore: LeftPanelStore
  rightPanelStore: RightPanelStore

  constructor() {
    this.sketchStore = new SketchStore({ width: 375, height: 625 })
    this.snapSystemStore = new SnapSystemStore(this)
    this.leftPanelStore = new LeftPanelStore()
    this.rightPanelStore = new RightPanelStore()
  }
}
