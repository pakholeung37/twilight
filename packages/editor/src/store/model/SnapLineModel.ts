import { action, makeObservable, observable } from "mobx"
import { assign } from "../utils"

interface SnapLineInterface {
  start: number
  end: number
  offset: number
  direction: "vertical" | "horizontal"
  place: "start" | "center" | "end"
}
export class SnapLineModel {
  @observable direction: "vertical" | "horizontal" = "vertical"
  @observable start: number = 0
  @observable end: number = 0
  @observable offset: number = -1000
  @observable place: "start" | "center" | "end" = "start"

  constructor(options?: Partial<SnapLineInterface>) {
    makeObservable(this)
    options && assign<SnapLineInterface>(this, options)
  }

  @action update(options: Partial<SnapLineInterface>) {
    assign<SnapLineInterface>(this, options)
  }
}
