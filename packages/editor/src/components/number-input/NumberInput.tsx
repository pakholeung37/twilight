import React, { memo } from "react"
import {
  InputGroup,
  InputRightElement,
  InputLeftElement,
  NumberInput as ChaNumberInput,
  NumberInputField,
  NumberInputProps,
  Text,
  Box,
} from "@chakra-ui/react"

export const NumberInput: React.FC<
  NumberInputProps & {
    prefix?: string
    suffix?: string
    pl?: number | string
    pr?: number | string
  }
> = memo(({ prefix, suffix, pl = 1, pr = 1, ...props }) => {
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
      <ChaNumberInput size="xs" precision={2} {...props}>
        <NumberInputField
          fontSize="xs"
          py="1"
          pl={pl}
          pr={pr}
          borderRadius="base"
        />
      </ChaNumberInput>
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
