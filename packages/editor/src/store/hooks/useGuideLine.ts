import { GuideLineModel } from "../model"

const guideLineH = new GuideLineModel({})
const guideLineV = new GuideLineModel({})

export const useGuideLine = () => {
  return { guideLineH, guideLineV }
}
