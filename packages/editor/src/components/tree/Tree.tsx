import React, { useRef, useState, useEffect } from "react"
import { Box, Text, Button, BoxProps, ColorProps } from "@chakra-ui/react"
import { Collapse } from "./Collapse"
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai"
import { useClickAway, useDrag, useDrop } from "ahooks"
import { DropProps } from "ahooks/lib/useDrop/useDrop"
import DropZone from "./DropZone"

type DragProps = ReturnType<ReturnType<typeof useDrag>>
export interface RenderButton {
  (args: {
    node: TreeNode
    depth: number
    active: boolean
    TreeIsDragging: boolean
    isHovering: boolean
    isExpanded: boolean
    onClick: () => void
    dragDropProps: Partial<DropProps & DragProps>
  }): React.ReactNode
}

export type TreeNode = {
  title: string
  children?: Exclude<TreeNode[] | React.ReactNode, React.ReactNodeArray>
  key: string | number
  renderButton?: RenderButton
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
  renderButton?: RenderButton
}
export interface TreeProps {
  treeData: TreeNode[] | TreeNode
  draggable?: boolean
  renderButton?: RenderButton
}

const TreeNode: React.FC<TreeNodeProps> = ({
  treeData,
  activeNode,
  depth,
  draggable,
  isDragging,
  renderButton,
  nodeClick,
  nodeDragStart,
  nodeDragEnd,
}) => {
  const [isExpanded, setExpand] = useState(false)
  const toggleExpand = () => {
    setExpand(prev => !prev)
  }
  const node = treeData
  const active = activeNode === node.key

  // drag event
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
  // drop event
  const [dropProps, { isHovering }] = useDrop({
    onDom(content, e) {
      console.log(`custom dropped: `, content, e)
    },
  })

  // auto expand while hover on button
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isHovering && !isExpanded) {
        setExpand(true)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [isExpanded, isHovering])

  return (
    <Box>
      {draggable && isDragging && (
        <DropZone zIndex={depth} ml={`${(depth - 1) * 20}px`}></DropZone>
      )}
      {renderButton ? (
        renderButton({
          node,
          depth,
          active,
          TreeIsDragging: isDragging,
          isHovering,
          isExpanded,
          onClick: () => {
            toggleExpand()
            nodeClick?.(node)
          },
          dragDropProps: {
            ...(draggable ? getDragProps(node) : {}),
            ...(draggable && isDragging ? dropProps : {}),
          },
        })
      ) : (
        <Button
          as="div"
          w="100%"
          h="2rem"
          fontWeight="auto"
          fontSize="xs"
          pl={`calc(.5rem + ${(depth - 1) * 20}px)`}
          justifyContent="left"
          color={active ? "white" : "gray.700"}
          background={active ? "twilight.500" : "transparent"}
          border="2px"
          borderColor={
            isDragging && isHovering ? "twilight.500" : "transparent"
          }
          _hover={{}}
          _active={{}}
          transition=""
          boxSizing="border-box"
          onClick={() => {
            toggleExpand()
            nodeClick?.(node)
          }}
          {...(draggable ? getDragProps(node) : {})}
          {...(draggable && isDragging ? dropProps : {})}
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
      )}
      {Array.isArray(node.children) && node.children?.length ? (
        <Collapse isOpen={isExpanded}>
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
              renderButton={node.renderButton || renderButton}
            ></TreeNode>
          ))}
        </Collapse>
      ) : (
        <Collapse isOpen={isExpanded}>{node.children}</Collapse>
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

const TreeRoot: React.FC<TreeProps> = ({
  treeData,
  draggable,
  renderButton,
}) => {
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
          renderButton={node.renderButton || renderButton}
        ></TreeNode>
      ))}
    </div>
  )
}
export default TreeRoot
