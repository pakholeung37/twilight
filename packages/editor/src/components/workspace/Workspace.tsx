import React, { useRef } from "react"
import { observer } from "mobx-react-lite"
import { Box, ThemeProvider } from "@chakra-ui/react"
import { Stage, Layer, Group } from "@twilight/react-konva"
import Sketch from "../../components/sketch"
import theme from "../../styles/theme"
import { useSize } from "ahooks"
import { SnapSystem, SnapSystemRC } from "./snap-system"
import { rootStore, RootStoreProvider, useRootStore } from "../../store"

const WorkSpace: React.FC = () => {
  const workspaceRef = useRef<HTMLDivElement>(null)

  const { width, height } = useSize(workspaceRef)
  const {
    sketchStore: { setSelectedShape },
  } = useRootStore()
  return (
    <Box
      bg="workspacebase"
      ref={workspaceRef}
      h="100%"
      flexGrow={1}
      position="relative"
    >
      {/* <Flex
        justify="center"
        align="center"
        h="100%"
        w="100%"
        position="absolute"
      >
    </Flex> */}
      <Box position="absolute">
        <Stage
          width={width}
          height={height}
          onClick={() => setSelectedShape(null)}
        >
          <RootStoreProvider value={rootStore}>
            <ThemeProvider theme={theme}>
              <Layer>
                <Group offsetX={-100} offsetY={-200}>
                  <Sketch />
                </Group>
                <SnapSystem />
              </Layer>
            </ThemeProvider>
          </RootStoreProvider>
        </Stage>
      </Box>
      {/* <SnapSystemRC /> */}
    </Box>
  )
}

export default observer(WorkSpace)
