import React, { useCallback, useEffect, useRef } from "react"
import { Box } from "@chakra-ui/react"

const Pointer: React.FC = () => {
  return (
    <Box
      position="absolute"
      top="100px"
      left="100px"
      width="4px"
      height="4px"
      boxShadow="rgb(255, 255, 255) 0px 0px 0px 1.5px, rgba(0, 0, 0, 0.3) 0px 0px 1px 1px inset, rgba(0, 0, 0, 0.4) 0px 0px 1px 2px"
      borderRadius="50%"
      transform="translate(-2px, -2px)"
    ></Box>
  )
}

export const Saturation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  // useRef() will return a mutableRefObject, which current can assign
  const rectCache = useRef<DOMRect>()
  useEffect(() => {})
  const handleMouseUp = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // const { offsetX, offsetY } = e.nativeEvent
    // console.log(offsetX, offsetY)
    if (rectCache.current) {
      // console.log(calculatePosition(e, rectCache.current))
    }
  }, [])
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetX, offsetY } = e.nativeEvent
    console.log(offsetX, offsetY)
  }, [])

  const handleMouseDown = useCallback(() => {
    rectCache.current = containerRef.current?.getClientRects()[0]
  }, [])
  return (
    <Box
      ref={containerRef}
      h="150px"
      w="200px"
      position="relative"
      background="#ff0000"
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
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
      <Pointer />
    </Box>
  )
}

export const calculatePosition = (
  e: React.MouseEvent<HTMLDivElement>,
  container: DOMRect,
) => {
  const { width: containerWidth, height: containerHeight } = container
  const x = e.pageX
  const y = e.pageY
  let left = x - (container.left + window.pageXOffset)
  let top = y - (container.top + window.pageYOffset)

  if (left < 0) {
    left = 0
  } else if (left > containerWidth) {
    left = containerWidth
  }

  if (top < 0) {
    top = 0
  } else if (top > containerHeight) {
    top = containerHeight
  }

  // const saturation = left / containerWidth
  // const bright = 1 - top / containerHeight
  return { left, top }
}
