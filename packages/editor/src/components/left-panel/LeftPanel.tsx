import React, { useState } from "react"
import {
  Box,
  Flex,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Tabs,
  IconButton,
  Text,
} from "@chakra-ui/react"
import { RiPaletteFill, RiPaintBrushFill } from "react-icons/ri"
import { BiText } from "react-icons/bi"
import { MdInsertPhoto } from "react-icons/md"
import PalettePanel from "./palette-panel"
import TextPanel from "./text-panel"
import FigurePanel from "./figure-panel"
import BackgroundPanel from "./background-panel"
import SketchPanel from "./sketch-panel"

const menuItems = [
  // { icon: <RiPaletteFill />, name: "调色盘", tab: <PalettePanel key={0} /> },
  { icon: <RiPaintBrushFill />, name: "画板", tab: <SketchPanel /> },
  // { icon: <BiText />, name: "文本", tab: <TextPanel key={1} /> },
  { icon: <MdInsertPhoto />, name: "素材", tab: <FigurePanel /> },
  // {
  //   icon: <RiPaintBrushFill />,
  //   name: "背景",
  //   tab: <BackgroundPanel key={3} />,
  // },
]

// const MenuItem: React.FC<{ icon: React.ReactElement; active?: boolean }> = ({
//   icon,
//   children,
//   active,
// }) => {
//   return (
//     <Flex
//       as="div"
//       cursor="pointer"
//       flexDirection="column"
//       justify="center"
//       align="center"
//     >
//       <IconButton
//         as="div"
//         icon={icon}
//         aria-label="menu-button"
//         variant="outline"
//         fontSize="sm"
//         size="sm"
//         isRound
//         color={active ? "white" : "gray.300"}
//         bg={active ? "twilight.500" : undefined}
//         borderColor={active ? "twilight.500" : undefined}
//         _hover={{
//           color: active ? "white" : "twilight.500",
//           borderColor: "twilight.500",
//         }}
//       ></IconButton>
//       <Text as="label" fontSize="xs" my="1" cursor="pointer">
//         {children}
//       </Text>
//     </Flex>
//   )
// }

const LeftPanel: React.FC = () => {
  // setting initial tab state
  const [activeIndex, setActiveIndex] = useState(0)
  const toggleActiveIndex = (index: number) => {
    setActiveIndex(index)
  }
  return (
    <Box as="aside" borderRight="1px" h="100%" bg="white" w="272px">
      <Tabs
        variant="line"
        colorScheme="twilight"
        borderBottom="none"
        size="sm"
        index={activeIndex}
        onChange={toggleActiveIndex}
      >
        <TabList>
          {menuItems.map((item, index) => (
            <Tab
              key={index}
              fontSize="xs"
              mx=".4rem"
              px=".2rem"
              _focus={{}}
              borderRadius="0"
            >
              {item.name}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {menuItems.map((item, index) => (
            <TabPanel h="100%" p={0} key={index}>
              {item.tab}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default LeftPanel
