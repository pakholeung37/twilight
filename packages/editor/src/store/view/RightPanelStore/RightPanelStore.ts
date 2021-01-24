import { observable, makeObservable, action } from "mobx"

export class RightPanelStore {
  @observable stylePadExpand: boolean = false
  constructor() {
    makeObservable(this)
  }
  @action setStylePadExpand = (status: boolean) => {
    this.stylePadExpand = status
  }
}
