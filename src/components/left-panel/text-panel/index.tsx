import React, { useState } from "react"
import { Text, Box, Flex, Divider, Icon } from "@chakra-ui/core"
import PanelInfo from "../PanelInfo"
const TextPanel: React.FC = () => {
  return (
    <Flex h="100%" direction="column">
      <PanelInfo
        title="管理文字"
        subtitle="新增并自订所有您喜欢的文字。"
      ></PanelInfo>
      <Divider borderColor="border" my={0} />
      <Box py="8px" overflow="overlay"></Box>
    </Flex>
  )
}

export default TextPanel
