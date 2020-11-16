import React, { useRef, useEffect } from "react"
import { Box } from "@chakra-ui/react"
import Konva from "konva"
import { Stage, Layer, Rect, Text } from "libs/sketch"

interface SketchProps {
  width?: number
  height?: number
}

class ColoredRect extends React.Component {
  state = {
    color: "green",
  }
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor(),
    })
  }
  render() {
    return (
      <Rect
        x={20}
        y={20}
        width={50}
        height={50}
        fill={this.state.color}
        shadowBlur={5}
        onClick={this.handleClick}
        draggable={true}
      />
    )
  }
}
const Sketch: React.FC<SketchProps> = ({ width, height }) => {
  return (
    <Box bg="white" boxShadow="sm">
      <Stage width={width || 800} height={height || 600}>
        <Layer>
          <Text text="Try click on rect" />
          <ColoredRect />
        </Layer>
      </Stage>
    </Box>
  )
}

export default Sketch
