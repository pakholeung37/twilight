import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"

import Tree, { TreeProps } from "../Tree"

export default {
  title: "Tree",
  component: Tree,
} as Meta

const Template: Story<TreeProps> = args => <Tree {...args}></Tree>

export const Base = Template.bind({})
Base.args = {
  treeData: [
    {
      title: "parent 1",
      key: "0",
      children: [
        {
          title: "parent 1-0",
          key: "1",
          children: [
            {
              title: "leaf",
              key: "2",
            },
            {
              title: "leaf",
              key: "3",
            },
          ],
        },
        {
          title: "parent 1-1",
          key: "4",
          children: [
            {
              title: "leaf",
              key: "5",
            },
          ],
        },
      ],
    },
  ],
}
