import React, { useCallback } from "react"
import { Box, SimpleGrid } from "@chakra-ui/react"
import NumberInput from "./NumberInput"
import { observer } from "mobx-react-lite"
import { useRootStore } from "../../../../store"

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
  return (
    <Box borderBottom="1px" px="15px" py="15px">
      <SimpleGrid columns={2} spacing={3}>
        <PostionInputX />
        <PostionInputY />
      </SimpleGrid>
    </Box>
  )
}

export default observer(PositionPad)
