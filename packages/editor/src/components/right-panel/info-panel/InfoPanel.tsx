import React from "react"
import { Box, Divider } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import PositionPad from "./position-pad"
import { useRootStore } from "../../../store"
import AlignPad from "./align-pad"
import StylePad from "./style-pad"

const InfoPanel: React.FC = () => {
  const {
    sketchStore: {},
  } = useRootStore()
  return (
    <Box>
      <AlignPad />
      <Divider />
      <PositionPad />
      <Divider />
      <StylePad />
    </Box>
  )
}

export default observer(InfoPanel)
