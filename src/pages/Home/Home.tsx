import React from "react"
import { Box } from "@chakra-ui/core"
import Header from "components/header"
import Content from "./Content"
import LeftPanel from "components/left-pannel"
const Home: React.FC = () => {
  return (
    <section id="editor">
      <Header />
      <Box h="calc(100vh - 73px)" bg="#efecea">
        <LeftPanel></LeftPanel>
        <Content></Content>
      </Box>
    </section>
  )
}

export default Home
