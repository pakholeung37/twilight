import React, { useState } from "react"
import {
  Box,
  Flex,
  Divider,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react"
import { useRecoilValue } from "recoil"
import { shapeAtom } from "states"

const InfoPanel: React.FC = () => {
  const { x, y, width, height } = useRecoilValue(shapeAtom)
  return (
    <Flex h="100%" direction="column">
      <InputGroup>
        <Input value={x} readOnly />
        <InputRightAddon>X</InputRightAddon>
      </InputGroup>
      <InputGroup>
        <Input value={y} readOnly />
        <InputRightAddon>Y</InputRightAddon>
      </InputGroup>
      <InputGroup>
        <Input value={height} readOnly />
        <InputRightAddon>W</InputRightAddon>
      </InputGroup>
      <InputGroup>
        <Input value={width} readOnly />
        <InputRightAddon>H</InputRightAddon>
      </InputGroup>
    </Flex>
  )
}

export default InfoPanel
