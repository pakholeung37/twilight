import { useCallback, useEffect, useState } from "react"

type Origin = {
  clientX: number
  clientY: number
  metaKey?: boolean
  shiftKey?: boolean
}
type Position = { x: number; y: number }
interface MoveFunc {
  (opt: {
    status: "start" | "moving" | "end"
    isMoving: boolean
    offset: Position
    origin: Origin
  }): void
}
export function useMove(func: MoveFunc) {
  const [isMoving, setIsMoving] = useState(false)
  const [origin, setOrigin] = useState<Origin>({ clientX: 0, clientY: 0 })
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const callback = func

  const handleMouseDown = useCallback(
    ({ clientX, clientY, metaKey, shiftKey }: MouseEvent) => {
      const origin = { clientX, clientY, metaKey, shiftKey }
      setIsMoving(true)
      setOrigin(origin)
      callback({ status: "start", isMoving: true, origin, offset })
    },
    [callback, offset],
  )

  const handleMouseMove = useCallback(
    ({ clientX, clientY }: MouseEvent) => {
      if (!isMoving) {
        return
      }
      const offset = {
        x: clientX - origin.clientX,
        y: clientY - origin.clientY,
      }
      callback({ status: "moving", isMoving: true, origin, offset })
    },
    [callback, isMoving, origin],
  )
  const handleMouseUp = useCallback(() => {
    if (!isMoving) {
      return
    }
    setIsMoving(false)
    setOffset({ x: 0, y: 0 })
    callback({ status: "end", isMoving: false, origin, offset })
  }, [callback, isMoving, offset, origin])

  useEffect(() => {
    function addEventListeners() {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }
    function removeEventListeners() {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
    if (isMoving) {
      addEventListeners()
    } else {
      removeEventListeners()
    }

    return removeEventListeners
  }, [handleMouseMove, handleMouseUp, isMoving])

  return {
    onMouseDown: handleMouseDown,
  }
}
