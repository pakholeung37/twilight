import React from "react"
import { Rect } from "@twilight/react-konva"
import SketchShape from "./SketchShape_Mobx"
import { useRootStore } from "../../store"
import { observer } from "mobx-react-lite"

interface SketchProps {
  width?: number
  height?: number
}

const Sketch: React.FC<SketchProps> = () => {
  const {
    sketchStore: { width, height, shapes },
  } = useRootStore()
  return (
    <>
      {/* background */}
      <Rect fill="#fff" width={width} height={height} />
      {shapes.map(shape => (
        <SketchShape shapeModel={shape} key={shape.id} />
      ))}
    </>
  )
}

export default observer(Sketch)
