import React, { useState } from "react"
import { Stage } from "./index"

const stages: Map<HTMLDivElement, InstanceType<typeof Stage>> = new Map()

export function useSketch(root?: HTMLDivElement) {
  const [activeSketch, setActiveSketch] = useState<InstanceType<
    typeof Stage
  > | null>(null)
  if (root) {
    const stage = new Stage({
      container: root,
      width: 800,
      height: 600,
    })
    setActiveSketch(stage)
  }
  return [activeSketch, setActiveSketch] as const
}
