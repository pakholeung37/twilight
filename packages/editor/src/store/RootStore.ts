import { SketchStore } from "./view/SketchStore"
import { SnapSystemStore } from "./view/SnapSystemStore"
export default class RootStore {
  sketchStore: SketchStore
  snapSystemStore: SnapSystemStore
  constructor() {
    this.sketchStore = new SketchStore({ width: 375, height: 625 })
    this.snapSystemStore = new SnapSystemStore(this)
  }
}
