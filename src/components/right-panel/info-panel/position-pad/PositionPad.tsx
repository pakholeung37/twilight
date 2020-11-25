import React from "react"
import { Box, SimpleGrid } from "@chakra-ui/react"
import { useRecoilState, useRecoilValue } from "recoil"
import { selectedShapeIdAtom, shapeManager } from "states"
import NumberInput from "./NumberInput"

const PositionPad = () => {
  const selectedShapeId = useRecoilValue(selectedShapeIdAtom)

  const [
    { x = "", y = "", width = "", height = "" },
    setShapeState,
  ] = useRecoilState(shapeManager.get(selectedShapeId))
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
    <Box borderBottom="1px" px="15px" py="15px">
      <SimpleGrid columns={2} spacing={3}>
        <NumberInput
          isDisabled={!selectedShapeId}
          value={x}
          onChange={handleChangeX}
          suffix="X"
        />
        <NumberInput
          isDisabled={!selectedShapeId}
          value={y}
          onChange={handleChangeY}
          suffix="Y"
        />
        <NumberInput
          isDisabled={!selectedShapeId}
          value={width}
          onChange={handleChangeW}
          suffix="W"
        />
        <NumberInput
          isDisabled={!selectedShapeId}
          value={height}
          onChange={handleChangeH}
          suffix="H"
        />
      </SimpleGrid>
    </Box>
  )
}

export default PositionPad
