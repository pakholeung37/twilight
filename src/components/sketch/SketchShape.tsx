import React, { useCallback, useState } from "react"
import { useRecoilState } from "recoil"
import { shapeAtom } from "states"
import { throttle } from "lodash"
import { KonvaEventObject } from "konva/types/Node"
import { useThrottleFn } from "ahooks"
import { Rect } from "libs/sketch"
const SketchShape = ({ id }: any) => {
  const [shapeState, setShapeState] = useRecoilState(shapeAtom)
  const [controledState, setControledState] = useState({ x: 10, y: 10 })
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = useCallback(() => {
    setIsDragging(true)
  }, [setIsDragging])

  const { run: handleDragMove } = useThrottleFn(
    ({ target }: KonvaEventObject<DragEvent>) => {
      const { x, y } = target.attrs
      setShapeState(last => ({
        ...last,
        x,
        y,
      }))
    },
    {
      wait: 40,
    },
  )

  const handleDragEnd = useCallback(
    ({ target }: KonvaEventObject<DragEvent>) => {
      const { x, y } = target.attrs
      setShapeState(last => ({
        ...last,
        x,
        y,
      }))
      setControledState({
        x,
        y,
      })
      setIsDragging(false)
    },
    [setShapeState, setControledState, setIsDragging],
  )
  return (
    <Rect
      fill={"red"}
      width={shapeState.width}
      height={shapeState.height}
      x={isDragging ? controledState.x : shapeState.x}
      y={isDragging ? controledState.y : shapeState.y}
      draggable
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
    />
  )
}

export default SketchShape
