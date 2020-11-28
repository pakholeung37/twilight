import React from "react"
import { ChakraProvider, Button } from "@chakra-ui/react"
import { RecoilRoot } from "recoil"
import theme from "../packages/editor/src/styles/theme"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const withChakra = (StoryFn: Function) => (
  <RecoilRoot>
    <ChakraProvider theme={theme}>
      <StoryFn />
    </ChakraProvider>
  </RecoilRoot>
)

export const decorators = [withChakra]
