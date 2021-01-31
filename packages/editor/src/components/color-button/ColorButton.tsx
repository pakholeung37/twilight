import React, { memo, ReactNode } from "react"
import {
  ButtonProps,
  UsePopoverProps,
  Button,
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react"
import { ColorPicker } from "../color-picker"
import { HSV } from "color-convert/conversions"
import { hsvToHsl, transparentBgUrl } from "../../utils"
import { observer } from "mobx-react-lite"

export type ColorButtonProps = {
  hsv: HSV
  alpha: number
  placement?: UsePopoverProps["placement"]
  onHsvChange?: (color: HSV, alpha: number) => void
} & ButtonProps

const PickerPopover: React.FC<{
  content: ReactNode
  trigger: ReactNode
  placement?: UsePopoverProps["placement"]
}> = memo(({ content, trigger, placement = "auto" }) => {
  return (
    <Popover variant="responsive" placement={placement} isLazy>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent w="232px">
        <PopoverArrow />
        <PopoverBody>{content}</PopoverBody>
      </PopoverContent>
    </Popover>
  )
})

export const ColorButton: React.FC<ColorButtonProps> = observer(
  function ColorButton({
    hsv,
    alpha,
    onHsvChange,
    placement = "auto",
    ...props
  }) {
    const hsl = hsvToHsl(hsv)
    const h = hsl[0]
    const s = hsl[1] + "%"
    const l = hsl[2] + "%"
    return (
      <PickerPopover
        placement="bottom-start"
        content={
          <Box w="100%">
            <ColorPicker hsv={hsv} alpha={alpha} onChange={onHsvChange} />
          </Box>
        }
        trigger={
          <Box
            h="24px"
            w="32px"
            background={`url("${transparentBgUrl}") center repeat`}
            rounded="md"
          >
            <Button
              aria-label="color"
              h="100%"
              w="100%"
              borderRadius="base"
              style={{
                background: `hsla(${h}, ${s}, ${l}, ${alpha / 100})`,
              }}
              flexShrink={0}
            />
          </Box>
        }
      />
    )
  },
)
