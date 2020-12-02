import { throttle } from "lodash"
import { atom, GetRecoilValue, selector, selectorFamily } from "recoil"
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

export const shapeTreeNeedSelector = selectorFamily<{ title: string, active: boolean, key: string }, number>({
  key: "shape-tree-need",
  get: (id) => ({ get }) => {
    const shape = get(shapeManager.get(id))
    const selectedShapeId = get(selectedShapeIdAtom)
    return {
      title: shape.name,
      active: !!shape.id && (+shape.id === selectedShapeId),
      key: shape.id as string
    }
  }
})
// const throttleGet = throttle((get: GetRecoilValue) => {
//   console.log("recreate: "+ count)
//   const shapes = get(shapeSelector)
//   const selectedShape = get(selectedShapeSelector)

//   return {
//     treeData: shapes.map((shape, index) =>({
//       title: shape.name,
//       active: selectedShape === shape,
//       key: index
//     }))
//   }
// }, 200)

export const shapeTreeviewSelector = selector({
  key: "shapes-treeview",
  get: ({ get }) => {
    console.log("recreate: "+ count)
    // return throttleGet(get) || { treeData: [] }

    // const shapes = get(shapeSelector)
    // const selectedShape = get(selectedShapeSelector)

    // return {
    //   treeData: shapes.map((shape, index) =>({
    //     title: shape.label,
    //     active: selectedShape === shape,
    //     key: index
    //   }))
    // }

    const shapesId = get(shapeIdsAtom)
    const treeData = shapesId.map((id) => get(shapeTreeNeedSelector(id)))
    return {
      treeData
    }
  }
})
