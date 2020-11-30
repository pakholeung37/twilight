import React, { useMemo, useState } from "react"
import { Box, Flex, Divider, Button, Text } from "@chakra-ui/react"
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai"
import PanelInfo from "../PanelInfo"
import Tree from "../../tree"
import { TreeProps, RenderButton } from "../../tree/Tree"
import { shapeTreeviewSelector } from "../../../states"
import { useRecoilValue } from "recoil"

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
  const treeview = useRecoilValue(shapeTreeviewSelector)

  const treeProps = useMemo<TreeProps>(
    () => ({
      treeData: [
        {
          title: "画板 1",
          key: "1",
          renderButton: sketchButton,
          children: (
            <Box m="4px" backgroundColor="#f3f3f3">
              <Tree {...treeview}></Tree>
            </Box>
          ),
        },
      ],
    }),
    [treeview],
  )
  return (
    <Flex h="100%" direction="column">
      <PanelInfo
        title="管理画板"
        subtitle="管理您正在画板中的标志和文字。"
      ></PanelInfo>
      <Divider my={0} />
      <Tree {...treeProps}></Tree>
    </Flex>
  )
}

export default TreeViewPanel
