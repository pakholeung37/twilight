import React, { memo } from "react"
import {
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  InputProps,
  Text,
} from "@chakra-ui/react"

export const Input: React.FC<
  InputProps & {
    prefix?: string
    suffix?: string
  }
> = memo(({ prefix, suffix, ...props }) => {
  return (
    <InputGroup>
      {prefix && (
        <InputLeftElement
          color={props.isDisabled ? "twilight.100" : "twilight.500"}
          fontSize="12px"
          fontWeight="400"
          pl="1"
        >
          <Text position="relative" top="2px" userSelect="none">
            {prefix}
          </Text>
        </InputLeftElement>
      )}
      <ChakraInput
        size="xs"
        fontSize="xs"
        py="1"
        px="1"
        borderRadius="base"
        {...props}
      />
      {suffix && (
        <InputRightElement
          color={props.isDisabled ? "twilight.100" : "twilight.500"}
          fontSize="12px"
          fontWeight="400"
          pr="1"
        >
          <Text position="relative" top="2px" userSelect="none">
            {suffix}
          </Text>
        </InputRightElement>
      )}
    </InputGroup>
  )
})
