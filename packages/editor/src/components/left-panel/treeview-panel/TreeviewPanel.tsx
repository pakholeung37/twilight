import React from "react"
import { observer } from "mobx-react-lite"
import { computed } from "mobx"
import { Box, Flex, Divider, Button, Text } from "@chakra-ui/react"
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai"
import PanelInfo from "../PanelInfo"
import Tree from "../../tree"
import { TreeProps, RenderButton } from "../../tree/Tree"
import { useRootStore } from "../../../store"

const sketchButton: RenderButton = ({
  node,
  onClick,
  dragDropProps,
  isExpanded,
}) => {
  return (
    <Button
      as="div"
      w="100%"
      h="2rem"
      fontSize="xs"
      justifyContent="left"
      color="gray.700"
      backgroundColor="#f9f9f9"
      borderBottom="1px"
      _hover={{}}
      _active={{}}
      transition=""
      borderRadius="none"
      boxSizing="border-box"
      onClick={onClick}
      {...dragDropProps}
    >
      {(Array.isArray(node.children) && node.children.length) ||
      node.children ? (
        <Box as="span" pointerEvents="none" pr="5px">
          {isExpanded ? (
            <Box mt="2px">
              <AiFillCaretDown pointerEvents="none" />
            </Box>
          ) : (
            <AiFillCaretRight pointerEvents="none" />
          )}
        </Box>
      ) : undefined}
      <Text pointerEvents="none">{node.title}</Text>
    </Button>
  )
}

const TreeViewPanel: React.FC = () => {
  const {
    sketchStore: { shapes, selectedShape },
  } = useRootStore()
  // 暂时屏蔽该state
  // const treeview = { treeData: [] }
  const shapeTreeData = computed(() => ({
    treeData: shapes.map(shape => ({
      title: shape.name,
      active: shape === selectedShape,
      key: shape.id,
    })),
  })).get()

  const treeProps: TreeProps = {
    treeData: [
      {
        title: "画板 1",
        key: "1",
        expand: true,
        renderButton: sketchButton,
        children: (
          <Box m="4px" backgroundColor="#f3f3f3">
            <Tree {...shapeTreeData}></Tree>
          </Box>
        ),
      },
    ],
  }
  return (
    <Flex h="100%" direction="column">
      <PanelInfo
        title="管理画板"
        subtitle="管理您正在画板中的标志和文字。"
      ></PanelInfo>
      <Divider my={0} />
      <Box flexShrink={1} overflowY="auto">
        <Tree {...treeProps}></Tree>
      </Box>
    </Flex>
  )
}

export default observer(TreeViewPanel)
