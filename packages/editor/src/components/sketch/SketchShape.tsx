import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRecoilState } from "recoil"
import { shapeManager, selectedShapeIdAtom } from "../../states"
import { KonvaEventObject } from "konva/types/Node"
import { useDebounceFn, useThrottleFn } from "ahooks"
import { Rect, Circle, Ellipse, Transformer } from "@twilight/react-konva"
import Konva from "konva"
import { snapSystemManager } from "../workspace/snap-system"
const Shape = {
  Rect,
  Circle,
  Ellipse,
}

interface SketchShapeProps {
  id: number
}

const SketchShape: React.FC<SketchShapeProps> = ({ id }) => {
  const [shapeState, setShapeState] = useRecoilState(shapeManager.get(id))
  const [selectedId, setSelectedShapeId] = useRecoilState(selectedShapeIdAtom)

  // handleDrag
  const [isDragging, setIsDragging] = useState(false)
  const handleClick = useCallback(
    e => {
      setSelectedShapeId(id)
    },
    [id, setSelectedShapeId],
  )

  const handleDragStart = useCallback(() => {
    setIsDragging(true)
    setSelectedShapeId(id)
  }, [id, setSelectedShapeId])

  const { run: handleDragMove } = useDebounceFn<
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
    { wait: 16 },
  )

  const handleDragEnd = useCallback(
    ({ target }: KonvaEventObject<DragEvent>) => {
      const { x, y } = target.attrs
      setShapeState(last => ({
        ...last,
        x,
        y,
      }))
      setIsDragging(false)
    },
    [setShapeState, setIsDragging],
  )
  // transformer
  const isSelected = selectedId === id
  const shapeRef = useRef<Konva.Node>(null)
  const trRef = useRef<Konva.Transformer>(null)

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      if (!trRef.current || !shapeRef.current)
        throw new Error("transformer's node or node not found")
      trRef.current.nodes([shapeRef.current])
    }
  }, [isSelected])

  // snap system
  useEffect(() => {
    if (!shapeRef.current) throw new Error("node not found")
    const node = shapeRef.current
    snapSystemManager.addNode(node)
    return () => {
      snapSystemManager.removeNode(node)
    }
  })

  const ShapeComponent: any = useMemo(() => Shape[shapeState.type], [
    shapeState.type,
  ])
  return (
    <>
      <ShapeComponent
        {...shapeState}
        ref={shapeRef}
        strokeScaleEnabled={false}
        // x={isDragging ? 0 : shapeState.x}
        // y={isDragging ? 0 : shapeState.y}
        draggable
        onClick={handleClick}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          anchorFill="#fff"
          anchorSize={6}
          anchorStroke="#828c97"
          anchorCornerRadius={0.8}
          borderStroke="#9a9da7"
          borderStrokeWidth={0.4}
          rotateEnabled={false}
          ignoreStroke={true}
        />
      )}
    </>
  )
}

export default SketchShape
