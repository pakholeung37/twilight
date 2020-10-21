import React, { useState } from "react"
import { Box, Flex, Divider, Button, Collapse } from "@chakra-ui/core"
import PanelInfo from "../PanelInfo"
import Tree from "components/tree"

const treeProps = {
  treeData: [
    {
      title: "容器 1",
      key: "0",
      children: [
        {
          title: "容器 1-0",
          key: "1",
          children: [
            {
              title: "叶子点",
              key: "2",
            },
            {
              title: "叶子点",
              key: "3",
            },
          ],
        },
        {
          title: "容器 1-1",
          key: "4",
          children: [
            {
              title: "叶子点",
              key: "5",
            },
          ],
        },
      ],
    },
  ],
}
const SketchPanel: React.FC = () => {
  const [sketchOpen, setSketchOpen] = useState(false)
  return (
    <Flex h="100%" direction="column">
      <PanelInfo
        title="管理画板"
        subtitle="管理您正在画板中的标志和文字。"
      ></PanelInfo>
      <Divider borderColor="border" my={0} />
      <Box overflow="overlay" backgroundColor="#f3f3f3">
        <Button
          as="div"
          w="100%"
          h="2rem"
          fontWeight=""
          fontSize="1rem"
          justifyContent="left"
          color="gray.700"
          backgroundColor="#f9f9f9"
          borderBottom="1px"
          borderColor="border"
          _hover={{}}
          _active={{}}
          transition=""
          borderRadius="none"
          boxSizing="border-box"
          onClick={() => setSketchOpen(prev => !prev)}
        >
          画板1
        </Button>
        <Collapse m="4px" isOpen={sketchOpen}>
          <Tree {...treeProps}></Tree>
        </Collapse>
      </Box>
    </Flex>
  )
}

export default SketchPanel
