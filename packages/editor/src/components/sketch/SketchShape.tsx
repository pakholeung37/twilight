import React, { useCallback, useState } from "react"
import { useRecoilState } from "recoil"
import { shapeManager, selectedShapeIdAtom } from "../../states"
import { KonvaEventObject } from "konva/types/Node"
import { useThrottleFn } from "ahooks"
import { Rect, Circle, Ellipse, Transformer } from "@twilight/react-konva"
import { useTheme } from "@chakra-ui/react"

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
  const [controledState, setControledState] = useState({ x: 10, y: 10 })
  const [isDragging, setIsDragging] = useState(false)
  const [selectedId, setSelectedShapeId] = useRecoilState(selectedShapeIdAtom)

  // handleDrag
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
    { wait: 80 },
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
  // transformer
  const isSelected = selectedId === id
  const shapeRef = React.useRef<any>(null)
  const trRef = React.useRef<any>(null)

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      if (!trRef.current) throw new Error("transformer's dom not found")
      trRef.current.nodes([shapeRef.current])
    }
  }, [isSelected])

  // theming
  const theme = useTheme()

  const ShapeComponent: any = Shape[shapeState.type]
  return (
    <>
      <ShapeComponent
        {...shapeState}
        ref={shapeRef}
        strokeScaleEnabled={false}
        x={isDragging ? controledState.x : shapeState.x}
        y={isDragging ? controledState.y : shapeState.y}
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
          anchorCornerRadius={1}
          borderStroke="#bcc1ce"
          rotateEnabled={false}
          ignoreStroke={true}
        />
      )}
    </>
  )
}

export default SketchShape
