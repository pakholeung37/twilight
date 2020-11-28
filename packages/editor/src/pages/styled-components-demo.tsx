import React, { useRef } from "react"
import styled, { ThemeProvider, withTheme } from "styled-components"

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  color: ${props => props.theme.fg};
  border: 2px solid ${props => props.theme.fg};
  background: ${props => props.theme.bg};
`
const theme = {
  fg: "palevioletred",
  bg: "white",
}

const invertTheme = ({ fg, bg }: { fg: string; bg: string }) => ({
  fg: bg,
  bg: fg,
})
const ReversedButton = (props: any) => (
  <Button {...props}>{props.children.split("").reverse()} </Button>
)

const Input = styled.input.attrs(props => ({
  type: "password",
  size: props.size || "1em",
}))<{ inputColor?: string }>`
  color: ${props => props.inputColor || "palevioletred"};
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  margin: ${props => props.size};
  padding: ${props => props.size};
`

const NormalButton: React.FC<{
  theme?: typeof theme
  children: any
}> = function ({ theme, children }) {
  return (
    <button style={theme ? { color: theme.fg, background: theme.bg } : {}}>
      {children}
    </button>
  )
}
class NButton extends React.Component<{
  theme?: typeof theme
  children: any
}> {
  render() {
    const { theme } = this.props || { theme: {} }
    return (
      <button style={theme ? { color: theme.fg, background: theme.bg } : {}}>
        {this.props.children}
      </button>
    )
  }
}
const WithThemeButton = withTheme(NButton)
const AnotherWithThemeButton = withTheme(NormalButton)

// ref
const RInput = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`
const Form: React.FC = function () {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <RInput
      ref={inputRef}
      placeholder="Hover to focus!"
      onMouseEnter={() => inputRef.current?.focus()}
    ></RInput>
  )
}

const StyledComponentsDemo: React.FC = function () {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Button>button</Button>
        <ThemeProvider theme={invertTheme}>
          <ReversedButton>reverse button</ReversedButton>
          <AnotherWithThemeButton>abcde</AnotherWithThemeButton>
          <WithThemeButton>abdegde</WithThemeButton>
        </ThemeProvider>
        <Input size="3em" placeholder="a big text input" inputColor="red" />
        <Form></Form>
      </ThemeProvider>
    </>
  )
}
export default StyledComponentsDemo
