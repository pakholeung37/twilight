import {atom, useRecoilState} from "recoil"
import { GuideLine } from "./SnapSystemManager"
const guideLineHAtom = atom<GuideLine | null>({
  key: "guide-line-h",
  default: null
})
const guideLineVAtom = atom<GuideLine | null>({
  key: "guide-line-v",
  default: null
})

export const useGuideLine = () => {
  const [guideLineH, setGuideLineH] = useRecoilState(guideLineHAtom)
  const [guideLineV, setGuideLineV] = useRecoilState(guideLineVAtom)

  return { guideLineH, guideLineV, setGuideLineH, setGuideLineV }
}
