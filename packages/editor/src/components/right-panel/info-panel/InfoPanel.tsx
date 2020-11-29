import React from "react"
import { Box, Button } from "@chakra-ui/react"
import PositionPad from "./position-pad"
import { useAddShape } from "../../../states/hooks"
import { useDeleteShape } from "../../../states/hooks/useDeleteShape"
import { useRecoilValue } from "recoil"
import { selectedShapeIdAtom } from "../../../states"

const InfoPanel: React.FC = () => {
  const selectedId = useRecoilValue(selectedShapeIdAtom)

  const addShape = useAddShape()
  const deleteShape = useDeleteShape()

  return (
    <Box>
      <PositionPad />
      <Button onClick={() => addShape({ type: "Rect" })}>new Rect</Button>
      <Button onClick={() => addShape({ type: "Circle" })}>new Circle</Button>
      <Button onClick={() => selectedId && deleteShape(selectedId)}>
        delete item: {selectedId}
      </Button>
    </Box>
  )
}

export default InfoPanel
