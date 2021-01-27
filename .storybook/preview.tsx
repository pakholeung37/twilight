import React from "react"
import { ChakraProvider, Box } from "@chakra-ui/react"
import theme from "../packages/editor/src/styles/theme"
import { Global } from "@emotion/core"
import normalize from "emotion-normalize"
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const withChakra = (StoryFn: Function) => (
  <Box>
    <Global styles={normalize} />
    <ChakraProvider theme={theme}>
      <StoryFn />
    </ChakraProvider>
  </Box>
)

export const decorators = [withChakra]
