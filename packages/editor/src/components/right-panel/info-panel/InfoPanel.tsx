import React from "react"
import { Box, Button } from "@chakra-ui/react"
import PositionPad from "./position-pad"
import { observer } from "mobx-react-lite"
import { useRootStore } from "../../../store"

const InfoPanel: React.FC = () => {
  const {
    sketchStore: { selectedShape, removeShape },
  } = useRootStore()
  return (
    <Box>
      <PositionPad />
      <Button onClick={() => selectedShape && removeShape(selectedShape)}>
        delete item: {selectedShape?.id}
      </Button>
    </Box>
  )
}

export default observer(InfoPanel)
