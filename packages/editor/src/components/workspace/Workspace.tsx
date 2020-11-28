import React from "react"
import { Box, Flex } from "@chakra-ui/react"
import Sketch from "../../components/sketch"

const WorkSpace: React.FC = () => {
  return (
    <Box bg="workspacebase" h="100%" flexGrow={1} position="relative">
      <Flex justify="center" align="center" h="100%">
        <Sketch></Sketch>
      </Flex>
    </Box>
  )
}

export default WorkSpace
