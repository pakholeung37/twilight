import React from "react"
import { Box, Divider } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import { useRootStore } from "../../../store"
import PositionPad from "./position-pad"
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
