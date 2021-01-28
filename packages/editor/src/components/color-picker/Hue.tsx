import React, { useCallback, useRef, useState } from "react"
import { Box } from "@chakra-ui/react"
import { useThrottleFn } from "ahooks"
import { calculatePosition } from "./utils"
import { Pointer } from "./Pointer"

const renderWindow = window
interface HuePorps {
  value: number
  onChange?: (hue: number) => void
}

export const Hue: React.FC<HuePorps> = ({ onChange }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  // useRef() will return a mutableRefObject, which current can assign
  const rectCache = useRef<DOMRect>()
  const [pointerPosition, setPointerPosition] = useState({ x: 3 })

  const { run: setPositionThrottle } = useThrottleFn(
    (value: { x: number; y: number }) => {
      // 将x映射到margin为3的方框中, 可以将pointer框定在box中
      if (containerRef.current) {
        const x =
          value.x *
            ((containerRef.current.clientWidth - 6) /
              containerRef.current.clientWidth) +
          3
        setPointerPosition({ x })
        onChange &&
          onChange(
            Math.round((value.x / containerRef.current.clientWidth) * 360),
          )
      }
    },
    { wait: 0 },
  )
  const handleChange = useCallback(
    (e: MouseEvent) => {
      if (rectCache.current) {
        const result = calculatePosition(e, rectCache.current)
        console.log(calculatePosition(e, rectCache.current))
        setPositionThrottle({ x: result.left, y: result.top })
      }
    },
    [setPositionThrottle],
  )

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      handleChange(e.nativeEvent)
    },
    [handleChange],
  )

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      renderWindow.removeEventListener("mousemove", handleChange)
      renderWindow.removeEventListener("mouseup", handleMouseUp)
    },
    [handleChange],
  )

  const handleMouseDown = useCallback(() => {
    rectCache.current = containerRef.current?.getClientRects()[0]
    renderWindow.addEventListener("mousemove", handleChange)
    renderWindow.addEventListener("mouseup", handleMouseUp)
  }, [handleChange, handleMouseUp])

  return (
    <Box
      ref={containerRef}
      h="8px"
      w="100%"
      rounded="4px"
      boxShadow="0 0 0px 1px rgba(0,0,0, 0.4)"
      position="relative"
      background="
        linear-gradient(to right,
           #f00 0%, #ff0 17%,
           #0f0 33%,
           #0ff 50%,
           #00f 67%,
           #f0f 83%,
           #f00 100%);"
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <Pointer {...pointerPosition} y={3.5} />
    </Box>
  )
}
