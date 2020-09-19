import React from "react"
import { Box, Flex, List, ListItem, Text } from "@chakra-ui/core"
const Palette: React.FC<{ colors: string[] }> = ({ colors }) => {
  return (
    <Box
      border="1px"
      borderColor="gray.200"
      borderRadius="10px"
      overflow="hidden"
    >
      <Flex>
        {colors.map((color, index) => {
          return (
            <Box
              key={index}
              backgroundColor={color}
              h="24px"
              flexGrow={1}
            ></Box>
          )
        })}
      </Flex>
    </Box>
  )
}

export default Palette
