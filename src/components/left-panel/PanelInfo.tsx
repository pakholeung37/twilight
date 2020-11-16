import React from "react"
import { Box, Text } from "@chakra-ui/react"

const PanelInfo: React.FC<{ title?: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <Box px="4" py="5">
      <Text color="textbase">{title}</Text>
      <Text color="gray.600" fontSize="xs" lineHeight="base">
        {subtitle}
      </Text>
    </Box>
  )
}

export default PanelInfo
