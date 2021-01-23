import React from "react"
import { ChakraProvider, Button } from "@chakra-ui/react"
import theme from "../packages/editor/src/styles/theme"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const withChakra = (StoryFn: Function) => (
  <ChakraProvider theme={theme}>
    <StoryFn />
  </ChakraProvider>
)

export const decorators = [withChakra]
