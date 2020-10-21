import * as React from "react"
import { ChakraProvider } from "@chakra-ui/core"
import { Global, css } from "@emotion/core"
import normalize from "emotion-normalize"
import { RecoilRoot } from "recoil"
import theme from "../src/styles/theme"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const withChakra = (StoryFn: Function) => (
  <RecoilRoot>
    <ChakraProvider theme={theme}>
      <Global
        styles={css`
          ${normalize}
        `}
      />
        <StoryFn />
    </ChakraProvider>
  </RecoilRoot>
)

export const decorators = [withChakra]
