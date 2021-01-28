import React, { memo, useCallback, useEffect, useRef, useState } from "react"
import { Box } from "@chakra-ui/react"
import { calculatePosition } from "./utils"
import { Pointer } from "./Pointer"

const renderWindow = window
interface HuePorps {
  value: number
  onChange?: (hue: number) => void
}

export const Hue: React.FC<HuePorps> = memo(function Hue({ onChange, value }) {
  const containerRef = useRef<HTMLDivElement>(null)
  // useRef() will return a mutableRefObject, which current can assign
  const rectCache = useRef<DOMRect>()
  useEffect(() => {
    if (containerRef.current) {
      rectCache.current = containerRef.current.getClientRects()[0]
    }
  }, [])
  // 将value映射到margin为3的方框中, 可以将pointer框定在box中
  const [x, setX] = useState(3)

  useEffect(() => {
    if (rectCache.current) {
      const width = rectCache.current.width
      setX((value / 360) * (width - 6) + 3)
    }
  }, [setX, value])

  const handleChange = useCallback(
    (e: MouseEvent) => {
      if (rectCache.current) {
        const result = calculatePosition(e, rectCache.current)
        const hue = Math.round((result.left / rectCache.current.width) * 360)
        onChange && onChange(hue)
      }
    },
    [onChange],
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
      <Pointer x={x} y={3.5} />
    </Box>
  )
})
