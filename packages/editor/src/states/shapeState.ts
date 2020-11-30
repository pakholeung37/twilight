import { throttle } from "lodash"
import { atom, GetRecoilValue, selector } from "recoil"
import { ShapeState } from "./ShapeFactory"
import { shapeManager } from "./ShapeManager"

export const selectedShapeIdAtom = atom<number>({
  key: "selected-shape-id",
  default: 0,
})

export const shapeIdsAtom = atom<number[]>({
  key: "shape-ids",
  default: [],
})

export const selectedShapeSelector = selector<ShapeState>({
  key: "selected-shape",
  get: ({ get }) => {
    const selectedShapeId = get(selectedShapeIdAtom)
    const selectedShape = get(shapeManager.get(selectedShapeId))
    return selectedShape
  }
})

export const shapeSelector = selector<ShapeState[]>({
  key: "shapes",
  get: ({ get }) => {
    const shapeIds = get(shapeIdsAtom)
    const shapes = shapeIds.map((id) => get(shapeManager.get(id)))
    return shapes
  }
})
let count = 0

const throttleGet = throttle((get: GetRecoilValue) => {
  console.log("recreate: "+ count)
  const shapes = get(shapeSelector)
  const selectedShape = get(selectedShapeSelector)

  return {
    treeData: shapes.map((shape, index) =>({
      title: shape.label,
      active: selectedShape === shape,
      key: index
    }))
  }
}, 2000)

export const shapeTreeviewSelector = selector({
  key: "shapes-treeview",
  get: ({ get }) => {
    return throttleGet(get) || { treeData: [] }
  }
})
