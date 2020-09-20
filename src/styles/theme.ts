import { theme } from "@chakra-ui/core"

const breakpoints: any = ["360px", "768px", "1024px", "1440px"]
breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

export default {
  ...theme,
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
    divider: "#A0AEC0",
    textdark: "#171923",
    textbase: "#2D3748",
    textlight: "#A0AEC0",
    workspacebase: "#EFECEA",
  },
}

export type Theme = typeof theme
