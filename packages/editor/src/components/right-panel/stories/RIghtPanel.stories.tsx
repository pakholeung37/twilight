import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"

import RightPanel from "../index"

export default {
  title: "RightPanel",
  component: RightPanel,
} as Meta

const Template: Story = args => <RightPanel {...args}></RightPanel>

export const Base = Template.bind({})

Base.parameters = {
  layout: "fullscreen",
}
