import React from "react"
import { useRecoilValue } from "recoil"
// TODO 这个依赖需要去掉
import Konva from "konva"

export class SnapSystemManager {
  constructor() {}
  addNode(node: Konva.Node) {}
  removeNode(node: Konva.Node) {}
}

export const snapSystemManager = new SnapSystemManager()
export const SnapSystem: React.FC = () => {
  return <div></div>
}
