import React from "react"
import { Flex, HStack, Text } from "@chakra-ui/react"
import { Input } from "../input"
import { NumberInput } from "../number-input"

const Title: React.FC = ({ children }) => {
  return (
    <Text fontSize="xs" mt="1" userSelect="none">
      {children}
    </Text>
  )
}
export const InputField: React.FC = () => {
  return (
    <HStack w="100%" spacing="1">
      <Flex
        w="16"
        flexShrink={0}
        justify="center"
        align="center"
        direction="column"
      >
        <Input prefix="#" pl="4" />
        <Title>Hex</Title>
      </Flex>
      <Flex justify="center" align="center" direction="column">
        <NumberInput max={255} min={0} />
        <Title>R</Title>
      </Flex>
      <Flex justify="center" align="center" direction="column">
        <NumberInput max={255} min={0} />
        <Title>G</Title>
      </Flex>
      <Flex justify="center" align="center" direction="column">
        <NumberInput max={255} min={0} />
        <Title>B</Title>
      </Flex>
      <Flex justify="center" align="center" direction="column">
        <NumberInput max={100} min={0} />
        <Title>Alpha</Title>
      </Flex>
    </HStack>
  )
}
