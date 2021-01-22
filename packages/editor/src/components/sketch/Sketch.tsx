import React from "react"
import { useRecoilValue } from "recoil"
import { Rect } from "@twilight/react-konva"
import { shapeIdsAtom } from "../../states/shapeState"
import SketchShape from "./SketchShape"

interface SketchProps {
  width?: number
  height?: number
}

const Sketch: React.FC<SketchProps> = ({ width, height }) => {
  const shapeIds = useRecoilValue(shapeIdsAtom)
  return (
    <>
      {/* background */}
      <Rect fill="#fff" width={width} height={height} />
      {shapeIds.map(id => (
        <SketchShape id={id} key={id} />
      ))}
    </>
  )
}

export default Sketch
