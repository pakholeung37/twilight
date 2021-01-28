import React, { useCallback, useRef, useState } from "react"
import { Box } from "@chakra-ui/react"
import { useThrottleFn } from "ahooks"
import { calculatePosition } from "./utils"
import { Pointer } from "./Pointer"
import { HSV } from "color-convert/conversions"

const renderWindow = window

interface SaturationProps {
  onChange?: (color: HSV) => void
  value: HSV
}

export const Saturation: React.FC<SaturationProps> = ({ onChange, value }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  // useRef() will return a mutableRefObject, which current can assign
  const rectCache = useRef<DOMRect>()
  const [pointerPosition, setPointerPosition] = useState({ x: 50, y: 50 })

  const { run: setPositionThrottle } = useThrottleFn(
    (value: { x: number; y: number }) => {
      setPointerPosition(value)
    },
    { wait: 0 },
  )
  const handleChange = useCallback(
    (e: MouseEvent) => {
      if (rectCache.current) {
        const result = calculatePosition(e, rectCache.current)
        console.log(calculatePosition(e, rectCache.current))
        setPositionThrottle({ x: result.left, y: result.top })
        const {
          width: containerWidth,
          height: containerHeight,
        } = rectCache.current
        const saturation = (result.left / containerWidth) * 100
        const bright = (1 - result.top / containerHeight) * 100

        onChange && onChange([value[0], saturation, bright])
      }
    },
    [setPositionThrottle, onChange, value],
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
      h="150px"
      w="100%"
      position="relative"
      overflow="hidden"
      background="#ff0000"
      rounded="4px"
      boxShadow="0 0 0px 1px rgba(0,0,0, 0.4)"
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <Box
        w="100%"
        h="100%"
        position="absolute"
        background="linear-gradient(to right, #fff, rgba(255, 255, 255, 0));"
      ></Box>
      <Box
        w="100%"
        h="100%"
        position="absolute"
        background="linear-gradient(to top, #000, rgba(0, 0, 0, 0));"
      ></Box>
      <Pointer {...pointerPosition} />
    </Box>
  )
}
