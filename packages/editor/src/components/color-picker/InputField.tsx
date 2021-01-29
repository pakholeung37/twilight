import React, { useCallback, useMemo, useState } from "react"
import { Flex, HStack, Text } from "@chakra-ui/react"
import { Input } from "../input"
import { NumberInput } from "../number-input"
import { RGB } from "color-convert/conversions"
import { hexToRgb, isHex, rgbToHex } from "./utils"

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
  const [isHexFocus, setHexFocus] = useState(false)
  const [hexInput, setHexInput] = useState(hex)

  const handleHexConfirm = useCallback(
    ({ target: { value } }) => {
      const color = value
      if (isHex(color)) {
        onChange && onChange(hexToRgb(color))
      } else {
        setHexInput(hex)
      }
    },
    [hex, onChange],
  )

  const handleHexBlur = useCallback(
    e => {
      setHexFocus(false)
      handleHexConfirm(e)
    },
    [handleHexConfirm],
  )

  const [r, g, b] = rgb
  // R
  const handleRChange = useCallback(
    (_, v: number = 0) => {
      onChange && onChange([isNaN(v) ? r : v, g, b])
    },
    [r, g, b, onChange],
  )

  // G
  const handleGChange = useCallback(
    (_, v: number = 0) => {
      onChange && onChange([r, isNaN(v) ? g : v, b])
    },
    [r, g, b, onChange],
  )
  // B
  const handleBChange = useCallback(
    (_, v: number = 0) => {
      onChange && onChange([r, g, isNaN(v) ? b : v])
    },
    [r, g, b, onChange],
  )
  // Alpha
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
            <Input
              prefix="#"
              pl="3"
              value={isHexFocus ? hexInput : hex}
              onFocus={() => {
                setHexFocus(true)
                setHexInput(hex)
              }}
              onChange={({ target: { value } }) => setHexInput(value)}
              onKeyPress={e => {
                e.key === "Enter" && handleHexConfirm(e)
              }}
              onBlur={handleHexBlur}
            />
            <Title>Hex</Title>
          </Flex>
        ),
        [handleHexConfirm, hex, hexInput, isHexFocus, handleHexBlur],
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
