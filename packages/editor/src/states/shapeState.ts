import { memoize } from "lodash"
import { atom, selector, selectorFamily } from "recoil"
import { ShapeState } from "./ShapeFactory"
import { shapeManager } from "./ShapeManager"
import {produce} from "immer"
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
  },
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
type shapeTreeNeedState = { title: string, active: boolean, key: string }
// const stateCache = new Map<string, shapeTreeNeedState>()
// const getState = (id: string) => {
//   const state = stateCache.get(id)
//   if (state) return state

//   stateCache.set(id, { title: "", active: false, key: "" })
//   return stateCache.get(id)
// }
export const shapeTreeNeedSelector = selectorFamily<shapeTreeNeedState, number>({
  key: "shape-tree-need",
  get: memoize((id) => {
    let stateCache = { title: "", active: false, key: "" }
    return ({ get }) => {
    const shape = get(shapeManager.get(id))
    const selectedShapeId = get(selectedShapeIdAtom)
    const nextState = produce(stateCache, (lastState) => {
      lastState.title = shape.name
      lastState.active = !!shape.id && (+shape.id === selectedShapeId)
      lastState.key = shape.id as string
    })
    stateCache = nextState
    return nextState
  }})
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
    return { treeData }
  }
})

