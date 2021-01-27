import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"

import { ColorPicker } from "./index"

export default {
  title: "ColorPicker",
  component: ColorPicker,
} as Meta

const Template: Story = args => <ColorPicker {...args}></ColorPicker>

export const Base = Template.bind({})

Base.parameters = {
  layout: "fullscreen",
}
