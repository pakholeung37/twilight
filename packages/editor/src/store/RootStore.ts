import { SketchStore } from "./view/SketchStore"

export default class RootStore {
  sketchStore: SketchStore
  constructor() {
    this.sketchStore = new SketchStore({ width: 375, height: 625 })
  }
}
