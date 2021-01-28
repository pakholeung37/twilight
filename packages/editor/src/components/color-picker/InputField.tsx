import React, { useMemo } from "react"
import { Flex, HStack, Text } from "@chakra-ui/react"
import { Input } from "../input"
import { NumberInput } from "../number-input"
import { RGB } from "color-convert/conversions"
import { rgbToHex } from "./utils"

const Title: React.FC = ({ children }) => {
  return (
    <Text fontSize="xs" mt="1" userSelect="none">
      {children}
    </Text>
  )
}
export interface InputFieldProps {
  rgb: RGB
  alpha: number
}
export const InputField: React.FC<InputFieldProps> = ({ rgb, alpha }) => {
  const hex = rgbToHex(rgb)
  const [r, g, b] = rgb
  return (
    <HStack w="100%" spacing="1">
      <Flex
        w="16"
        flexShrink={0}
        justify="center"
        align="center"
        direction="column"
      >
        {useMemo(
          () => (
            <Input prefix="#" pl="3" value={hex} onChange={() => {}} />
          ),
          [hex],
        )}
        <Title>Hex</Title>
      </Flex>
      <Flex justify="center" align="center" direction="column">
        {useMemo(
          () => (
            <NumberInput
              max={255}
              min={0}
              value={r}
              onChange={() => {}}
              inputMode="numeric"
            />
          ),
          [r],
        )}
        <Title>R</Title>
      </Flex>
      <Flex justify="center" align="center" direction="column">
        {useMemo(
          () => (
            <NumberInput
              max={255}
              min={0}
              value={g}
              onChange={() => {}}
              inputMode="numeric"
            />
          ),
          [g],
        )}
        <Title>G</Title>
      </Flex>
      <Flex justify="center" align="center" direction="column">
        {useMemo(
          () => (
            <NumberInput
              max={255}
              min={0}
              value={b}
              onChange={() => {}}
              inputMode="numeric"
            />
          ),
          [b],
        )}
        <Title>B</Title>
      </Flex>
      <Flex justify="center" align="center" direction="column">
        {useMemo(
          () => (
            <NumberInput max={255} min={0} value={alpha} onChange={() => {}} />
          ),
          [alpha],
        )}
        <Title>Alpha</Title>
      </Flex>
    </HStack>
  )
}
