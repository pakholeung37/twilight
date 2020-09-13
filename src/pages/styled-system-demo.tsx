import React from "react"
import {
  space,
  width,
  fontSize,
  color,
  SpaceProps,
  WidthProps,
  FontSizeProps,
  ColorProps,
} from "styled-system"
import styled, { ThemeProvider } from "styled-components"
import theme from "styles/theme"

const Box = styled.div<SpaceProps & WidthProps & FontSizeProps & ColorProps>`
  ${space}
  ${width}
  ${fontSize}
  ${color}
`
const StyledSystemDemo: React.FC = function() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box p={3} bg="whites.10" color="orange">
          This is a Box
        </Box>
      </ThemeProvider>
    </>
  )
}

export default StyledSystemDemo
