import { shapeIdsAtom, shapeManager, NodeType } from "../../states"
import { useSetRecoilState } from "recoil"

export const useAddShape = () => {
  const setShapeIds = useSetRecoilState(shapeIdsAtom)

  const addShape = (type: NodeType) => {
    const id = shapeManager.add({ type })
    setShapeIds(shapeIds => [...shapeIds, id])
  }

  return addShape
}