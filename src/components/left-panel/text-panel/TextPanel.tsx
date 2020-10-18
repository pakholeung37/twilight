import React, { useState } from "react"
import { Box, Flex, Divider } from "@chakra-ui/core"
import PanelInfo from "../PanelInfo"
import AddButton from "../AddButton"

const TextPanel: React.FC = () => {
  return (
    <Flex h="100%" direction="column">
      <PanelInfo
        title="管理文字"
        subtitle="新增并自订所有您喜欢的文字。"
      ></PanelInfo>
      <Divider borderColor="border" my={0} />
      <Box overflow="overlay" mx="30px" py="30px">
        <AddButton title="新增文本"></AddButton>
      </Box>
    </Flex>
  )
}

export default TextPanel
