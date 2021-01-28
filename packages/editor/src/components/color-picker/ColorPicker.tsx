import { Box, Flex, VStack } from "@chakra-ui/react"
import React, { useCallback } from "react"
import { Alpha } from "./Alpha"
import { Hue } from "./Hue"
import { Saturation } from "./Saturation"
import { InputField } from "./InputField"
import { CheckBoard } from "./CheckBoard"
import { HSV, RGB } from "color-convert/conversions"
import { hsvToRgb } from "./utils"

export interface ColorPickerProps {
  onChange?: (color: RGB) => void
  // value给定时，该组件为可受控组件
  rgb?: RGB
  alpha?: number
}
export const ColorPicker: React.FC<ColorPickerProps> = ({
  onChange,
  alpha = 100,
  rgb = [255, 0, 0],
}) => {
  const handleSaturationChange = useCallback(
    (color: HSV) => {
      console.log("hsv: ", color)
      onChange && onChange(hsvToRgb(color))
    },
    [onChange],
  )
  const handleAlphaChange = useCallback((alpha: number) => {
    console.log("alpha: ", alpha)
  }, [])
  const handleHueChange = useCallback((hue: number) => {
    console.log("hue: ", hue)
  }, [])

  return (
    <VStack width="200px" spacing={2}>
      <Saturation onChange={handleSaturationChange} value={[0, 100, 100]} />
      <Flex height="6" w="100%">
        <Flex w="100%" direction="column" justify="space-between" my="1px">
          <Hue value={rgb[0]} onChange={handleHueChange} />
          <Alpha value={alpha} onChange={handleAlphaChange} />
        </Flex>
        <Box height="100%" ml="2">
          <CheckBoard />
        </Box>
      </Flex>
      <InputField />
    </VStack>
  )
}
