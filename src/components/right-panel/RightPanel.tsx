import React, { useState } from "react"
import { Box, Flex, List, ListItem, IconButton, Text } from "@chakra-ui/react"
import { BiText } from "react-icons/bi"
import TextPanel from "./text-panel"

const LeftPanel: React.FC = () => {
  // setting initial tab state
  const [activeIndex, setActiveIndex] = useState(4)
  const toggleActiveIndex = (index: number) => {
    setActiveIndex(index)
  }
  return (
    <Flex
      justify="center"
      as="aside"
      h="100%"
      bg="white"
      w="272px"
      borderLeft="1px"
    ></Flex>
  )
}

export default LeftPanel
