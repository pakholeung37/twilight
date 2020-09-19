import React, { useState } from "react"
import { Text, Box, Flex, Divider, Icon } from "@chakra-ui/core"
import { IoIosCheckmarkCircle } from "react-icons/io"
import Palette from "./Palette"
import palettes from "./palettes"
const PanelInfo: React.FC = () => {
  return (
    <Box mx="30px" py="10px">
      <Text color="textbase">调色板</Text>
      <Text color="gray.600" fontSize="sm" lineHeight="base">
        为您的商标选择一个漂亮的颜色组合。您可以单独挑选标签中的颜色。
      </Text>
    </Box>
  )
}

const activeState = {
  border: "1px",
  borderColor: "twilight.500",
  borderRadius: "md",
}
const PalettePanel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)
  return (
    <Flex h="100%" direction="column">
      <PanelInfo></PanelInfo>
      <Divider borderColor="border" my={0} />
      <Box py="8px" h="" overflow="overlay">
        {palettes.map((palette, index) => {
          return (
            <Box
              key={index}
              mx="30px"
              mb="10px"
              p="9px"
              border="1px"
              position="relative"
              borderColor="transparent"
              boxSizing="border-box"
              transition="all .25s"
              {...(activeIndex === index ? activeState : undefined)}
              cursor="pointer"
              _hover={activeState}
              onClick={() => setActiveIndex(index)}
            >
              <Text as="div" fontWeight="200" fontSize="sm" mb="10px">
                {palette[0].name}
              </Text>
              <Palette key={index} model={palette}></Palette>
              <Icon
                as={IoIosCheckmarkCircle}
                fontSize="1.4em"
                position="absolute"
                top="3px"
                right="4px"
                transition="color .25s"
                color={activeIndex === index ? "twilight.500" : "transparent"}
              ></Icon>
            </Box>
          )
        })}
      </Box>
    </Flex>
  )
}

export default PalettePanel
