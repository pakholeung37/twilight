import React, { useCallback, useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { ShapeManager, selectedShapeIdAtom } from "states"
import { KonvaEventObject } from "konva/types/Node"
import { useThrottleFn } from "ahooks"
import { Rect, Circle } from "libs/sketch"

const Shape = {
  Rect: Rect,
  Circle: Circle,
}

interface SketchShapeProps {
  id: number
}

const SketchShape: React.FC<SketchShapeProps> = ({ id }) => {
  const [shapeState, setShapeState] = useRecoilState(ShapeManager.get(id))
  const [controledState, setControledState] = useState({ x: 10, y: 10 })
  const [isDragging, setIsDragging] = useState(false)
  const setSelectedShapeId = useSetRecoilState(selectedShapeIdAtom)

  const handleClick = useCallback(() => {
    setSelectedShapeId(id)
  }, [id, setSelectedShapeId])

  const handleDragStart = useCallback(() => {
    setIsDragging(true)
    setSelectedShapeId(id)
  }, [id, setSelectedShapeId])

  const { run: handleDragMove } = useThrottleFn<
    ({ target }: KonvaEventObject<DragEvent>) => void
  >(
    ({ target }) => {
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
  const ShapeCompoenet: any = Shape[shapeState.type]
  return (
    <ShapeCompoenet
      {...shapeState}
      width={shapeState.width}
      height={shapeState.height}
      x={isDragging ? controledState.x : shapeState.x}
      y={isDragging ? controledState.y : shapeState.y}
      draggable
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
    />
  )
}

export default SketchShape
