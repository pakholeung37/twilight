import React, { useRef, useState, useEffect } from "react"
import { Box, Text, Button, BoxProps, useUpdateEffect } from "@chakra-ui/core"
import { BsFillCaretRightFill } from "react-icons/bs"
import { useClickAway, useDrag, useDrop, useTimeout, useUpdate } from "ahooks"

export type TreeNode = {
  title: string
  children?: TreeNode[]
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

const DropZone: React.FC<BoxProps & {
  onHover?: () => void
  onDrop?: (content: any, event: React.DragEvent<Element> | undefined) => void
  active: boolean
}> = ({ active, onHover, onDrop, ...args }) => {
  const [porps, { isHovering }] = useDrop({
    onDom(content, e) {
      onDrop?.(content, e)
      console.log(`custom dropped: `, content, e)
    },
  })
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("useTimeout")
      if (isHovering) {
        onHover?.()
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [isHovering, onHover])
  return (
    <Box w="100%" position="relative" {...args}>
      <Box
        className="drop-zone"
        {...porps}
        h="18px"
        w="100%"
        position="absolute"
        top="-7px"
        pointerEvents={active ? "auto" : "none"}
      ></Box>
      <Box
        borderBottom="2px"
        borderColor={isHovering ? "twilight.500" : "transparent"}
        position="absolute"
        w="100%"
        pointerEvents="none"
        _after={{
          content: `""`,
          borderRadius: "4px",
          border: "4px",
          borderColor: isHovering ? "twilight.500" : "transparent",
          position: "absolute",
          top: "-3px",
        }}
      ></Box>
    </Box>
  )
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
      {draggable && <DropZone zIndex={depth} active={isDragging}></DropZone>}
      <Button
        as="div"
        w="100%"
        h="1.6rem"
        fontWeight=""
        justifyContent="left"
        color={active ? "white" : "gray.700"}
        background={active ? "twilight.500" : "transparent"}
        border="2px"
        borderColor={isHovering ? "twilight.500" : "transparent"}
        _hover={{}}
        _active={{}}
        transition=""
        boxSizing="border-box"
        onClick={() => {
          toggleExpand()
          nodeClick?.(node)
        }}
        {...(draggable ? getDragProps(node) : {})}
        {...(draggable ? getDropProps : {})}
      >
        {node.children && (
          <Box
            as="span"
            transform={isExpand ? "rotate(90deg)" : ""}
            pointerEvents="none"
          >
            <BsFillCaretRightFill pointerEvents="none" />
          </Box>
        )}
        <Text pl="5px" pointerEvents="none">
          {node.title}
        </Text>
      </Button>
      {node.children && (
        <Box ml="20px" display={isExpand ? "block" : "none"}>
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
        </Box>
      )}
      {draggable && (
        <DropZone
          zIndex={depth + 1}
          active={isDragging}
          onHover={() => setExpand(true)}
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
