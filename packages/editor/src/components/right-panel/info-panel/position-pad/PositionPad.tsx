import React, { useCallback } from "react"
import { Box, SimpleGrid, Text, Flex } from "@chakra-ui/react"
import { NumberInput } from "../../../number-input"
import { observer } from "mobx-react-lite"
import { useRootStore } from "../../../../store"

const Suffix: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Text
      pr="1"
      color="textbase"
      fontSize="xs"
      height="100%"
      display="flex"
      alignItems="center"
    >
      {text}
    </Text>
  )
}

const PostionInputX = observer(function PostionInputX() {
  const {
    sketchStore: { selectedShape },
  } = useRootStore()
  const handleChangeX = useCallback(
    (_, num) => selectedShape?.setPosition({ x: num, y: selectedShape.y }),
    [selectedShape],
  )

  return (
    <Flex>
      <Suffix text="X" />
      <NumberInput
        isDisabled={!selectedShape}
        value={(selectedShape?.x || 0).toFixed(2)}
        onChange={handleChangeX}
        suffix="px"
        precision={2}
        pr="5"
      />
    </Flex>
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
    <Flex>
      <Suffix text="Y" />
      <NumberInput
        isDisabled={!selectedShape}
        value={(selectedShape?.y || 0).toFixed(2)}
        onChange={handleChangeY}
        suffix="px"
        precision={2}
        pr="5"
      />
    </Flex>
  )
})

const PositionPad: React.FC = () => {
  return (
    <Box px="12px" py="12px">
      <SimpleGrid columns={2} spacing={3}>
        <PostionInputX />
        <PostionInputY />
      </SimpleGrid>
    </Box>
  )
}

export default observer(PositionPad)
