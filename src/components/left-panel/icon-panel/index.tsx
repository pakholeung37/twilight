import React, { useState } from "react"
import { Text, Box, Flex, Divider, Icon } from "@chakra-ui/core"
import PanelInfo from "../PanelInfo"
const IconPanel: React.FC = () => {
  return (
    <Flex h="100%" direction="column">
      <PanelInfo
        title="管理标志"
        subtitle="使用一个或多个标志向大家展示您的业务。"
      ></PanelInfo>
      <Divider borderColor="border" my={0} />
      <Box py="8px" overflow="overlay"></Box>
    </Flex>
  )
}

export default IconPanel
