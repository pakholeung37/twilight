import React from "react"
import { Box } from "@chakra-ui/react"

export const Pointer: React.FC<{ x: number; y: number }> = ({
  x = 0,
  y = 0,
}) => {
  return (
    <Box
      position="absolute"
      width="6px"
      height="6px"
      boxShadow="rgb(255, 255, 255) 0px 0px 0px 2px,
       rgba(0, 0, 0, 0.3) 0px 0px 1px 1px inset,
       rgba(0, 0, 0, 0.4) 0px 0px 2px 3px"
      borderRadius="50%"
      transform="translate(-3px, -3px)"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    ></Box>
  )
}
