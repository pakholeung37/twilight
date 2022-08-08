import Konva from "konva"
import { uniqueId } from "lodash"
import { action, computed, makeObservable, observable } from "mobx"
import { ShapeType } from "./def"
import {
  compileColor,
  HSL,
  hslToHsv,
  HSV,
  hsvToHsl,
  parseColor,
  rgbToHsv,
} from "../../../utils/color"

export interface ShapeModelOptions {
  x?: number
  y?: number
  name?: string
  fill?: string
}

class Color {
  @observable hsv: HSV
  @observable alpha: number
  constructor(hsv: HSV, alpha: number) {
    makeObservable(this)
    this.hsv = hsv
    this.alpha = alpha
  }
  @action setHsv(hsv: HSV) {
    this.hsv[0] = hsv[0]
    this.hsv[1] = hsv[1]
    this.hsv[2] = hsv[2]
  }

  @action setAlpha(alpha: number) {
    this.alpha = alpha
  }
}
export abstract class ShapeModel {
  readonly id: string = uniqueId()
  abstract readonly type: ShapeType
  @observable x: number = 0
  @observable y: number = 0
  @observable width: number = 0
  @observable height: number = 0
  @observable visible: boolean = true
  @observable rotation: number = 0
  @observable name: string = ""
  @observable fillColor: Color = new Color([0, 0, 0], 0)

  ref: Konva.Node | null = null
  setRef = (ref: Konva.Node | null) => {
    this.ref = ref
  }

  @computed get _x() {
    return this.x
  }

  set _x(v) {
    this.x = v
  }

  @computed get _y() {
    return this.y
  }

  set _y(v) {
    this.y = v
  }

  @action setPosition = ({
    x,
    y,
    _x,
    _y,
  }: {
    x?: number
    y?: number
    _x?: number
    _y?: number
  }) => {
    if (x !== undefined) this.x = x
    if (y !== undefined) this.y = y
    if (_x !== undefined) this._x = _x
    if (_y !== undefined) this._y = _y
  }

  @computed get fill() {
    return compileColor.hsl([
      ...hsvToHsl(this.fillColor.hsv),
      this.fillColor.alpha / 100,
    ])
  }

  set fill(cs: string) {
    let value = parseColor.hsl(cs)
    if (value) {
      this.setFillColor(hslToHsv(value.slice(0, 3) as HSL), value[3] * 100)
      return
    }
    value = parseColor.rgb(cs)
    if (value) {
      this.setFillColor(
        rgbToHsv([value[0], value[1], value[2]]),
        value[3] * 100,
      )
      return
    }
    if (!value) throw new Error(`parse color: ${cs} failed`)
  }

  @action setFillColor(hsv: HSV, alpha: number) {
    this.fillColor.setHsv(hsv)
    this.fillColor.setAlpha(alpha)
  }
}
