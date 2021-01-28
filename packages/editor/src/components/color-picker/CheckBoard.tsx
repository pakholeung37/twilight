import { Box } from "@chakra-ui/react"
import { RGB } from "color-convert/conversions"
import React from "react"

export interface CheckBoardProps {
  rgb: RGB
  alpha: number
}

export const CheckBoard: React.FC<CheckBoardProps> = ({ rgb, alpha }) => {
  return (
    <Box
      w="6"
      h="6"
      rounded="100%"
      overflow="hidden"
      background={`url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==")`}
      boxShadow="0 0 0px 1px rgba(0,0,0, 0.4)"
    >
      <Box
        h="100%"
        w="100%"
        style={{
          background: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha / 100})`,
        }}
      ></Box>
    </Box>
  )
}
