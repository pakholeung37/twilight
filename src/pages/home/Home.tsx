import React from "react"
import { Box } from "@chakra-ui/core"
import Header from "components/header"
import LeftPanel from "components/left-panel"
import Sketch from "components/sketch"

const Home: React.FC = () => {
  return (
    <section id="editor">
      <Header />
      <Box h="calc(100vh - 64px)" bg="workspacebase" overflow="hidden">
        <LeftPanel />
        <Sketch />
      </Box>
    </section>
  )
}

export default Home
