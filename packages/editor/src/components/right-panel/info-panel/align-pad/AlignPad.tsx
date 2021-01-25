import React, { useCallback } from "react"
import { Box, IconButton, Flex } from "@chakra-ui/react"
import {
  CgAlignLeft,
  CgAlignCenter,
  CgAlignRight,
  CgAlignTop,
  CgAlignMiddle,
  CgAlignBottom,
} from "react-icons/cg"
import { observer } from "mobx-react-lite"
import { IconType } from "react-icons/lib"
import { useRootStore } from "../../../../store"

const AlignButton = ({
  Icon,
  label,
  disabled,
}: {
  Icon: IconType
  label: string
  disabled?: boolean
}) => {
  return (
    <IconButton
      aria-label={label}
      title={label}
      mx="4px"
      size="xs"
      color={disabled ? "twilight.200" : "twilight.500"}
      disabled={disabled}
      icon={<Icon size="20px" />}
      background="none"
    ></IconButton>
  )
}
const AlignPad: React.FC = () => {
  const {
    sketchStore: { selectedShape },
  } = useRootStore()
  const buttonDef = [
    { label: "Align to left", Icon: CgAlignLeft },
    { label: "Align to center", Icon: CgAlignCenter },
    { label: "Align to right", Icon: CgAlignRight },
    { label: "Align to top", Icon: CgAlignTop },
    { label: "Align to middle", Icon: CgAlignMiddle },
    { label: "Align to bottom", Icon: CgAlignBottom },
  ]
  return (
    <Box>
      <Flex px="12px" py="4px" align="center" justify="center">
        {buttonDef.map((def, index) => (
          <AlignButton {...def} disabled={!selectedShape} key={index} />
        ))}
      </Flex>
    </Box>
  )
}

export default observer(AlignPad)
