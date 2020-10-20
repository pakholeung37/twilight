import React, { useState } from "react"
import { Box, Flex, Divider } from "@chakra-ui/core"
import PanelInfo from "../PanelInfo"
import Tree from "components/tree"

const treeProps = {
  treeData: [
    {
      title: "parent 1",
      key: "0",
      children: [
        {
          title: "parent 1-0",
          key: "1",
          children: [
            {
              title: "leaf",
              key: "2",
            },
            {
              title: "leaf",
              key: "3",
            },
          ],
        },
        {
          title: "parent 1-1",
          key: "4",
          children: [
            {
              title: "leaf",
              key: "5",
            },
          ],
        },
      ],
    },
  ],
}
const SketchPanel: React.FC = () => {
  return (
    <Flex h="100%" direction="column">
      <PanelInfo
        title="管理画板"
        subtitle="管理您正在画板中的标志和文字。"
      ></PanelInfo>
      <Divider borderColor="border" my={0} />
      <Box overflow="overlay" mx="30px" py="30px">
        <Tree {...treeProps}></Tree>
      </Box>
    </Flex>
  )
}

export default SketchPanel
