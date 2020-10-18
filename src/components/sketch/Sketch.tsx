import React, { useRef, useEffect } from "react"
import { Box } from "@chakra-ui/core"
import { useSketch } from "libs/sketch"

interface SketchProps {
  width?: number
  height?: number
}

const Sketch: React.FC<SketchProps> = ({ width, height }) => {
  const sketchRef = useRef<HTMLDivElement>(null)
  const [, setActiveSketch] = useSketch("main", sketchRef)
  useEffect(() => {
    setActiveSketch("main")
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
