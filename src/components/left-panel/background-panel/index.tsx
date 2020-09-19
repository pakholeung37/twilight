import React, { useState } from "react"
import { Text, Box, Flex, Divider, Icon } from "@chakra-ui/core"
import PanelInfo from "../PanelInfo"
const BackgroundPanel: React.FC = () => {
  return (
    <Flex h="100%" direction="column">
      <PanelInfo title="背景" subtitle="为您的商标选择背景颜色。"></PanelInfo>
      <Divider borderColor="border" my={0} />
      <Box py="8px" overflow="overlay"></Box>
    </Flex>
  )
}

export default BackgroundPanel
