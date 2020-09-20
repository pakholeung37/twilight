import React, { useState } from "react"
import { Text, Box, Flex, Divider, Icon } from "@chakra-ui/core"
import PanelInfo from "../PanelInfo"
import AddButton from "../AddButton"

const IconPanel: React.FC = () => {
  return (
    <Flex h="100%" direction="column">
      <PanelInfo
        title="管理标志"
        subtitle="使用一个或多个标志向大家展示您的业务。"
      ></PanelInfo>
      <Divider borderColor="border" my={0} />
      <Box py="30px" mx="30px" overflow="overlay">
        <AddButton title="新增标志"></AddButton>
      </Box>
    </Flex>
  )
}

export default IconPanel
