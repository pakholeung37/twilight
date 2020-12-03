import { throttle, memoize } from "lodash"
import { memo } from "react"
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

/**
 * recoil在极端computed selector时因为每次返回不一样的reference导致没意义的更新
 * 使得只获取a part of properties of atom不可能.因为atom change始终会触发selector get函数
 * 而get函数返回一个新的对象, 并不能简单通过reference equal check阻止re-render
 *
 * 现通过一个极端的memorize函数先缓解该问题
 *
 * https://github.com/facebookexperimental/Recoil/issues/314
 *
 */
const JSONMemorize = memoize((data: string) => ({
  ...JSON.parse(data)
}))
export const shapeTreeNeedSelector = selectorFamily<{ title: string, active: boolean, key: string }, number>({
  key: "shape-tree-need",
  get: (id) => ({ get }) => {
    const shape = get(shapeManager.get(id))
    const selectedShapeId = get(selectedShapeIdAtom)
    const data = {
      title: shape.name,
      active: !!shape.id && (+shape.id === selectedShapeId),
      key: shape.id as string
    }
    return JSONMemorize(JSON.stringify(data))
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
    const shapesIds = get(shapeIdsAtom)
    const treeData = shapesIds.map((id) => get(shapeTreeNeedSelector(id)))
    console.log("recreate: "+ shapesIds)
    return JSONMemorize(JSON.stringify({ treeData }))
  }
})

