import React, { memo } from "react"
import {
  InputGroup,
  InputRightElement,
  NumberInput as ChaNumberInput,
  NumberInputField,
  NumberInputProps,
  Text,
  Box,
} from "@chakra-ui/react"

const NumberInput: React.FC<NumberInputProps & { suffix: string }> = memo(
  ({ suffix, ...props }) => {
    return (
      <Box display="flex">
        <Text
          pr="1"
          color="textbase"
          fontSize="xs"
          height="100%"
          display="flex"
          alignItems="center"
        >
          {suffix}
        </Text>
        <InputGroup>
          <ChaNumberInput size="xs" precision={2} {...props}>
            <NumberInputField fontSize="xs" py="1" px="1" borderRadius="base" />
          </ChaNumberInput>
          <InputRightElement
            color={props.isDisabled ? "twilight.100" : "twilight.500"}
            fontSize="12px"
            fontWeight="400"
            pr="1"
          >
            <Text position="relative" top="2px" userSelect="none">
              px
            </Text>
          </InputRightElement>
        </InputGroup>
      </Box>
    )
  },
)

export default NumberInput
