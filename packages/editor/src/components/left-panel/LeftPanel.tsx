import React from "react"
import { Box, TabList, TabPanels, TabPanel, Tab, Tabs } from "@chakra-ui/react"
import FigurePanel from "./figure-panel"
import TreeviewPanel from "./treeview-panel"
import { useRootStore } from "../../store"
import { observer } from "mobx-react-lite"

const menuItems = [
  // { icon: <RiPaletteFill />, name: "调色盘", tab: <PalettePanel key={0} /> },
  { name: "画板", tab: <TreeviewPanel /> },
  // { icon: <BiText />, name: "文本", tab: <TextPanel key={1} /> },
  { name: "素材", tab: <FigurePanel /> },
  // {
  //   icon: <RiPaintBrushFill />,
  //   name: "背景",
  //   tab: <BackgroundPanel key={3} />,
  // },
]

const LeftPanel: React.FC = () => {
  // setting initial tab state
  const {
    leftPanelStore: { activePanelIndex, activatePanel },
  } = useRootStore()
  const toggleActiveIndex = (index: number) => {
    activatePanel(index)
  }
  return (
    <Box as="aside" borderRight="1px" h="100%" bg="white" w="64">
      <Tabs
        variant="line"
        colorScheme="twilight"
        size="sm"
        h="100%"
        index={activePanelIndex}
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
        {/* 26为tabList的高度 */}
        <TabPanels h="calc(100% - 26px)">
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

export default observer(LeftPanel)
