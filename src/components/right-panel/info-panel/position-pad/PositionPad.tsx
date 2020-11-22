import React from "react"
import { Box, SimpleGrid } from "@chakra-ui/react"
import { useRecoilState } from "recoil"
import { shapeAtom } from "states"
import NumberInput from "./NumberInput"

const PositionPad = () => {
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
    <Box borderBottom="1px" px="15px" py="15px">
      <SimpleGrid columns={2} spacing={3}>
        <NumberInput value={x} onChange={handleChangeX} suffix="X" />
        <NumberInput value={y} onChange={handleChangeY} suffix="Y" />
        <NumberInput value={width} onChange={handleChangeW} suffix="W" />
        <NumberInput value={height} onChange={handleChangeH} suffix="H" />
      </SimpleGrid>
    </Box>
  )
}

export default PositionPad
