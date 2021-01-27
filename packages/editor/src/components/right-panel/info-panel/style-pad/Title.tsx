import React, { ChangeEvent } from "react"
import { Box, Flex, Switch, Text } from "@chakra-ui/react"

export const Title: React.FC<{
  text: string
  open: boolean
  onChange: (value: boolean) => void
}> = function Title({ text, open, onChange }) {
  return (
    <Flex justify="space-between" align="center" h="10" w="100%">
      <Text>{text}</Text>
      <Switch
        size="sm"
        isChecked={open}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.checked)
        }
      />
    </Flex>
  )
}
