import React from "react"
import { Flex, Text, Button, Divider, Avatar } from "@chakra-ui/react"
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
      align="center"
      justify="space-between"
      h="53px"
    >
      <Flex align="center">
        <Logo></Logo>
        <Divider
          orientation="vertical"
          mx="12px"
          h="24px"
          borderColor="divider"
        ></Divider>
        <Text color="textbase">尝试其他设计</Text>
      </Flex>
      <Flex align="center">
        <Text color="textlight">所有变更已储存</Text>
        <HistoryButton
          aria-label="go-back"
          icon={<RiArrowGoBackLine />}
          color="twilight.500"
          cursor="pointer"
          fontSize="md"
          size="sm"
          ml="12px"
        ></HistoryButton>
        <HistoryButton
          aria-label="go-back"
          icon={<RiArrowGoForwardLine />}
          color="twilight.500"
          cursor="pointer"
          fontSize="md"
          size="sm"
        ></HistoryButton>
        <Divider
          orientation="vertical"
          mx="12px"
          h="24px"
          borderColor="divider"
        ></Divider>
        <Button
          colorScheme="blue"
          border="none"
          borderRadius="20px"
          rightIcon={<IoMdArrowForward />}
          cursor="pointer"
        >
          下一步
        </Button>
        <Avatar ml="12px"></Avatar>
      </Flex>
    </Flex>
  )
}

export default Header
