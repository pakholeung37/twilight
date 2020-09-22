import React from "react"
import { Box } from "@chakra-ui/core"

interface SketchProps {
  width?: number
  height?: number
}

const Sketch: React.FC<SketchProps> = ({ width, height }) => {
  return (
    <Box bg="white" w={width || 800} h={height || 600} boxShadow="sm"></Box>
  )
}

export default Sketch
