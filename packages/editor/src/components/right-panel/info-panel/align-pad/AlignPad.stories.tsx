import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"
import { createStore, RootStoreProvider } from "../../../../store"
import AlignPad from "./index"

export default {
  title: "AlignPad",
  component: AlignPad,
} as Meta

const Template: Story = args => (
  <RootStoreProvider value={createStore()}>
    <AlignPad {...args}></AlignPad>
  </RootStoreProvider>
)

export const Base = Template.bind({})

Base.parameters = {
  layout: "fullscreen",
}
