import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { KonvaEventObject } from "konva/types/Node"
import { useDebounceFn } from "ahooks"
import { Rect, Circle, Ellipse, Transformer } from "@twilight/react-konva"
import Konva from "konva"
import { snapSystemManager, useGuideLine } from "../workspace/snap-system"
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
  } = useRootStore()
  /**
   * handle drag
   *
   */
  const [, setIsDragging] = useState(false)
  const handleClick = useCallback(() => {
    setSelectedShape(shapeModel)
  }, [shapeModel, setSelectedShape])

  const handleDragStart = useCallback(() => {
    setIsDragging(true)
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
      setIsDragging(false)
    },
    [shapeModel],
  )
  /**
   * transformer
   *
   */
  const isSelected = shapeModel === selectedShape
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
  // const { setGuideLineH, setGuideLineV } = useGuideLine()
  // useEffect(() => {
  //   if (!shapeRef.current) throw new Error("node not found")
  //   const node = shapeRef.current
  //   snapSystemManager.addNode(node)
  //   return () => {
  //     snapSystemManager.removeNode(node)
  //   }
  // })

  // const dragStartForSnap = useCallback(() => {
  //   if (shapeRef.current) {
  //     snapSystemManager.freezeGuideLines({
  //       filter: node => node === shapeRef.current,
  //     })
  //   }
  // }, [])

  // const dragEndForSnap = useCallback(() => {
  //   if (shapeRef.current) {
  //     snapSystemManager.cleanGuideLines()
  //   }
  // }, [])

  // const dragBoundFunc = useCallback(
  //   ({ x, y }: { x: number; y: number }) => {
  //     if (shapeRef.current) {
  //       const [
  //         guideLineH,
  //         guideLineV,
  //       ] = snapSystemManager.computedGuideLines(shapeRef.current, { x, y })
  //       setGuideLineH(guideLineH)
  //       setGuideLineV(guideLineV)
  //     }
  //     return { x, y }
  //   },
  //   [setGuideLineH, setGuideLineV],
  // )
  // // 组装 drag 方法
  // const composeDragStart = useCompose(handleDragStart, dragStartForSnap)
  // const composeDragEnd = useCompose(handleDragEnd, dragEndForSnap)

  // 动态获取shape组件

  const ShapeComponent: any = useMemo(
    () => getShapeComponent(shapeModel.type),
    [shapeModel.type],
  )
  return (
    <>
      <ShapeComponent
        {...shapeModel}
        ref={shapeRef}
        strokeScaleEnabled={false}
        // x={isDragging ? 0 : shapeState.x}
        // y={isDragging ? 0 : shapeState.y}
        draggable
        onClick={handleClick}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        // dragBoundFunc={dragBoundFunc}
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
