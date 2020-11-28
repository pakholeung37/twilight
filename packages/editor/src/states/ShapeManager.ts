import { atom, RecoilState } from "recoil"
import { ShapeState, ShapeMeta } from "./shapeState"

interface ShapeFactoryInterface {
  get(options: Partial<ShapeState>): ShapeState
}
export class ShapeFactory implements ShapeFactoryInterface {
  public get({ type, ...args }: Partial<ShapeState>): ShapeState {
    switch (type) {
      case "Circle":
        return {
          width: 50,
          height: 50,
          x: 10,
          y: 10,
          fill: "#ffff00",
          radius: 25,
          type,
          ...args,
        } as ShapeMeta<"Circle">
      case "Rect":
      default:
        return {
          width: 40,
          height: 40,
          x: 10,
          y: 10,
          fill: "#ffff00",
          type,
          ...args,
        } as ShapeMeta<"Rect">
    }
  }
}

let id = 1
export class ShapeManager {
  private shapeMap: Map<number, RecoilState<ShapeState>>
  private shapeFactory: ShapeFactoryInterface
  public constructor(shapeFactory: ShapeFactoryInterface) {
    this.shapeFactory = shapeFactory
    this.shapeMap = new Map<number, RecoilState<ShapeState>>()
  }
  public get(id: number) {
    const shapeAtom = this.shapeMap.get(id)
    if (!shapeAtom) throw new Error(`no atom with id: ${id}`)
    return shapeAtom
  }
  public add(options: Partial<ShapeState>, rewriteId?: number) {
    const inlineId = rewriteId !== undefined ? rewriteId : id++
    this.shapeMap.set(
      inlineId,
      atom<ShapeState>({
        key: `shape-${inlineId}`,
        default: this.shapeFactory.get(options),
      }),
    )
    return inlineId
  }
  public delete(id: number) {
    this.shapeMap.delete(id)
  }
}

export const shapeManager = new ShapeManager(new ShapeFactory())

shapeManager.add(
  {
    type: "Rect",
    width: undefined,
    height: undefined,
    x: undefined,
    y: undefined,
    fill: "#ffff00",
  },
  0,
)
