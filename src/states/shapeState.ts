import { atom, selector } from "recoil"
import { memoize } from "lodash"

interface shapeProps {
  width: number
  height: number
  x: number
  y: number
  label: string
  fill: string
}
export class ShapeFactory {
  public static get(args?: shapeProps) {
    return {
      width: 40,
      height: 40,
      x: 10,
      y: 10,
      label: "Recoil",
      fill: "#ff0000",
      ...args,
    }
  }
}
export const shapeAtom = atom<shapeProps>({
  key: "shape-0",
  default: ShapeFactory.get(),
})

export const getShapeAtomWithId = memoize((id: number) => {
  return atom<shapeProps>({
    key: `shape-${id}`,
    default: ShapeFactory.get(),
  })
})

export const shapeIdsAtom = atom<number[]>({
  key: "shapeIds",
  default: [],
})

export const shapesAtom = atom<shapeProps[]>({
  key: "shapes",
  default: [],
})
