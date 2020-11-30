import React from "react"
import { Story } from "@storybook/react/types-6-0"
import Tree, { TreeProps } from "../Tree"

const Template: Story<TreeProps> = args => <Tree {...args}></Tree>

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

export const Base = Template.bind({})
Base.args = baseArgs

export const Draggable = Template.bind({})

Draggable.args = {
  ...baseArgs,
  draggable: true,
}
