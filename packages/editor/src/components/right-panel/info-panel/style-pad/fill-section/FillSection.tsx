import React, { ChangeEvent, useState } from "react"
import { Box, Flex, Switch, Text, Button, ButtonProps } from "@chakra-ui/react"
import { Input } from "../../../../input"
import { NumberInput } from "../../../../number-input"
import { Collapse } from "../../../../collapse"

export const Title: React.FC<{
  text: string
  open: boolean
  onChange: (value: boolean) => void
}> = function Title({ text, open, onChange }) {
  return (
    <Flex justify="space-between" align="center" h="10" w="100%">
      <Text>{text}</Text>
      <Switch
        size="sm"
        isChecked={open}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.checked)
        }
      />
    </Flex>
  )
}

export const ColorButton: React.FC<ButtonProps & { color: string }> = ({
  color,
  ...props
}) => {
  return (
    <Button
      aria-label="color"
      background={color}
      h="23px"
      w="23px"
      borderRadius="base"
      flexShrink={0}
      _hover={{
        background: color,
      }}
      _active={{
        background: color,
      }}
      {...props}
    />
  )
}

export const FillSection: React.FC = function FillSection() {
  const [open, setOpen] = useState(false)

  return (
    <Box w="100%">
      <Title text="填充" open={open} onChange={setOpen} />
      <Collapse isOpen={open}>
        <Box mb="3" mt="1">
          <Flex align="center">
            <Flex justify="center" align="center" direction="column">
              <ColorButton color="twilight.500" />
              <Text fontSize="xs" mt="1">
                颜色
              </Text>
            </Flex>
            <Flex mx="3" justify="center" align="center" direction="column">
              <Input prefix="#" pl="4" />
              <Text fontSize="xs" mt="1">
                Hex
              </Text>
            </Flex>
            <Flex width="20" justify="center" align="center" direction="column">
              <NumberInput suffix="%" max={100} min={0} pr="4" />
              <Text fontSize="xs" mt="1">
                透明度
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Collapse>
    </Box>
  )
}
