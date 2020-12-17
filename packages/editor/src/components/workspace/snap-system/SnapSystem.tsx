import React from "react"
import { Group, Line } from "@twilight/react-konva"
import { useGuideLine } from "./useGuideLine"

export const SnapSystem: React.FC = () => {
  const { guideLineH, guideLineV } = useGuideLine()
  return (
    <Group>
      {guideLineH && (
        <Line points={guideLineH} strokeWidth={1} stroke="red"></Line>
      )}
      {guideLineV && (
        <Line points={guideLineV} strokeWidth={1} stroke="red"></Line>
      )}
    </Group>
  )
}
