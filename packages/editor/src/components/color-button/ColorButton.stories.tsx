import React, { useCallback, useState } from "react"
import { Story, Meta } from "@storybook/react/types-6-0"

import { ColorButton, ColorButtonProps } from "./index"

export default {
  title: "ColorButton",
  component: ColorButton,
} as Meta

const Template: Story<ColorButtonProps> = props => {
  return <ColorButton {...props}></ColorButton>
}

export const Base = Template.bind({})

Base.args = {
  hsv: [180, 50, 100],
  alpha: 80,
} as ColorButtonProps
