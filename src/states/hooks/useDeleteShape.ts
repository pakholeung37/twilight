import { shapeIdsAtom, ShapeManager } from "states"
import { useSetRecoilState } from "recoil"

export const useDeleteShape = () => {
  const setShapeIds = useSetRecoilState(shapeIdsAtom)

  const deleteShape = (deleteId: number) => {
    setShapeIds(shapeIds => shapeIds.filter(id => id !== deleteId))
    ShapeManager.delete(deleteId)
  }

  return deleteShape
}
