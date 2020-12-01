import React, { memo } from "react"
import {
  InputGroup,
  InputRightAddon,
  NumberInput as ChaNumberInput,
  NumberInputField,
  NumberInputProps,
} from "@chakra-ui/react"

const NumberInput: React.FC<NumberInputProps & { suffix: string }> = memo(({
  suffix,
  ...props
}) => {
  return (
    <InputGroup fontSize="xs">
      <ChaNumberInput precision={2} {...props}>
        <NumberInputField />
      </ChaNumberInput>
      <InputRightAddon>{suffix}</InputRightAddon>
    </InputGroup>
  )
})

export default NumberInput
