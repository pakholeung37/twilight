import { shapeIdsAtom, shapeManager } from "../../states"
import { useSetRecoilState } from "recoil"

export const useDeleteShape = () => {
  const setShapeIds = useSetRecoilState(shapeIdsAtom)

  const deleteShape = (deleteId: number) => {
    setShapeIds(shapeIds => shapeIds.filter(id => id !== deleteId))
    shapeManager.delete(deleteId)
  }

  return deleteShape
}
