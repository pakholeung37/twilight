import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"

import { ColorPicker, ColorPickerProps } from "./index"

export default {
  title: "ColorPicker",
  component: ColorPicker,
} as Meta

const Template: Story = (args: ColorPickerProps) => (
  <ColorPicker {...args}></ColorPicker>
)

export const Base = Template.bind({})

Base.args = {
  onChange(color) {
    console.log(color)
  },
} as ColorPickerProps
