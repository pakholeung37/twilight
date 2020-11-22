import React, { useEffect, useCallback } from "react"
import { Box } from "@chakra-ui/react"
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilState,
} from "recoil"
import { throttle } from "lodash"
import { Stage, Layer } from "libs/sketch"
import { shapeAtom, shapesAtom, ShapeFactory } from "states/shapeState"
import SketchShape from "./SketchShape"

interface SketchProps {
  width?: number
  height?: number
}

const Sketch: React.FC<SketchProps> = ({ width, height }) => {
  // const [shapeState, setShapeState] = useRecoilState(shapeAtom)
  // const [shapesState, setShapesState] = useRecoilState(shapesAtom)
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE()

  // useEffect(() => {
  //   // 创建id 为 0 ~ 10 的对象
  //   for (let id = 0; id < 10; id++) {
  //     setShapesState(last => [...last, ShapeFactory.get()])
  //   }
  // }, [setShapesState])

  return (
    <Box bg="white" boxShadow="base">
      <Stage width={width || 375} height={height || 625}>
        <RecoilBridge>
          <Layer>
            {/* {shapesState.map((shapeProp, index) => {
            return (
              <Rect
                {...shapeProp}
                draggable
                // onDragMove={handleDragMove(index)}
                key={index}
              />
            )
          })} */}
            <SketchShape id={0} />
          </Layer>
        </RecoilBridge>
      </Stage>
    </Box>
  )
}

export default Sketch
