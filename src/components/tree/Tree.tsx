import React, { useRef, useState, useEffect } from "react"
import { Box, Text, Button, BoxProps, Collapse } from "@chakra-ui/core"
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai"
import { useClickAway, useDrag, useDrop } from "ahooks"
import DropZone from "./DropZone"

export type TreeNode = {
  title: string
  children?: Exclude<TreeNode[] | React.ReactNode, React.ReactNodeArray>
  key: string | number
}

export interface TreeNodeProps {
  activeNode: string | number
  treeData: TreeNode
  depth: number
  draggable?: boolean
  isDragging: boolean
  nodeClick?: (node: TreeNode) => void
  nodeDragStart?: (node: TreeNode, e: React.DragEvent | undefined) => void
  nodeDragEnd?: (node: TreeNode, e: React.DragEvent | undefined) => void
}
export interface TreeProps {
  treeData: TreeNode[] | TreeNode
  draggable?: boolean
}

const TreeNode: React.FC<TreeNodeProps> = ({
  treeData,
  activeNode,
  depth,
  draggable,
  isDragging,
  nodeClick,
  nodeDragStart,
  nodeDragEnd,
}) => {
  const [isExpand, setExpand] = useState(false)
  const toggleExpand = () => {
    setExpand(prev => !prev)
  }
  const node = treeData
  const active = activeNode === node.key

  const getDragProps = useDrag({
    onDragStart(data, e) {
      nodeDragStart?.(data, e)
      console.log("dragStart")
    },
    onDragEnd(data, e) {
      nodeDragEnd?.(data, e)
      console.log("dragEnd", data, e)
    },
  })
  const [getDropProps, { isHovering }] = useDrop({
    onDom(content, e) {
      console.log(`custom dropped: `, content, e)
    },
  })
  return (
    <Box>
      {draggable && isDragging && (
        <DropZone zIndex={depth} ml={`${(depth - 1) * 20}px`}></DropZone>
      )}
      <Button
        as="div"
        w="100%"
        h="2rem"
        fontWeight=""
        fontSize="1rem"
        pl={`calc(.5rem + ${(depth - 1) * 20}px)`}
        justifyContent="left"
        color={active ? "white" : "gray.700"}
        background={active ? "twilight.500" : "transparent"}
        border="2px"
        borderColor={isDragging && isHovering ? "twilight.500" : "transparent"}
        _hover={{}}
        _active={{}}
        transition=""
        boxSizing="border-box"
        onClick={() => {
          toggleExpand()
          nodeClick?.(node)
        }}
        {...(draggable ? getDragProps(node) : {})}
        {...(draggable && isDragging ? getDropProps : {})}
      >
        {(Array.isArray(node.children) && node.children.length) ||
        node.children ? (
          <Box as="span" pointerEvents="none" pr="5px">
            {isExpand ? (
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
      {Array.isArray(node.children) && node.children?.length ? (
        <Collapse isOpen={isExpand}>
          {node.children.map(node => (
            <TreeNode
              key={node.key}
              treeData={node}
              depth={depth + 1}
              draggable={draggable || false}
              isDragging={isDragging}
              nodeClick={nodeClick}
              nodeDragStart={nodeDragStart}
              nodeDragEnd={nodeDragEnd}
              activeNode={activeNode}
            ></TreeNode>
          ))}
        </Collapse>
      ) : (
        <Collapse isOpen={isExpand}>{node.children}</Collapse>
      )}
      {draggable && isDragging && (
        <DropZone
          zIndex={depth + 1}
          onHover={(dragLeave: any) => {
            node.children && dragLeave()
            setExpand(true)
          }}
          ml={`${(depth - 1) * 20}px`}
        ></DropZone>
      )}
    </Box>
  )
}

const TreeRoot: React.FC<TreeProps> = ({ treeData, draggable }) => {
  const [activeNode, setActiveNode] = useState<TreeNode["key"]>("")
  const nodeClick = ({ key }: TreeNode) => {
    setActiveNode(key)
  }
  const [isNodeDragging, setNodeDragging] = useState<boolean>(false)
  const nodeDragStart = () => {
    setNodeDragging(true)
  }
  const nodeDragEnd = () => {
    setNodeDragging(false)
  }
  const ref = useRef<HTMLDivElement>(null)
  useClickAway(() => {
    setActiveNode("")
  }, ref)

  return (
    <div ref={ref}>
      {(Array.isArray(treeData) ? treeData : [treeData]).map(node => (
        <TreeNode
          key={node.key}
          treeData={node}
          depth={1}
          nodeClick={nodeClick}
          nodeDragStart={nodeDragStart}
          nodeDragEnd={nodeDragEnd}
          activeNode={activeNode}
          isDragging={isNodeDragging}
          draggable={draggable || false}
        ></TreeNode>
      ))}
    </div>
  )
}
export default TreeRoot
