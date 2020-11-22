import React, { useState } from "react"
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react"
import { useRecoilState, useRecoilValue } from "recoil"
import { shapeAtom } from "states"

const InfoPanel: React.FC = () => {
  const [{ x, y, width, height }, setShapeState] = useRecoilState(shapeAtom)
  const createHandleChange = (key: string) => {
    return (_: string, num: number) => {
      if (isNaN(num)) num = 0
      setShapeState(last => ({
        ...last,
        [key]: num,
      }))
    }
  }
  const handleChangeX = createHandleChange("x")
  const handleChangeY = createHandleChange("y")
  const handleChangeW = createHandleChange("width")
  const handleChangeH = createHandleChange("height")

  return (
    <Box>
      <Box borderBottom="1px" px="15px" py="15px" fontSize="xs">
        <SimpleGrid columns={2} spacing={3}>
          <InputGroup>
            <NumberInput value={x} precision={2} onChange={handleChangeX}>
              <NumberInputField />
            </NumberInput>
            <InputRightAddon>X</InputRightAddon>
          </InputGroup>
          <InputGroup>
            <NumberInput value={y} precision={2} onChange={handleChangeY}>
              <NumberInputField />
            </NumberInput>
            <InputRightAddon>Y</InputRightAddon>
          </InputGroup>
          <InputGroup>
            <NumberInput value={width} precision={2} onChange={handleChangeW}>
              <NumberInputField />
            </NumberInput>
            <InputRightAddon>W</InputRightAddon>
          </InputGroup>
          <InputGroup>
            <NumberInput value={height} precision={2} onChange={handleChangeH}>
              <NumberInputField />
            </NumberInput>
            <InputRightAddon>H</InputRightAddon>
          </InputGroup>
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default InfoPanel
