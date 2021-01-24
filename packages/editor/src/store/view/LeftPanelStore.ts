import { observable, makeObservable, action } from "mobx"

export class LeftPanelStore {
  @observable activePanelIndex = 0
  constructor() {
    makeObservable(this)
  }

  @action activatePanel = (index: number) => {
    this.activePanelIndex = index
  }
}
