import React, { useState } from "react"
import { RiArrowGoBackLine, RiArrowGoForwardLine } from "react-icons/ri"
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Divider,
  Avatar,
  Icon,
  IconButton,
} from "@chakra-ui/core"
import Logo from "./Logo"

const Header: React.FC = () => {
  return (
    <Flex
      as="header"
      bg="white"
      px="20px"
      borderBottom="1px"
      borderColor="gray.200"
      align="center"
      justify="space-between"
      h="72px"
    >
      <Flex align="center">
        <Logo></Logo>
        <Divider
          orientation="vertical"
          mx="15px"
          h="24px"
          borderColor="gray.400"
        ></Divider>
        <Text color="gray.600">尝试其他设计</Text>
      </Flex>
      <Flex align="center">
        <Text color="gray.400">所有变更已储存</Text>
        <IconButton
          aria-label="go-back"
          icon={RiArrowGoBackLine}
          variantColor="blick"
          variant="ghost"
          border="none"
          isRound
        ></IconButton>
        <IconButton
          aria-label="go-back"
          icon={RiArrowGoForwardLine}
          variantColor="blue"
          variant="ghost"
          border="none"
          isRound
        ></IconButton>
        <Divider
          orientation="vertical"
          mx="15px"
          h="24px"
          borderColor="gray.400"
        ></Divider>
        <Button
          variantColor="blue"
          border="none"
          size="md"
          borderRadius="20px"
          rightIcon="arrow-forward"
          cursor="pointer"
        >
          <Text fontWeight="200">下一步</Text>
        </Button>
        <Avatar size="sm" ml="15px"></Avatar>
      </Flex>
    </Flex>
  )
}

export default Header
