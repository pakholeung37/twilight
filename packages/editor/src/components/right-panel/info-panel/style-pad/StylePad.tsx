import React, { useCallback } from "react"
import { Box, IconButton, Flex, VStack, Divider } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import { useRootStore } from "../../../../store"
import { ExpandButton } from "../ExpandButton"
import { FillSection } from "./fill-section"
import { Collapse } from "../../../collapse"

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
      <Collapse isOpen={stylePadExpand}>
        <VStack px="3" spacing="0" divider={<Divider />}>
          <FillSection />
          <FillSection />
          <FillSection />
        </VStack>
      </Collapse>
    </Box>
  )
}

export default observer(StylePad)
