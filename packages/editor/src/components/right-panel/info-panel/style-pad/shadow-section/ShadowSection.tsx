import React, { useState } from "react"
import { Box, Flex, Text, Button, ButtonProps, HStack } from "@chakra-ui/react"
import { Input } from "../../../../input"
import { NumberInput } from "../../../../number-input"
import { Collapse } from "../../../../collapse"
import { Title } from "../Title"

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

export const ShadowSection: React.FC = function ShadowSection() {
  const [open, setOpen] = useState(false)

  return (
    <Box w="100%">
      <Title text="阴影" open={open} onChange={setOpen} />
      <Collapse isOpen={open}>
        <Box mb="3" mt="1">
          <HStack spacing="3" align="center">
            <Flex justify="center" align="center" direction="column">
              <ColorButton color="twilight.500" />
              <Text fontSize="xs" mt="1">
                颜色
              </Text>
            </Flex>
            <Flex justify="center" align="center" direction="column">
              <NumberInput />
              <Text fontSize="xs" mt="1">
                X
              </Text>
            </Flex>
            <Flex justify="center" align="center" direction="column">
              <NumberInput />
              <Text fontSize="xs" mt="1">
                Y
              </Text>
            </Flex>
            <Flex justify="center" align="center" direction="column">
              <NumberInput />
              <Text fontSize="xs" mt="1">
                模糊
              </Text>
            </Flex>
            <Flex justify="center" align="center" direction="column">
              <NumberInput />
              <Text fontSize="xs" mt="1">
                扩展
              </Text>
            </Flex>
          </HStack>
        </Box>
      </Collapse>
    </Box>
  )
}
