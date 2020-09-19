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
  IconButtonProps,
} from "@chakra-ui/core"
import Logo from "./Logo"

const GhostIconButton: React.FC<IconButtonProps> = props => {
  return (
    <IconButton
      as="div"
      {...props}
      color="gray.600"
      border="none"
      variant="outline"
      _hover={{ color: props.color }}
      _active={{ color: props.color }}
    >
      {props.children}
    </IconButton>
  )
}
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
        <GhostIconButton
          as="div"
          aria-label="go-back"
          icon={RiArrowGoBackLine}
          color="blue.500"
          cursor="pointer"
          fontSize="md"
          size="sm"
          ml="15px"
        ></GhostIconButton>
        <GhostIconButton
          as="div"
          aria-label="go-back"
          icon={RiArrowGoForwardLine}
          color="blue.500"
          cursor="pointer"
          fontSize="md"
          size="sm"
        ></GhostIconButton>
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
