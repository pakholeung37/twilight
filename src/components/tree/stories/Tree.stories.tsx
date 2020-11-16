import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"
import { Flex, Text, Box } from "@chakra-ui/react"
import Tree, { TreeProps, RenderButton } from "../Tree"
import {
  AiOutlineFolder,
  AiOutlineFolderOpen,
  AiOutlineFile,
} from "react-icons/ai"
export default {
  title: "Tree",
  component: Tree,
} as Meta

const baseArgs = {
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

const Template: Story<TreeProps> = args => <Tree {...args}></Tree>

export const Base = Template.bind({})
Base.args = baseArgs

export const Draggable = Template.bind({})

Draggable.args = {
  ...baseArgs,
  draggable: true,
}

export const HybridNode = Template.bind({})
HybridNode.args = {
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
              title: "叶子点 - reactNode",
              key: "2",
              children: <div>helloworld</div>,
            },
            {
              title: "叶子点 - reactNode",
              key: "3",
              children: (
                <div>
                  <ul>
                    <li>h</li>
                    <li>e</li>
                    <li>l</li>
                    <li>l</li>
                    <li>o</li>
                  </ul>
                </div>
              ),
            },
          ],
        },
        {
          title: "容器 1-1",
          key: "4",
          children: [
            {
              title: "叶子点 - string",
              key: "5",
              children: "helloworld",
            },
            {
              title: "叶子点 - number",
              key: "6",
              children: 2020,
            },
          ],
        },
      ],
    },
  ],
  draggable: true,
}

const Template2: Story<TreeProps> = args => <Tree {...args}></Tree>

export const Recursive = Template2.bind({})
const subTreeData = {
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
              title: "叶子点 - reactNode",
              key: "2",
              children: <div>helloworld</div>,
            },
            {
              title: "叶子点 - reactNode",
              key: "3",
              children: (
                <div>
                  <ul>
                    <li>h</li>
                    <li>e</li>
                    <li>l</li>
                    <li>l</li>
                    <li>o</li>
                  </ul>
                </div>
              ),
            },
          ],
        },
        {
          title: "容器 1-1",
          key: "4",
          children: [
            {
              title: "叶子点 - string",
              key: "5",
              children: "helloworld",
            },
            {
              title: "叶子点 - number",
              key: "6",
              children: 2020,
            },
          ],
        },
      ],
    },
  ],
  draggable: true,
}

Recursive.args = {
  treeData: [
    {
      title: "画板 1",
      key: "101",
      children: <Tree {...subTreeData}></Tree>,
    },
    {
      title: "画板 2",
      key: "102",
      children: <Tree {...subTreeData}></Tree>,
    },
  ],
  draggable: true,
}

export const Render_Button = Template.bind({})
const customButton: RenderButton = ({
  node,
  onClick,
  dragDropProps,
  isExpanded,
  depth,
}) => {
  return (
    <Box
      as="div"
      pl={`calc(.5rem + ${(depth - 1) * 20}px)`}
      backgroundColor="transparent"
      onClick={onClick}
      color="gray.700"
      {...dragDropProps}
    >
      <Flex>
        <Box mt="2px" mr="5px">
          {!node.children ? (
            <AiOutlineFile />
          ) : isExpanded ? (
            <AiOutlineFolderOpen />
          ) : (
            <AiOutlineFolder />
          )}
        </Box>
        <Text fontSize="sm">{node.title}</Text>
      </Flex>
    </Box>
  )
}
Render_Button.args = {
  treeData: [
    {
      title: "文件夹 1",
      key: "0",
      children: [
        {
          title: "文件夹 1-0",
          key: "1",
          children: [
            {
              title: "文件",
              key: "2",
            },
            {
              title: "文件",
              key: "3",
            },
          ],
        },
        {
          title: "文件夹 1-1",
          key: "4",
          children: [
            {
              title: "文件",
              key: "5",
            },
          ],
        },
      ],
    },
  ],
  draggable: true,
  renderButton: customButton,
}
