import React from "react"
import { Flex, Box, Image } from "@chakra-ui/react"

const Figure: React.FC<{
  imgSrc?: string
  data?: Record<string, unknown>
}> = ({ imgSrc, data }) => {
  return (
    <Box
      as="div"
      display="block"
      h="108px"
      borderRadius="sm"
      bg="transparent"
      border="1px"
      cursor="pointer"
      transition="all .25s"
      _hover={{
        background: "gray.300",
      }}
    >
      <Flex h="100%" justify="center" align="center">
        <Image src={imgSrc} fit="cover" maxH="80%" maxW="80%"></Image>
      </Flex>
    </Box>
  )
}

export default Figure
