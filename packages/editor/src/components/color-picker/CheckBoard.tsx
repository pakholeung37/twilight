import { Box } from "@chakra-ui/react"
import { HSV } from "color-convert/conversions"
import React from "react"
import { compileColor, hsvToHsl, transparentBgUrl } from "../../utils"

export interface CheckBoardProps {
  hsv: HSV
  alpha: number
}

export const CheckBoard: React.FC<CheckBoardProps> = ({ hsv, alpha }) => {
  return (
    <Box
      w="6"
      h="6"
      rounded="100%"
      overflow="hidden"
      background={`url("${transparentBgUrl}")`}
      boxShadow="0 0 0px 1px rgba(0,0,0, 0.4)"
    >
      <Box
        h="100%"
        w="100%"
        style={{
          background: compileColor.hsl([...hsvToHsl(hsv), alpha / 100]),
        }}
      ></Box>
    </Box>
  )
}
