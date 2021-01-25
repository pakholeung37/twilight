import React, { useRef, useState, useEffect, memo, useCallback } from "react"
import { Box, Text, Button } from "@chakra-ui/react"
import { Collapse } from "../collapse/Collapse"
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
  active?: boolean
  expand?: boolean
  key: string | number
  renderButton?: RenderButton
}

export interface TreeNodeProps {
  activeNode: string | number
  treeData: TreeNode
  depth: number
  // 当expand为boolean时, 该子节点是否展开为受控
  expand?: boolean
  // 当active为boolean时, 该子节点是否已激活为受控
  active?: boolean
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
  // 根提供的renderprop, 如果子节点没有renderButotn, 则fallback到此props
  renderButton?: RenderButton
}

const TreeNodeComponent: React.FC<TreeNodeProps> = memo(
  ({
    treeData,
    activeNode,
    depth,
    active,
    expand,
    draggable,
    isDragging,
    renderButton,
    nodeClick,
    nodeDragStart,
    nodeDragEnd,
  }) => {
    const node = treeData

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
    // drop event isHovering指示该组件是否被drag item hovering
    const [dropProps, { isHovering }] = useDrop({
      onDom(content, e) {
        console.log(`custom dropped: `, content, e)
      },
    })

    const [isExpanded, setExpand] = useState(false)
    const composeExpand = typeof expand === "boolean" ? expand : isExpanded
    const toggleExpand = useCallback(() => {
      setExpand(prev => !prev)
    }, [setExpand])
    // auto expand while hover on button
    useEffect(() => {
      const timer = setTimeout(() => {
        if (isHovering && !isExpanded) {
          setExpand(true)
        }
      }, 1000)
      return () => clearTimeout(timer)
    }, [isExpanded, isHovering])

    const composeActive =
      typeof active === "boolean" ? active : activeNode === node.key

    return (
      <Box>
        {draggable && isDragging && (
          <DropZone zIndex={depth} ml={`${(depth - 1) * 20}px`}></DropZone>
        )}
        {/* 使用renderprops来渲染子树按钮, 如果没有, 则会fallback */}
        {renderButton ? (
          renderButton({
            node,
            depth,
            active: composeActive,
            TreeIsDragging: isDragging,
            isHovering,
            isExpanded: composeExpand,
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
            color={composeActive ? "white" : "gray.700"}
            background={composeActive ? "twilight.500" : "transparent"}
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
            {/* 展开箭头 */}
            {(Array.isArray(node.children) && node.children.length) ||
            node.children ? (
              <Box as="span" pointerEvents="none" pr="5px">
                {composeExpand ? (
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
          <Collapse isOpen={composeExpand}>
            {node.children.map(node => (
              <TreeNodeComponent
                key={node.key}
                treeData={node}
                depth={depth + 1}
                expand={node.expand}
                active={node.active}
                draggable={draggable || false}
                isDragging={isDragging}
                nodeClick={nodeClick}
                nodeDragStart={nodeDragStart}
                nodeDragEnd={nodeDragEnd}
                activeNode={activeNode}
                renderButton={node.renderButton || renderButton}
              ></TreeNodeComponent>
            ))}
          </Collapse>
        ) : (
          <Collapse isOpen={composeExpand}>{node.children}</Collapse>
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
  },
)

const TreeRoot: React.FC<TreeProps> = memo(
  ({ treeData, draggable, renderButton }) => {
    const [activeNode, setActiveNode] = useState<TreeNode["key"]>("")
    const nodeClick = useCallback(
      ({ key }: TreeNode) => {
        setActiveNode(key)
      },
      [setActiveNode],
    )
    const [isNodeDragging, setNodeDragging] = useState<boolean>(false)
    const nodeDragStart = useCallback(() => {
      setNodeDragging(true)
    }, [setNodeDragging])
    const nodeDragEnd = useCallback(() => {
      setNodeDragging(false)
    }, [setNodeDragging])
    const ref = useRef<HTMLDivElement>(null)
    useClickAway(() => {
      setActiveNode("")
    }, ref)

    return (
      <div ref={ref}>
        {(Array.isArray(treeData) ? treeData : [treeData]).map(node => (
          <TreeNodeComponent
            key={node.key}
            treeData={node}
            depth={1}
            expand={node.expand}
            active={node.active}
            nodeClick={nodeClick}
            nodeDragStart={nodeDragStart}
            nodeDragEnd={nodeDragEnd}
            activeNode={activeNode}
            isDragging={isNodeDragging}
            draggable={draggable || false}
            renderButton={node.renderButton || renderButton}
          ></TreeNodeComponent>
        ))}
      </div>
    )
  },
)
export default TreeRoot
