import React, { useState } from "react"
import { Box, Flex, List, ListItem, IconButton, Text } from "@chakra-ui/core"
import { RiPaletteFill, RiPaintBrushFill } from "react-icons/ri"
import { BiText } from "react-icons/bi"
import { MdInsertPhoto } from "react-icons/md"
import PalettePanel from "./palette-panel"
import TextPanel from "./text-panel"
import FigurePanel from "./figure-panel"
import BackgroundPanel from "./background-panel"

const Tabs: React.FC = ({ children }) => {
  return (
    <Flex as="nav" justify="center">
      {children}
    </Flex>
  )
}

const panels = [
  <PalettePanel key={0} />,
  <TextPanel key={1} />,
  <FigurePanel key={2} />,
  <BackgroundPanel key={3} />,
]
const MenuItem: React.FC<{ icon: React.ReactElement; active?: boolean }> = ({
  icon,
  children,
  active,
}) => {
  return (
    <Flex
      as="div"
      cursor="pointer"
      flexDirection="column"
      justify="center"
      align="center"
    >
      <IconButton
        as="div"
        icon={icon}
        aria-label="menu-button"
        variant="outline"
        fontSize="1.4em"
        isRound
        color={active ? "white" : "gray.300"}
        bg={active ? "twilight.500" : undefined}
        borderColor={active ? "twilight.500" : undefined}
        _hover={{
          color: active ? "white" : "twilight.500",
          borderColor: "twilight.500",
        }}
      ></IconButton>
      <Text as="label" fontSize="xs" my=".3em" cursor="pointer">
        {children}
      </Text>
    </Flex>
  )
}

const menuItems = [
  { icon: <RiPaletteFill />, name: "调色盘" },
  { icon: <BiText />, name: "文本" },
  { icon: <MdInsertPhoto />, name: "标志" },
  { icon: <RiPaintBrushFill />, name: "背景" },
]
const LeftPanel: React.FC = () => {
  // setting initial tab state
  const [activeIndex, setActiveIndex] = useState(2)
  const toggleActiveIndex = (index: number) => {
    setActiveIndex(index)
  }
  return (
    <Flex
      justify="center"
      as="aside"
      borderRight="1px"
      borderColor="border"
      h="100%"
      bg="white"
      w="373px"
    >
      <Box
        h="100%"
        w="64px"
        flexShrink={0}
        borderRight="1px"
        borderColor="border"
      >
        <Tabs>
          <List px="0" spacing={4}>
            {menuItems.map((item, index) => (
              <ListItem key={index} onClick={() => toggleActiveIndex(index)}>
                <MenuItem icon={item.icon} active={activeIndex === index}>
                  {item.name}
                </MenuItem>
              </ListItem>
            ))}
          </List>
        </Tabs>
      </Box>
      <Box h="100%" flexGrow={1}>
        {panels[activeIndex]}
      </Box>
    </Flex>
  )
}

export default LeftPanel
