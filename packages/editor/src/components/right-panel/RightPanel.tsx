import React, { useState } from "react"
import { Box, Flex, List, ListItem, IconButton, Text } from "@chakra-ui/react"
import { BiText } from "react-icons/bi"
import InfoPanel from "./info-panel"

const LeftPanel: React.FC = () => {
  // setting initial tab state
  const [activeIndex, setActiveIndex] = useState(4)
  const toggleActiveIndex = (index: number) => {
    setActiveIndex(index)
  }
  return (
    <Flex justify="center" as="aside" h="100%" w="64" borderLeft="1px">
      <InfoPanel />
    </Flex>
  )
}

export default LeftPanel
