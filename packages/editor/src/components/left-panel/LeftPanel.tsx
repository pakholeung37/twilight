import React, { useState } from "react"
import { Box, TabList, TabPanels, TabPanel, Tab, Tabs } from "@chakra-ui/react"
import { RiPaintBrushFill } from "react-icons/ri"
import { MdInsertPhoto } from "react-icons/md"
import FigurePanel from "./figure-panel"
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
        size="sm"
        index={activeIndex}
        onChange={toggleActiveIndex}
      >
        <TabList borderBottom="none">
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
