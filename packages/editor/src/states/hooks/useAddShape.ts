import { shapeIdsAtom, shapeManager, ShapeOptions } from "../../states"
import { useSetRecoilState } from "recoil"

export const useAddShape = () => {
  const setShapeIds = useSetRecoilState(shapeIdsAtom)

  const addShape = (options: ShapeOptions) => {
    const id = shapeManager.add(options)
    setShapeIds(shapeIds => [...shapeIds, id])
  }

  return addShape
}
