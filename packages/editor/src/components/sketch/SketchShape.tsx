import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { KonvaEventObject } from "konva/types/Node"
import { useDebounceFn } from "ahooks"
import { Rect, Circle, Ellipse, Transformer } from "@twilight/react-konva"
import Konva from "konva"
import { useCompose } from "../../hooks"
import { ShapeModel, ShapeType } from "../../store/model"
import { useRootStore } from "../../store"
import { observer } from "mobx-react-lite"

const ShapeComponent = {
  Rect,
  Circle,
  Ellipse,
}

function getShapeComponent(type: ShapeType) {
  if (type) {
    return ShapeComponent[type]
  } else {
    throw Error(`un acceptable shape Type ${type}`)
  }
}

const SketchShape: React.FC<{ shapeModel: ShapeModel }> = ({ shapeModel }) => {
  const {
    sketchStore: { selectedShape, setSelectedShape },
    snapSystemStore: { snapStart, snapMove, snapEnd },
  } = useRootStore()
  /**
   * handle drag
   *
   */
  const handleClick = useCallback(
    evt => {
      evt.cancelBubble = true
      setSelectedShape(shapeModel)
    },
    [shapeModel, setSelectedShape],
  )

  const handleDragStart = useCallback(() => {
    setSelectedShape(shapeModel)
  }, [setSelectedShape, shapeModel])

  const { run: handleDragMove } = useDebounceFn<
    ({ target }: KonvaEventObject<DragEvent>) => void
  >(
    ({ target }) => {
      const { x, y } = target.attrs
      shapeModel.setPosition({ x, y })
    },
    { wait: 4 },
  )

  const handleDragEnd = useCallback(
    ({ target }: KonvaEventObject<DragEvent>) => {
      const { x, y } = target.attrs
      shapeModel.setPosition({ x, y })
    },
    [shapeModel],
  )

  const isSelected = shapeModel === selectedShape
  const shapeRef = useRef<Konva.Node>(null)
  const trRef = useRef<Konva.Transformer>(null)

  /**
   * create binding with node and shapeModel
   *
   */
  useEffect(() => {
    if (shapeRef.current) {
      shapeModel.setRef(shapeRef.current)
      console.log(shapeModel)
    }
    return () => shapeModel.setRef(null)
  }, [shapeModel])

  /**
   * transformer
   *
   */
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

  const dragStartForSnap = useCallback(() => {
    snapStart(shapeModel)
  }, [snapStart, shapeModel])

  const dragEndForSnap = useCallback(() => {
    snapEnd()
  }, [snapEnd])

  const dragBoundFunc = useCallback(
    ({ x, y }: { x: number; y: number }) => {
      if (shapeRef.current) {
        //         const position = shapeRef.current.getAbsolutePosition()
        //         const clientRect = shapeRef.current.getClientRect()
        //         console.log(`absolutePosition: ${JSON.stringify(position)}
        // clientRect: ${JSON.stringify(clientRect)}
        // x, y: ${x}, ${y}`)
      }
      snapMove(shapeModel)
      return { x, y }
    },
    [snapMove, shapeModel],
  )
  // 组装 drag 方法
  const composeDragStart = useCompose(handleDragStart, dragStartForSnap)
  const composeDragEnd = useCompose(handleDragEnd, dragEndForSnap)

  // 动态获取shape组件

  const ShapeComponent: any = useMemo(
    () => getShapeComponent(shapeModel.type),
    [shapeModel.type],
  )
  return (
    <>
      <ShapeComponent
        {...shapeModel}
        fill={shapeModel.fill}
        ref={shapeRef}
        strokeScaleEnabled={false}
        // x={isDragging ? 0 : shapeState.x}
        // y={isDragging ? 0 : shapeState.y}
        draggable
        onClick={handleClick}
        onDragStart={composeDragStart}
        onDragMove={handleDragMove}
        onDragEnd={composeDragEnd}
        dragBoundFunc={dragBoundFunc}
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

export default observer(SketchShape)
