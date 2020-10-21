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

export const Draggable = Template.bind({})
Draggable.args = {
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
              children: [],
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
