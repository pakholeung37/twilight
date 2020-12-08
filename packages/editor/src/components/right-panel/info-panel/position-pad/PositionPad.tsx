import React, { useCallback, useMemo } from "react"
import { Box, SimpleGrid } from "@chakra-ui/react"
import { useRecoilState, useRecoilValue } from "recoil"
import { selectedShapeIdAtom, shapeManager } from "../../../../states"
import NumberInput from "./NumberInput"

const useCreateHandleChange = function (key: string, set: any) {
  const handleChange = useCallback(
    (_: string, num: number) => {
      _ === "" && (num = 0)
      return set((last: any) => ({
        ...last,
        [key]: num,
      }))
    },
    [key, set],
  )

  return handleChange
}

const PositionPad = () => {
  const selectedShapeId = useRecoilValue(selectedShapeIdAtom)

  const [
    { x = "", y = "", width = "", height = "" },
    setShapeState,
  ] = useRecoilState(shapeManager.get(selectedShapeId))

  const handleChangeX = useCreateHandleChange("x", setShapeState)
  const handleChangeY = useCreateHandleChange("y", setShapeState)
  const handleChangeW = useCreateHandleChange("width", setShapeState)
  const handleChangeH = useCreateHandleChange("height", setShapeState)

  return (
    <Box borderBottom="1px" px="15px" py="15px">
      <SimpleGrid columns={2} spacing={3}>
        <NumberInput
          isDisabled={!selectedShapeId}
          value={(+x).toFixed(2)}
          onChange={handleChangeX}
          suffix="X"
        />
        <NumberInput
          isDisabled={!selectedShapeId}
          value={(+y).toFixed(2)}
          onChange={handleChangeY}
          suffix="Y"
        />
        {/* <NumberInput
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
        /> */}
      </SimpleGrid>
    </Box>
  )
}

export default PositionPad
