import { Group as KonvaGroup } from "konva/types/Group"
import { NodeConfig } from "konva/types/Node"
import { Group } from "@twilight/react-konva"
import createPortalContainer from "./create-container"

const PortalGroup = createPortalContainer<KonvaGroup, NodeConfig, typeof Group>(
  Group,
)
export default PortalGroup
