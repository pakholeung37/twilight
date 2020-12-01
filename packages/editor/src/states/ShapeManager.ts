import { atom, RecoilState } from "recoil"
import { ShapeFactoryInterface, ShapeOptions, ShapeFactory, ShapeState } from "./ShapeFactory"

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
  public add(options: ShapeOptions, rewriteId?: number) {
    const inlineId = rewriteId !== undefined ? rewriteId : id++
    this.shapeMap.set(
      inlineId,
      atom<ShapeState>({
        key: `shape-${inlineId}`,
        default: { ...this.shapeFactory.get(options), id: ""+inlineId },
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
