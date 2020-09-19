import React from "react"
import { Flex, Text, Button, Divider, Avatar } from "@chakra-ui/core"
import { RiArrowGoBackLine, RiArrowGoForwardLine } from "react-icons/ri"
import { IoMdArrowForward } from "react-icons/io"
import Logo from "./Logo"
import HistoryButton from "./HistoryButton"

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
        <HistoryButton
          aria-label="go-back"
          icon={<RiArrowGoBackLine />}
          color="blue.500"
          cursor="pointer"
          fontSize="md"
          size="sm"
          ml="15px"
        ></HistoryButton>
        <HistoryButton
          aria-label="go-back"
          icon={<RiArrowGoForwardLine />}
          color="blue.500"
          cursor="pointer"
          fontSize="md"
          size="sm"
        ></HistoryButton>
        <Divider
          orientation="vertical"
          mx="15px"
          h="24px"
          borderColor="gray.400"
        ></Divider>
        <Button
          colorScheme="blue"
          border="none"
          size="md"
          borderRadius="20px"
          rightIcon={<IoMdArrowForward />}
          cursor="pointer"
          fontWeight="200"
        >
          下一步
        </Button>
        <Avatar size="sm" ml="15px"></Avatar>
      </Flex>
    </Flex>
  )
}

export default Header
