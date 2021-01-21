import { action, makeObservable, observable } from "mobx"
import { assign } from "../utils"

interface GuideLineInterface {
  start: number
  end: number
  offset: number
  orientation: "vertical" | "horizontal"
  place: "start" | "center" | "end"
}
export class GuideLineModel implements GuideLineInterface {
  @observable start: number = 0
  @observable end: number = 0
  @observable offset: number = 0
  @observable orientation: "vertical" | "horizontal" = "vertical"
  @observable place: "start" | "center" | "end" = "start"

  @action update() {}
  constructor(options: Partial<GuideLineInterface>) {
    makeObservable(this)
    assign<GuideLineInterface>(this, options)
  }
}
