import React, { useRef, useEffect, useCallback, useState } from "react"
import { Box } from "@chakra-ui/react"
import Konva from "konva"
import { Snapshot, useRecoilState, useRecoilValue } from "recoil"
import { Stage, Layer, Rect, Text } from "libs/sketch"
import {
  getShapeAtomWithId,
  shapeAtom,
  shapeIdsAtom,
  shapesAtom,
  ShapeFactory,
} from "states/shapeState"
import { KonvaEventObject } from "konva/types/Node"
import { throttle } from "lodash"

interface SketchProps {
  width?: number
  height?: number
}

const Sketch: React.FC<SketchProps> = ({ width, height }) => {
  const [shapeState, setShapeState] = useRecoilState(shapeAtom)
  const [shapesState, setShapesState] = useRecoilState(shapesAtom)

  useEffect(() => {
    // 创建id 为 0 ~ 10 的对象
    for (let id = 0; id < 10; id++) {
      setShapesState(last => [...last, ShapeFactory.get()])
    }
  }, [setShapesState])

  const handleDragMove = useCallback(
    id =>
      throttle(({ target }: KonvaEventObject<DragEvent>) => {
        const { x, y } = target.attrs
        setShapesState(last => {
          const newShape = {
            ...last[id],
            x,
            y,
          }
          return [...last.slice(0, id), newShape, ...last.slice(id + 1)]
        })
        // setShapeState(last => ({
        //   ...last,
        //   x,
        //   y,
        // }))
      }, 40),
    [setShapesState],
  )

  return (
    <Box bg="white" boxShadow="sm">
      <Stage width={width || 800} height={height || 600}>
        <Layer>
          {shapesState.map((shapeProp, index) => {
            return (
              <Rect
                {...shapeProp}
                draggable
                onDragMove={handleDragMove(index)}
                key={index}
              />
            )
          })}
        </Layer>
      </Stage>
    </Box>
  )
}

export default Sketch
