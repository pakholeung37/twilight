import { Box } from "@chakra-ui/react"
import React from "react"

export const CheckBoard: React.FC = () => {
  return (
    <Box
      w="6"
      h="6"
      rounded="100%"
      overflow="hidden"
      background={`url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==")`}
      boxShadow="0 0 0px 1px rgba(0,0,0, 0.4)"
    >
      <Box h="100%" w="100%" background="#ff0000"></Box>
    </Box>
  )
}
