import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"

import StylePad from "../index"

export default {
  title: "StylePad",
  component: StylePad,
} as Meta

const Template: Story = args => <StylePad {...args}></StylePad>

export const Base = Template.bind({})

Base.parameters = {
  layout: "fullscreen",
}
