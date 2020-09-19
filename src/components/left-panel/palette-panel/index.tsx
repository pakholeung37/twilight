import React, { useState } from "react"
import { Text, Box, Flex, Divider, Icon } from "@chakra-ui/core"
import randomColor from "randomcolor"
import { IoIosCheckmarkCircle } from "react-icons/io"
import Palette from "./Palette"
const PanelInfo: React.FC = () => {
  return (
    <Box mx="30px" py="10px">
      <Text color="gray.700">调色板</Text>
      <Text color="gray.500" fontSize="sm" lineHeight="base">
        为您的商标选择一个漂亮的颜色组合。您可以单独挑选标签中的颜色。
      </Text>
    </Box>
  )
}

const palettes = [...Array(10)].map((_, index) => {
  return {
    name: "custom palette " + index,
    colors: randomColor({ count: 5, hue: "random", luminosity: "random" }),
  }
})

const activeState = {
  border: "1px",
  borderColor: "blue.400",
  borderRadius: "md",
}
const PalettePanel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)
  return (
    <Flex h="100%" direction="column">
      <PanelInfo></PanelInfo>
      <Divider borderColor="gray.200" my={0} />
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
              {...(activeIndex === index ? activeState : undefined)}
              cursor="pointer"
              _hover={activeState}
              onClick={() => setActiveIndex(index)}
            >
              <Text as="div" fontWeight="200" fontSize="sm" mb="10px">
                {palette.name}
              </Text>
              <Palette key={index} colors={palette.colors}></Palette>
              {(activeIndex === index && (
                <Icon
                  as={IoIosCheckmarkCircle}
                  fontSize="1.4em"
                  position="absolute"
                  top="3px"
                  right="4px"
                  color="blue.400"
                ></Icon>
              )) ||
                undefined}
            </Box>
          )
        })}
      </Box>
    </Flex>
  )
}

export default PalettePanel
