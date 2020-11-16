import React, { useEffect } from "react"
import { Box, BoxProps } from "@chakra-ui/react"

import { useDrop } from "ahooks"

const DropZone: React.FC<
  BoxProps & {
    onHover?: (content: any) => void
    onDrop?: (content: any, event: React.DragEvent<Element> | undefined) => void
  }
> = ({ onHover, onDrop, ...args }) => {
  const [dropProps, { isHovering }] = useDrop({
    onDom(content, e) {
      onDrop?.(content, e)
      console.log(`custom dropped: `, content, e)
    },
  })
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("useTimeout")
      if (isHovering) {
        onHover?.(dropProps.onDragLeave)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [dropProps, isHovering, onHover])
  return (
    <Box w="100%" position="relative" {...args}>
      <Box
        className="drop-zone"
        {...dropProps}
        h="18px"
        w="100%"
        position="absolute"
        top="-7px"
      ></Box>
      <Box
        borderBottom="2px"
        borderColor={isHovering ? "twilight.500" : "transparent"}
        position="absolute"
        w="100%"
        pointerEvents="none"
        _after={{
          content: `""`,
          borderRadius: "4px",
          border: "4px",
          borderColor: isHovering ? "twilight.500" : "transparent",
          position: "absolute",
          top: "-3px",
        }}
      ></Box>
    </Box>
  )
}

export default DropZone
