import React, { useCallback, useMemo } from "react"
import { Flex, HStack, Text } from "@chakra-ui/react"
import { Input } from "../input"
import { NumberInput } from "../number-input"
import { HSV, RGB } from "color-convert/conversions"
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
  onChange: (rgb?: RGB, alpha?: number) => void
}
export const InputField: React.FC<InputFieldProps> = ({
  rgb,
  alpha,
  onChange,
}) => {
  const hex = rgbToHex(rgb)
  const [r, g, b] = rgb

  const handleRChange = useCallback(
    (_, v: number = 0) => {
      onChange && onChange([v, g, b], undefined)
    },
    [b, g, onChange],
  )

  const handleGChange = useCallback(
    (_, v: number = 0) => {
      onChange && onChange([r, v, b], undefined)
    },
    [b, r, onChange],
  )

  const handleBChange = useCallback(
    (_, v: number = 0) => {
      onChange && onChange([r, g, v], undefined)
    },
    [r, g, onChange],
  )

  const handleAlphaChange = useCallback(
    (_, v: number = 0) => {
      onChange && onChange(undefined, v)
    },
    [onChange],
  )

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
              onChange={handleRChange}
              inputMode="numeric"
            />
            <Title>R</Title>
          </Flex>
        ),
        [handleRChange, r],
      )}
      {useMemo(
        () => (
          <Flex justify="center" align="center" direction="column">
            <NumberInput
              max={255}
              min={0}
              value={g}
              onChange={handleGChange}
              inputMode="numeric"
            />
            <Title>G</Title>
          </Flex>
        ),
        [handleGChange, g],
      )}
      {useMemo(
        () => (
          <Flex justify="center" align="center" direction="column">
            <NumberInput
              max={255}
              min={0}
              value={b}
              onChange={handleBChange}
              inputMode="numeric"
            />
            <Title>B</Title>
          </Flex>
        ),
        [handleBChange, b],
      )}
      {useMemo(
        () => (
          <Flex justify="center" align="center" direction="column">
            <NumberInput
              max={100}
              min={0}
              value={alpha}
              onChange={handleAlphaChange}
            />
            <Title>Alpha</Title>
          </Flex>
        ),
        [handleAlphaChange, alpha],
      )}
    </HStack>
  )
}
