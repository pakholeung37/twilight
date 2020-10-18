import { RefObject, useEffect } from "react"
import { atom, useRecoilState } from "recoil"
import { Layer, Stage } from "./index"

const activeSketchState = atom({
  key: "activeSketchState",
  default: "",
})

const stages: { [key: string]: InstanceType<typeof Stage> } = Object.create(
  null,
)

let howMany = 0
export function useSketch(name?: string, target?: RefObject<HTMLDivElement>) {
  const [activeSketchKey, setActiveSketchKey] = useRecoilState<string>(
    activeSketchState,
  )

  useEffect(() => {
    if (target && target.current && name) {
      console.log(++howMany)
      const stage = new Stage({
        container: target.current,
        width: 800,
        height: 600,
      })
      stage.add(new Layer())
      stages[name] = stage
      setActiveSketchKey(name)
    } else {
      console.warn("parameter name must be given.")
    }
  }, [])

  return [stages[name || activeSketchKey], setActiveSketchKey] as const
}
