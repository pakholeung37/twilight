import { Box, Flex, VStack } from "@chakra-ui/react"
import React, { useCallback } from "react"
import { Alpha } from "./Alpha"
import { Hue } from "./Hue"
import { Saturation } from "./Saturation"
import { InputField } from "./InputField"
import { CheckBoard } from "./CheckBoard"
import { HSV, RGB } from "color-convert/conversions"
import { hsvToRgb, rgbToHsv } from "./utils"
import { useThrottleFn } from "ahooks"
import { isUndefined } from "lodash"

export interface ColorPickerProps {
  onChange?: (hsv: HSV, alpha: number) => void
  // value给定时，该组件为可受控组件
  hsv: HSV
  alpha?: number
}
export const ColorPicker: React.FC<ColorPickerProps> = ({
  onChange,
  alpha = 100,
  hsv,
}) => {
  const rgb = hsvToRgb(hsv)
  const [, s, v] = hsv
  const { run: handleChange } = useThrottleFn(
    (_hsv: HSV | undefined, _alpha: number | undefined) => {
      onChange &&
        onChange(
          isUndefined(_hsv) ? hsv : _hsv,
          isUndefined(_alpha) ? alpha : _alpha,
        )
    },
    { wait: 40 },
  )

  const handleSaturationChange = useCallback(
    (hsv: HSV) => {
      handleChange(hsv, undefined)
    },
    [handleChange],
  )
  const handleAlphaChange = useCallback(
    (alpha: number) => {
      handleChange(undefined, alpha)
    },
    [handleChange],
  )

  const handleHueChange = useCallback(
    (hue: number) => {
      handleChange([hue, s, v], undefined)
    },
    [handleChange, s, v],
  )

  const handleInputFieldChange = useCallback(
    (rgb?: RGB, alpha?: number) => {
      console.log(rgb, rgb && rgbToHsv(rgb))
      handleChange(rgb ? rgbToHsv(rgb) : undefined, alpha)
    },
    [handleChange],
  )

  return (
    <VStack width="210px" spacing={2}>
      <Saturation onChange={handleSaturationChange} hsv={hsv} />
      <Flex height="6" w="100%">
        <Flex w="100%" direction="column" justify="space-between" my="1px">
          <Hue value={hsv[0]} onChange={handleHueChange} />
          <Alpha value={alpha} onChange={handleAlphaChange} />
        </Flex>
        <Box height="100%" ml="2">
          <CheckBoard rgb={rgb} alpha={alpha} />
        </Box>
      </Flex>
      <InputField rgb={rgb} alpha={alpha} onChange={handleInputFieldChange} />
    </VStack>
  )
}
