import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"

import AlignPad from "../index"

export default {
  title: "AlignPad",
  component: AlignPad,
} as Meta

const Template: Story = args => <AlignPad {...args}></AlignPad>

export const Base = Template.bind({})

Base.parameters = {
  layout: "fullscreen",
}
