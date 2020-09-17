import React, { useState } from "react"
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Divider,
  Avatar,
  Icon,
} from "@chakra-ui/core"

const Logo: React.FC = () => (
  <Box>
    <Text color="gray.700" fontSize="24px">
      TWILIGHT
    </Text>
  </Box>
)
const Header: React.FC = () => {
  const [show, setShow] = useState(false)
  const toggle = () => setShow(!show)

  return (
    <Flex
      bg="white"
      px="20px"
      borderBottom="1px"
      borderColor="gray.100"
      align="center"
      justify="space-between"
      h="75px"
    >
      <Flex align="center">
        <Logo></Logo>
        <Divider
          orientation="vertical"
          mx="15px"
          h="24px"
          borderColor="gray.500"
        ></Divider>
        <Text color="gray.600">尝试其他设计</Text>
      </Flex>
      <Flex align="center">
        <Text color="gray.400">所有变更已储存</Text>
        <Divider
          orientation="vertical"
          mx="15px"
          h="24px"
          borderColor="gray.500"
        ></Divider>
        <Button
          variantColor="blue"
          border="none"
          size="md"
          borderRadius="20px"
          rightIcon="arrow-forward"
        >
          <Text fontWeight="200">下一步</Text>
        </Button>
        <Avatar size="sm" ml="15px"></Avatar>
      </Flex>
    </Flex>
  )
}

export default Header
