import React from "react"
import { Story } from "@storybook/react/types-6-0"
import { Flex, Text, Box } from "@chakra-ui/react"
import Tree, { TreeProps, RenderButton } from "../Tree"
import {
  AiOutlineFolder,
  AiOutlineFolderOpen,
  AiOutlineFile,
} from "react-icons/ai"

const Template: Story<TreeProps> = args => <Tree {...args}></Tree>

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
