import { atom } from "recoil"

export const selectedShapeIdAtom = atom<number>({
  key: "selected-shape-id",
  default: 0,
})

export const shapeIdsAtom = atom<number[]>({
  key: "shape-ids",
  default: [],
})
