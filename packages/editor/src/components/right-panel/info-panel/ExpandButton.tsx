import React, { useState } from "react"
import { Button, Box, Text } from "@chakra-ui/react"
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai"

export const ExpandButton: React.FC<{
  title: string
  isExpanded: boolean
  onClick: () => void
}> = ({ title, isExpanded, onClick }) => {
  return (
    <Button
      as="div"
      w="100%"
      h="2rem"
      fontSize="xs"
      justifyContent="left"
      color="gray.700"
      backgroundColor="#f9f9f9"
      borderBottom="1px"
      _hover={{}}
      _active={{}}
      transition=""
      borderRadius="none"
      boxSizing="border-box"
      onClick={onClick}
    >
      <Box as="span" pointerEvents="none" pr="5px">
        {isExpanded ? (
          <Box mt="2px">
            <AiFillCaretDown pointerEvents="none" />
          </Box>
        ) : (
          <AiFillCaretRight pointerEvents="none" />
        )}
      </Box>
      <Text pointerEvents="none">{title}</Text>
    </Button>
  )
}
