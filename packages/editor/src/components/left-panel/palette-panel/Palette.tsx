import React from "react"
import { Box, Flex } from "@chakra-ui/react"
const Palette: React.FC<{ model: { name: string; hex: string }[] }> = ({
  model,
}) => {
  return (
    <Box border="1px" borderRadius="10px" overflow="hidden">
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
