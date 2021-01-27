import React from "react"
import { Flex, HStack, Text } from "@chakra-ui/react"
import { Input } from "../input"
import { NumberInput } from "../number-input"
export const InputField: React.FC = () => {
  return (
    <HStack w="100%" spacing="1" lineHeight="1.15">
      <Flex
        w="16"
        flexShrink={0}
        justify="center"
        align="center"
        direction="column"
      >
        <Input prefix="#" pl="4" />
        <Text fontSize="xs" mt="1">
          HEX
        </Text>
      </Flex>
      <Flex justify="center" align="center" direction="column">
        <NumberInput />
        <Text fontSize="xs" mt="1">
          R
        </Text>
      </Flex>
      <Flex justify="center" align="center" direction="column">
        <NumberInput />
        <Text fontSize="xs" mt="1">
          G
        </Text>
      </Flex>
      <Flex justify="center" align="center" direction="column">
        <NumberInput />
        <Text fontSize="xs" mt="1">
          B
        </Text>
      </Flex>
      <Flex justify="center" align="center" direction="column">
        <NumberInput />
        <Text fontSize="xs" mt="1">
          Alpha
        </Text>
      </Flex>
    </HStack>
  )
}
