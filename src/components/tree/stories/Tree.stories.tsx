import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"

import Tree from "../Tree"

export default {
  title: "Tree",
  component: Tree,
} as Meta

const Template: Story<{ arg1: boolean }> = args => <Tree {...args}></Tree>

export const Base = Template.bind({})
Base.args = {
  arg1: true,
}
