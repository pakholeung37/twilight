import React, { useCallback, useState } from "react"
import { Story, Meta } from "@storybook/react/types-6-0"

import { ColorPicker, ColorPickerProps } from "./index"

export default {
  title: "ColorPicker",
  component: ColorPicker,
} as Meta

const Template: Story<ColorPickerProps> = ({
  hsv: initHsv,
  alpha: initAlpha,
}) => {
  const [hsv, setHsv] = useState(initHsv)
  const [alpha, setAlpha] = useState(initAlpha)

  const onChange = useCallback(
    (hsv: any, alpha: number) => {
      setHsv(hsv)
      setAlpha(alpha)
    },
    [setHsv, setAlpha],
  )
  return <ColorPicker hsv={hsv} alpha={alpha} onChange={onChange}></ColorPicker>
}

export const Base = Template.bind({})

Base.args = {
  hsv: [180, 100, 100],
  alpha: 80,
} as ColorPickerProps
