import React, { useEffect, useCallback } from "react"
import { Box } from "@chakra-ui/react"
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilValue,
} from "recoil"
import { Stage, Layer } from "@twilight/react-konva"
import { shapeIdsAtom } from "../../states/shapeState"
import SketchShape from "./SketchShape"
import Portal from "./Portal"

interface SketchProps {
  width?: number
  height?: number
}

const Sketch: React.FC<SketchProps> = ({ width, height }) => {
  const shapeIds = useRecoilValue(shapeIdsAtom)
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE()

  return (
    <Box bg="white" boxShadow="base">
      <Stage width={width || 375} height={height || 625}>
        <RecoilBridge>
          <Layer>
            {shapeIds.map(id => (
              <SketchShape id={id} key={id} />
            ))}
            {/* <SketchShape id={0} /> */}
          </Layer>
        </RecoilBridge>
      </Stage>
    </Box>
  )
}

export default Sketch
