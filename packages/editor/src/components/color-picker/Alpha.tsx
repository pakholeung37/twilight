import React, { memo, useCallback, useEffect, useRef, useState } from "react"
import { Box } from "@chakra-ui/react"
import { calculatePosition } from "./utils"
import { Pointer } from "./Pointer"
import {
  compileColor,
  HSV,
  hsvToHsl,
  transparentBgUrl,
} from "../../utils/color"
import { observer } from "mobx-react-lite"

const renderWindow = window
interface AlphaPorps {
  hsv: HSV
  alpha: number
  onChange?: (alpha: number) => void
}

export const Alpha: React.FC<AlphaPorps> = observer(function Alpha({
  hsv,
  alpha,
  onChange,
}) {
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
    if (!rectCache.current && containerRef.current) {
      rectCache.current = containerRef.current.getClientRects()[0]
    }
    if (rectCache.current) {
      const width = rectCache.current.width
      setX((alpha / 100) * (width - 6) + 3)
    }
  }, [setX, alpha])

  const handleChange = useCallback(
    (e: MouseEvent) => {
      if (rectCache.current) {
        const result = calculatePosition(e, rectCache.current)
        const alpha = Math.round((result.left / rectCache.current.width) * 100)
        onChange && onChange(alpha)
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

  const hsl = hsvToHsl(hsv)
  return (
    <Box
      ref={containerRef}
      h="8px"
      w="100%"
      rounded="4px"
      boxShadow="0 0 0px 1px rgba(0,0,0, 0.4)"
      position="relative"
      background={`
        url("${transparentBgUrl}") left center
      `}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <Box
        w="100%"
        h="100%"
        style={{
          background: `
            linear-gradient(
              to right,
              ${compileColor.hsl([...hsl, 0])},
              ${compileColor.hsl([...hsl, 1])}
            )
          `,
        }}
      ></Box>
      <Pointer x={x} y={3.5} />
    </Box>
  )
})
