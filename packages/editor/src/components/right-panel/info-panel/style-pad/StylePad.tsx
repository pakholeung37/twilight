import React, { useCallback } from "react"
import { Box, IconButton, Flex, Collapse } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import { useRootStore } from "../../../../store"
import { ExpandButton } from "../ExpandButton"

const StylePad: React.FC = () => {
  const {
    rightPanelStore: { stylePadExpand, setStylePadExpand },
  } = useRootStore()
  return (
    <Box>
      <ExpandButton
        title="样式"
        isExpanded={stylePadExpand}
        onClick={() => setStylePadExpand(!stylePadExpand)}
      />
      <Collapse in={stylePadExpand} animateOpacity>
        <Box p="4">helloworld</Box>
      </Collapse>
    </Box>
  )
}

export default observer(StylePad)
