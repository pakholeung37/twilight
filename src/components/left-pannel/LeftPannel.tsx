import React, { useState } from "react"
import {
  Box,
  Flex,
  List,
  ListItem,
  IconButton,
  Text,
  Button,
} from "@chakra-ui/core"
import { RiPaletteFill, RiPaintBrushFill } from "react-icons/ri"
import { BiText } from "react-icons/bi"
import { MdInsertPhoto } from "react-icons/md"
import { CgShapeSquare } from "react-icons/cg"
import Content from "./content"

const Tabs: React.FC = ({ children }) => {
  return (
    <Flex as="nav" justify="center">
      {children}
    </Flex>
  )
}

const MenuItem: React.FC<{ icon: React.ComponentType; active?: boolean }> = ({
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
        bg={active ? "blue.500" : undefined}
        _hover={{
          color: active ? "white" : "blue.500",
          borderColor: "blue.500",
        }}
      ></IconButton>
      <Text as="label" fontSize="xs" my=".3em" cursor="pointer">
        {children}
      </Text>
    </Flex>
  )
}

const menuItems = [
  { icon: RiPaletteFill, name: "调色盘" },
  { icon: BiText, name: "文本" },
  { icon: MdInsertPhoto, name: "图示" },
  { icon: CgShapeSquare, name: "形状" },
  { icon: RiPaintBrushFill, name: "背景" },
]
const LeftPanel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const toggleActiveIndex = (index: number) => {
    setActiveIndex(index)
  }
  return (
    <Flex
      justify="center"
      as="aside"
      borderRight="1px"
      borderColor="gray.200"
      h="100%"
      bg="white"
      w="400px"
    >
      <Box
        h="100%"
        w="72px"
        flexGrow={0}
        borderRight="1px"
        borderColor="gray.200"
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
        <PalettePannel></LeftPanel>
      </Box>
    </Flex>
  )
}

export default LeftPanel
