import React, { useRef, useEffect } from "react"
import { Box } from "@chakra-ui/core"
import {
  Stage,
  Layer,
  Ellipse,
  Star,
  Line,
  ImageBuilder,
  Wedge,
  Text,
} from "libs/sketch"

interface SketchProps {
  width?: number
  height?: number
}

const Sketch: React.FC<SketchProps> = ({ width, height }) => {
  const sketchRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const sketch = sketchRef.current
    if (sketch) {
      const stage = new Stage({
        container: sketch,
        width: 800,
        height: 600,
      })

      const layer = new Layer()
      const circle = new Text({
        x: stage.width() / 2,
        y: 15,
        text: "Simple Text",
        fontSize: 30,
        fontFamily: "Calibri",
        fill: "green",
      })
      layer.add(circle)

      stage.add(layer)

      layer.draw()
      console.log(circle.toJSON())
    }
  })
  return (
    <Box
      bg="white"
      w={width || 800}
      h={height || 600}
      boxShadow="sm"
      ref={sketchRef}
    ></Box>
  )
}

export default Sketch
