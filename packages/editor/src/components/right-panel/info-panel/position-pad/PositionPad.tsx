import React, { useCallback, useMemo } from "react"
import { Box, SimpleGrid } from "@chakra-ui/react"
import { useRecoilState, useRecoilValue } from "recoil"
import { selectedShapeIdAtom, shapeManager } from "../../../../states"
import NumberInput from "./NumberInput"
import { observer } from "mobx-react-lite"
import { useRootStore } from "../../../../store"

// const useCreateHandleChange = function (key: string, set: any) {
//   const handleChange = useCallback(
//     (_: string, num: number) => {
//       _ === "" && (num = 0)
//       return set((last: any) => ({
//         ...last,
//         [key]: num,
//       }))
//     },
//     [key, set],
//   )

//   return handleChange
// }
const PostionInputX = observer(function PostionInputX() {
  const {
    sketchStore: { selectedShape },
  } = useRootStore()
  const handleChangeX = useCallback(
    (_, num) => selectedShape?.setPosition({ x: num, y: selectedShape.y }),
    [selectedShape],
  )

  return (
    <NumberInput
      isDisabled={!selectedShape}
      value={(selectedShape?.x || 0).toFixed(2)}
      onChange={handleChangeX}
      suffix="X"
    />
  )
})
const PostionInputY = observer(function PostionInputX() {
  const {
    sketchStore: { selectedShape },
  } = useRootStore()

  const handleChangeY = useCallback(
    (_, num) => selectedShape?.setPosition({ x: selectedShape.x, y: num }),
    [selectedShape],
  )

  return (
    <NumberInput
      isDisabled={!selectedShape}
      value={(selectedShape?.y || 0).toFixed(2)}
      onChange={handleChangeY}
      suffix="Y"
    />
  )
})

const PositionPad: React.FC = () => {
  // const handleChangeW = useCreateHandleChange("width", setShapeState)
  // const handleChangeH = useCreateHandleChange("height", setShapeState)

  return (
    <Box borderBottom="1px" px="15px" py="15px">
      <SimpleGrid columns={2} spacing={3}>
        <PostionInputX />
        <PostionInputY />

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

export default observer(PositionPad)
