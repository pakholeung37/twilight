import React from "react"
import { Box, Flex } from "@chakra-ui/core"

const Nav: React.FC = () => {
  return <Flex as="nav"></Flex>
}
const LeftPanel: React.FC = () => {
  return (
    <Box
      as="aside"
      borderRight="1px"
      borderColor="gray.200"
      w="45px"
      h="100%"
      bg="white"
    >
      <Nav></Nav>
    </Box>
  )
}

export default LeftPanel
