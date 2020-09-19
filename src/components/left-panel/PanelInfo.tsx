import React from "react"
import { Box, Text } from "@chakra-ui/core"

const PanelInfo: React.FC<{ title?: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <Box px="30px" py="10px">
      <Text color="textbase">{title}</Text>
      <Text color="gray.600" fontSize="sm" lineHeight="base">
        {subtitle}
      </Text>
    </Box>
  )
}

export default PanelInfo
