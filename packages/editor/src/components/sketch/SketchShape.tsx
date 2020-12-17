import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRecoilState } from "recoil"
import { shapeManager, selectedShapeIdAtom } from "../../states"
import { KonvaEventObject } from "konva/types/Node"
import { useDebounceFn } from "ahooks"
import { Rect, Circle, Ellipse, Transformer } from "@twilight/react-konva"
import Konva from "konva"
import { snapSystemManager, useGuideLine } from "../workspace/snap-system"
import { useCompose } from "../../hooks"

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

  /**
   * handle drag
   *
   */
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
  /**
   * transformer
   *
   */
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

  /**
   * snap system
   *
   */
  const { setGuideLineH, setGuideLineV } = useGuideLine()
  useEffect(() => {
    if (!shapeRef.current) throw new Error("node not found")
    const node = shapeRef.current
    snapSystemManager.addNode(node)
    return () => {
      snapSystemManager.removeNode(node)
    }
  })

  const dragStartForSnap = useCallback(() => {
    if (shapeRef.current) {
      snapSystemManager.computedGuideLines({ target: shapeRef.current })
    }
  }, [])

  const dragEndForSnap = useCallback(() => {
    if (shapeRef.current) {
      snapSystemManager.cleanGuideLines()
    }
  }, [])

  const dragBoundFunc = useCallback(({ x, y }: { x: number; y: number }) => {},
  [])
  // 组装 drag 方法
  const composeDragStart = useCompose(handleDragStart, dragStartForSnap)
  const composeDragEnd = useCompose(handleDragEnd, dragEndForSnap)

  // 动态获取shape组件
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
        onDragStart={composeDragStart}
        onDragMove={handleDragMove}
        onDragEnd={composeDragEnd}
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
