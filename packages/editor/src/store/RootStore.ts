import { action, makeObservable, observable } from "mobx"
import { SketchStore } from "./view/SketchStore"

export default class RootStore {
  @observable a = 3
  sketchStore: SketchStore
  constructor() {
    makeObservable(this)
    this.sketchStore = new SketchStore({ width: 375, height: 625 })
  }
}
