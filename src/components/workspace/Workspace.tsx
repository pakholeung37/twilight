import React from "react"
import { Box } from "@chakra-ui/core"
import Sketch from "components/sketch"

const WorkSpace: React.FC = () => {
  return (
    <Box bg="workspacebase" h="100%" flexGrow={1} position="relative">
      <Box position="absolute" top="100px" left="100px">
        <Sketch></Sketch>
      </Box>
    </Box>
  )
}

export default WorkSpace
