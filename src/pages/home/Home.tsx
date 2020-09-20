import React from "react"
import { Box, Flex } from "@chakra-ui/core"
import Header from "components/header"
import LeftPanel from "components/left-panel"
import Workspace from "components/workspace"

const Home: React.FC = () => {
  return (
    <section id="editor">
      <Header />
      <Box h="calc(100vh - 64px)" overflow="hidden">
        <Flex h="100%">
          <LeftPanel />
          <Workspace />
        </Flex>
      </Box>
    </section>
  )
}

export default Home
