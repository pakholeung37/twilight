import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"

import LeftPanel from "../index"

export default {
  title: "LeftPanel",
  component: LeftPanel,
} as Meta

const Template: Story = args => <LeftPanel {...args}></LeftPanel>

export const Base = Template.bind({})

Base.parameters = {
  layout: "fullscreen",
}
