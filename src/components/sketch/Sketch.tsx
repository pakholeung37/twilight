import React, { useRef, useEffect } from "react"
import { Box } from "@chakra-ui/core"
import { Stage, Layer, Circle, ImageBuilder } from "libs/sketch"

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

      layer.add(
        new Circle({
          x: stage.width() / 2,
          y: stage.height() / 2,
          radius: 70,
          fill: "red",
          stroke: "black",
          strokeWidth: 4,
        }),
      )

      stage.add(layer)

      layer.draw()
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
