import React from "react"
import { Group, Line } from "@twilight/react-konva"
import { useRootStore } from "../../../store"
import { observer } from "mobx-react-lite"
export const SnapSystem: React.FC = observer(function SnapSystem() {
  const {
    snapSystemStore: { snapLineH, snapLineV },
  } = useRootStore()
  return (
    <Group>
      {snapLineH && (
        <Line
          points={[-6000, snapLineH.offset, 6000, snapLineH.offset]}
          strokeWidth={1}
          stroke="red"
        ></Line>
      )}
      {snapLineV && (
        <Line
          points={[snapLineV.offset, -6000, snapLineV.offset, 6000]}
          strokeWidth={1}
          stroke="red"
        ></Line>
      )}
    </Group>
  )
})

export const SnapSystemRC: React.FC = observer(function SnapSystemRC() {
  const {
    snapSystemStore: { snapLineH, snapLineV },
  } = useRootStore()
  return (
    <>
      <div
        style={{
          display: snapLineH ? "block" : "none",
          backgroundColor: "red",
          position: "absolute",
          top: snapLineH ? snapLineH.offset + "px" : 0,
          height: "1px",
          left: 0,
          right: 0,
        }}
      ></div>
      <div
        style={{
          display: snapLineV ? "block" : "none",
          backgroundColor: "red",
          position: "absolute",
          left: snapLineV ? snapLineV.offset + "px" : 0,
          width: "1px",
          top: 0,
          bottom: 0,
        }}
      ></div>
    </>
  )
})
