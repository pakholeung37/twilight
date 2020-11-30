import React from "react"
import { Story } from "@storybook/react/types-6-0"
import Tree, { TreeProps } from "../Tree"

const Template: Story<TreeProps> = args => <Tree {...args}></Tree>

const baseArgs = {
  treeData: [
    {
      title: "容器 1",
      key: "0",
      expand: true,
      children: [
        {
          title: "容器 1-0",
          key: "1",
          expand: true,
          active: false,
          children: [
            {
              title: "叶子点",
              key: "2",
              active: true,
            },
            {
              title: "叶子点",
              key: "3",
              active: true,
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

export const Controlled = Template.bind({})
Controlled.args = baseArgs
