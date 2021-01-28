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
    <ChakraProvider theme={theme} resetCSS>
      <Global styles={normalize} />
      <StoryFn />
    </ChakraProvider>
  </Box>
)

export const decorators = [withChakra]
