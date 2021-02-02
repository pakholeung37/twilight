import React, { useCallback, useState } from "react"
import { Box, SimpleGrid, Text, Flex, IconButton } from "@chakra-ui/react"
import { CgEditFlipH, CgEditFlipV } from "react-icons/cg"
import { NumberInput } from "../../../number-input"
import { observer } from "mobx-react-lite"
import { useRootStore } from "../../../../store"

const Suffix: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Text
      pr="1"
      w="4"
      color="textbase"
      fontSize="xs"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
    >
      {text}
    </Text>
  )
}

const InputX = observer(function InputX() {
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
const InputY = observer(function InputY() {
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

const InputWidth = observer(function InputWidth() {
  const {
    sketchStore: { selectedShape },
  } = useRootStore()

  const handleChangeWidth = useCallback((_, num) => {}, [])

  return (
    <Flex>
      <Suffix text="W" />
      <NumberInput
        isDisabled={!selectedShape}
        value={(selectedShape?.width || 0).toFixed(2)}
        onChange={handleChangeWidth}
        suffix="px"
        precision={2}
        pr="5"
      />
    </Flex>
  )
})

const InputHeight = observer(function InputHeight() {
  const {
    sketchStore: { selectedShape },
  } = useRootStore()

  const handleChangeHeight = useCallback((_, num) => {}, [])

  return (
    <Flex>
      <Suffix text="H" />
      <NumberInput
        isDisabled={!selectedShape}
        value={(selectedShape?.height || 0).toFixed(2)}
        onChange={handleChangeHeight}
        suffix="px"
        precision={2}
        pr="5"
      />
    </Flex>
  )
})

const InputRotation = observer(function InputRotation() {
  const {
    sketchStore: { selectedShape },
  } = useRootStore()

  const handleChangeRotation = useCallback((_, num) => {}, [])

  return (
    <Flex>
      <Suffix text="R" />
      <NumberInput
        isDisabled={!selectedShape}
        value={(selectedShape?.rotation || 0).toFixed(1)}
        onChange={handleChangeRotation}
        suffix="°"
      />
    </Flex>
  )
})

const FlipH = observer(function FlipH() {
  const [value, set] = useState(false)
  const {
    sketchStore: { selectedShape },
  } = useRootStore()
  return (
    <IconButton
      isDisabled={!selectedShape}
      aria-label="flip-h"
      variant={value ? "solid" : "outline"}
      colorScheme="twilight"
      icon={<CgEditFlipH />}
      h={6}
      w={10}
      borderColor="border"
      onClick={() => set(!value)}
    ></IconButton>
  )
})

const FlipV = observer(function FlipV() {
  const [value, set] = useState(false)
  const {
    sketchStore: { selectedShape },
  } = useRootStore()
  return (
    <IconButton
      isDisabled={!selectedShape}
      aria-label="flip-v"
      variant={value ? "solid" : "outline"}
      colorScheme="twilight"
      icon={<CgEditFlipV />}
      h={6}
      w={10}
      borderColor="border"
      onClick={() => set(!value)}
    ></IconButton>
  )
})
const PositionPad: React.FC = () => {
  return (
    <Box px="12px" py="12px">
      <SimpleGrid columns={2} spacing={3}>
        <InputX />
        <InputY />
        <InputWidth />
        <InputHeight />
        <InputRotation />
        <Flex justify="space-between" pl="4">
          <FlipH />
          <FlipV />
        </Flex>
      </SimpleGrid>
    </Box>
  )
}

export default observer(PositionPad)
