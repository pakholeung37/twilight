import { atom, RecoilState } from "recoil"
import { ShapeState, ShapeFactory } from "./shapeState"

let id = 1
export class ShapeManager {
  private static shapeMap = new Map<number, RecoilState<ShapeState>>()
  public static get(id: number) {
    const shapeAtom = this.shapeMap.get(id)
    if (!shapeAtom) throw new Error(`no atom with id: ${id}`)
    return shapeAtom
  }
  public static add({ type, ...args }: Partial<ShapeState>) {
    this.shapeMap.set(
      id,
      atom<ShapeState>({
        key: `shape-${id}`,
        default: ShapeFactory.get({ type, ...args }),
      }),
    )
    return id++
  }
  public static delete(id: number) {
    this.shapeMap.delete(id)
  }
}
