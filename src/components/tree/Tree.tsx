import React, { useRef, useState } from "react"
import { Box, Text, Button } from "@chakra-ui/core"
import { BsFillCaretRightFill } from "react-icons/bs"
import { useClickAway } from "ahooks"

export type TreeNode = {
  title: string
  children?: TreeNode[]
  key: string | number
}
export interface TreeProps {
  treeData: TreeNode[] | TreeNode
}

const Tree: React.FC<TreeProps & {
  nodeClick: (key: string | number) => void
  activeNode: string | number
}> = ({ treeData, nodeClick, activeNode }) => {
  return (
    <>
      {((Array.isArray(treeData) && treeData) || [treeData]).map(node => {
        const active = activeNode === node.key
        return (
          <Box key={node.key}>
            <Button
              as="div"
              w="100%"
              h="2rem"
              justifyContent="left"
              color={active ? "white" : "gray.700"}
              background={active ? "twilight.500" : "transparent"}
              _hover={{}}
              _active={{}}
              transition=""
              onClick={() => nodeClick(node.key)}
            >
              <BsFillCaretRightFill />
              <Text pl="5px">{node.title}</Text>
            </Button>
            {node.children ? (
              <Box ml="12px">
                <Tree
                  treeData={node.children}
                  nodeClick={nodeClick}
                  activeNode={activeNode}
                ></Tree>
              </Box>
            ) : (
              undefined
            )}
          </Box>
        )
      })}
    </>
  )
}

const TreeRoot: React.FC<TreeProps> = args => {
  const [activeNode, setActiveNode] = useState<TreeNode["key"]>("")
  const nodeClick = (key: TreeNode["key"]) => {
    setActiveNode(key)
  }
  const ref = useRef<HTMLDivElement>(null)
  useClickAway(() => {
    setActiveNode("")
  }, ref)

  return (
    <div ref={ref}>
      <Tree {...args} nodeClick={nodeClick} activeNode={activeNode}></Tree>
    </div>
  )
}
export default TreeRoot
