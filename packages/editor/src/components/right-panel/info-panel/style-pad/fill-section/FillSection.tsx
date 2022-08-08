import React, { useCallback, useState } from "react"
import { Box, Flex, Text, HStack } from "@chakra-ui/react"
import { Input } from "../../../../input"
import { NumberInput } from "../../../../number-input"
import { Collapse } from "../../../../collapse"
import { Title } from "../Title"
import { ColorButton } from "../../../../color-button"
import { HSV } from "color-convert/conversions"
import { useRootStore } from "../../../../../store"
import { observer } from "mobx-react-lite"
import {
  hexToRgb,
  hsvToRgb,
  isHex,
  rgbToHex,
  rgbToHsv,
} from "../../../../../utils"

const HexField: React.FC = observer(function HexField() {
  const {
    sketchStore: { selectedShape },
  } = useRootStore()

  const hex = selectedShape
    ? rgbToHex(hsvToRgb(selectedShape.fillColor.hsv))
    : "#fff"
  const [isHexFocus, setHexFocus] = useState(false)
  const [hexInput, setHexInput] = useState(hex)
  // Hex
  const handleHexConfirm = useCallback(
    ({ target: { value } }) => {
      const color = value
      if (isHex(color)) {
        selectedShape?.fillColor?.setHsv(rgbToHsv(hexToRgb(value)))
      } else {
        setHexInput(hex)
      }
    },
    [hex, selectedShape?.fillColor],
  )

  const handleHexChange = useCallback(
    ({ target: { value } }) => setHexInput(value),
    [],
  )

  const handleHexKeyPress = useCallback(
    e => {
      e.key === "Enter" && handleHexConfirm(e)
    },
    [handleHexConfirm],
  )

  const handleHexBlur = useCallback(
    e => {
      setHexFocus(false)
      handleHexConfirm(e)
    },
    [handleHexConfirm],
  )

  return (
    <Input
      prefix="#"
      pl="4"
      value={isHexFocus ? hexInput : hex}
      onFocus={() => {
        setHexFocus(true)
        setHexInput(hex)
      }}
      onChange={handleHexChange}
      onKeyPress={handleHexKeyPress}
      onBlur={handleHexBlur}
    />
  )
})

const AlphaField: React.FC = observer(function AlphaField() {
  const {
    sketchStore: { selectedShape },
  } = useRootStore()

  const handleAlphaChange = useCallback(
    (_, v = 0) => {
      selectedShape?.fillColor.setAlpha(v)
    },
    [selectedShape],
  )
  return (
    <NumberInput
      suffix="%"
      precision={1}
      max={100}
      min={0}
      pr="4"
      value={selectedShape?.fillColor?.alpha ?? ""}
      onChange={handleAlphaChange}
    />
  )
})

export const FillSection: React.FC = observer(function FillSection() {
  const {
    sketchStore: { selectedShape },
  } = useRootStore()

  const open = !!selectedShape?.fillColor

  return (
    selectedShape && (
      <Box w="100%">
        <Title text="填充" open={open} />
        <Collapse isOpen={open}>
          <Box mb="3" mt="1">
            <HStack spacing="3" align="center">
              <Flex justify="center" align="center" direction="column">
                <ColorButton
                  hsv={selectedShape.fillColor.hsv}
                  alpha={selectedShape.fillColor.alpha}
                  placement="bottom-start"
                  onHsvChange={(hsv: HSV, alpha: number) => {
                    selectedShape.fillColor.setHsv(hsv)
                    selectedShape.fillColor.setAlpha(alpha)
                  }}
                />
                <Text fontSize="xs" mt="1">
                  颜色
                </Text>
              </Flex>
              <Flex justify="center" align="center" direction="column">
                <HexField />
                <Text fontSize="xs" mt="1">
                  Hex
                </Text>
              </Flex>
              <Flex
                width="20"
                justify="center"
                align="center"
                direction="column"
              >
                <AlphaField />
                <Text fontSize="xs" mt="1">
                  透明度
                </Text>
              </Flex>
            </HStack>
          </Box>
        </Collapse>
      </Box>
    )
  )
})
