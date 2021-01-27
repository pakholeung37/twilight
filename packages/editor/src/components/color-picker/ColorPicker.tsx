import { Box, Flex } from "@chakra-ui/react"
import React from "react"
import { Alpha } from "./Alpha"
import { Hue } from "./Hue"
import { Saturation } from "./Saturation"
import { InputField } from "./InputField"
import { CheckBoard } from "./CheckBoard"

export const ColorPicker: React.FC = () => {
  return (
    <Box width="200px">
      <Saturation />
      <Box mb="2"></Box>
      <Flex height="6">
        <Flex w="100%" direction="column" justify="space-between" my="1px">
          <Hue />
          <Alpha />
        </Flex>
        <Box ml="2" height="100%">
          <CheckBoard />
        </Box>
      </Flex>
      <Box mb="2"></Box>
      <InputField />
    </Box>
  )
}
