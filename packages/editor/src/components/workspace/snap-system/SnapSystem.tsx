import React from "react"
import { Group, Line } from "@twilight/react-konva"
import { useGuideLine } from "./useGuideLine"

export const SnapSystem: React.FC = () => {
  const { guideLineH, guideLineV } = useGuideLine()
  return (
    <Group>
      {guideLineH && (
        <Line
          points={[
            -6000,
            Math.round(guideLineH.offset),
            6000,
            Math.round(guideLineH.offset),
          ]}
          strokeWidth={1}
          stroke="red"
        ></Line>
      )}
      {guideLineV && (
        <Line
          points={[
            Math.round(guideLineV.offset),
            -6000,
            Math.round(guideLineV.offset),
            6000,
          ]}
          strokeWidth={1}
          stroke="red"
        ></Line>
      )}
    </Group>
  )
}

export const SnapSystemRC: React.FC = () => {
  const { guideLineH, guideLineV } = useGuideLine()
  return (
    <>
      <div
        style={{
          display: guideLineH ? "block" : "none",
          backgroundColor: "red",
          position: "absolute",
          top: guideLineH ? guideLineH.offset + "px" : 0,
          height: "1px",
          left: 0,
          right: 0,
        }}
      ></div>
      <div
        style={{
          display: guideLineV ? "block" : "none",
          backgroundColor: "red",
          position: "absolute",
          left: guideLineV ? guideLineV.offset + "px" : 0,
          width: "1px",
          top: 0,
          bottom: 0,
        }}
      ></div>
    </>
  )
}
