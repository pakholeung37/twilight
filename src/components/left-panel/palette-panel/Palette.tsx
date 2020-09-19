import React from "react"
import { Box, Flex } from "@chakra-ui/core"
const Palette: React.FC<{ model: { name: string; hex: string }[] }> = ({
  model,
}) => {
  return (
    <Box
      border="1px"
      borderColor="border"
      borderRadius="10px"
      overflow="hidden"
    >
      <Flex>
        {model.map((color, index) => {
          return (
            <Box
              key={index}
              backgroundColor={"#" + color.hex}
              h="24px"
              flexGrow={1}
              title={color.name}
            ></Box>
          )
        })}
      </Flex>
    </Box>
  )
}

export default Palette
