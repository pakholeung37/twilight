import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"
import { createStore, RootStoreProvider } from "../../../../store"
import StylePad from "./index"

export default {
  title: "StylePad",
  component: StylePad,
} as Meta

const Template: Story = args => (
  <RootStoreProvider value={createStore()}>
    <StylePad {...args}></StylePad>
  </RootStoreProvider>
)

export const Base = Template.bind({})

Base.parameters = {
  layout: "fullscreen",
}
