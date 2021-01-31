import { theme, extendTheme } from "@chakra-ui/react"

const breakpoints: any = ["360px", "768px", "1024px", "1440px"]
breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

const baseStylePopper = {
  w: "100%",
  maxW: "xs",
  zIndex: 10,
}

export default extendTheme({
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
  },
  breakpoints,
  colors: {
    ...theme.colors,
    twilight: {
      50: "#ebf8ff",
      100: "#bee3f8",
      200: "#90cdf4",
      300: "#63b3ed",
      400: "#4299e1",
      500: "#3182ce",
      600: "#2b6cb0",
      700: "#2c5282",
      800: "#2a4365",
      900: "#1A365D",
    },
    disabled: "#E2E8F0",
    border: "#E2E8F0",
    borderdark: "#A0AEC0",
    divider: "#A0AEC0",
    textdark: "#171923",
    textbase: "#2D3748",
    textlight: "#A0AEC0",
    workspacebase: "#F9F9F9",
  },
  borders: {
    none: 0,
    "1px": "1px solid #E2E8F0",
    "2px": "2px solid #E2E8F0",
    "4px": "4px solid #E2E8F0",
    "8px": "8px solid #E2E8F0",
  },
  styles: {
    global: {
      body: {
        fontSize: "sm",
      },
    },
  },
  components: {
    Button: getDefaultProps(),
    Avatar: getDefaultProps(),
    Input: {
      baseStyle: {
        borderRadius: "xs",
      },
      defaultProps: {
        size: "xs",
      },
    },
    NumberInput: {
      defaultProps: {
        size: "xs",
      },
    },
    Popover: {
      variants: {
        responsive: {
          popper: {
            maxWidth: "unset",
            width: "unset",
          },
        },
      },
    },
  },
})

function getDefaultProps() {
  return {
    defaultProps: {
      size: "sm",
    },
  }
}
export type Theme = typeof theme
