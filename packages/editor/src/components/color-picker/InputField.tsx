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
      {useMemo(
        () => (
          <Flex
            w="16"
            flexShrink={0}
            justify="center"
            align="center"
            direction="column"
          >
            <Input prefix="#" pl="3" value={hex} onChange={() => {}} />
            <Title>Hex</Title>
          </Flex>
        ),
        [hex],
      )}
      {useMemo(
        () => (
          <Flex justify="center" align="center" direction="column">
            <NumberInput
              max={255}
              min={0}
              value={r}
              onChange={() => {}}
              inputMode="numeric"
            />
            <Title>R</Title>
          </Flex>
        ),
        [r],
      )}
      {useMemo(
        () => (
          <Flex justify="center" align="center" direction="column">
            <NumberInput
              max={255}
              min={0}
              value={g}
              onChange={() => {}}
              inputMode="numeric"
            />
            <Title>G</Title>
          </Flex>
        ),
        [g],
      )}
      {useMemo(
        () => (
          <Flex justify="center" align="center" direction="column">
            <NumberInput
              max={255}
              min={0}
              value={b}
              onChange={() => {}}
              inputMode="numeric"
            />
            <Title>B</Title>
          </Flex>
        ),
        [b],
      )}
      {useMemo(
        () => (
          <Flex justify="center" align="center" direction="column">
            <NumberInput max={255} min={0} value={alpha} onChange={() => {}} />
            <Title>Alpha</Title>
          </Flex>
        ),
        [alpha],
      )}
    </HStack>
  )
}
