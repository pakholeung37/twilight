import React from "react"
import { Box, Flex } from "@chakra-ui/react"
import Header from "../../components/header"
import LeftPanel from "../../components/left-panel"
import Workspace from "../../components/workspace"
import RightPanel from "../../components/right-panel"
const Home: React.FC = () => {
  return (
    <section id="editor">
      <Header />
      <Box h="calc(100vh - 54px)" overflow="hidden">
        <Flex h="100%">
          <LeftPanel />
          <Workspace />
          <RightPanel />
        </Flex>
      </Box>
    </section>
  )
}

export default Home
