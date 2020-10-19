import * as React from "react"
import { ChakraProvider } from "@chakra-ui/core"
import { Global, css } from "@emotion/core"
import normalize from "emotion-normalize"
import theme from "../src/styles/theme"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const withChakra = (StoryFn: Function) => (
  <ChakraProvider theme={theme}>
    <Global
      styles={css`
        ${normalize}
      `}
    />
      <StoryFn />
  </ChakraProvider>
)

export const decorators = [withChakra]
