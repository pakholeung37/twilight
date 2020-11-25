import { atom } from "recoil"
import {
  ArcConfig,
  ArrowConfig,
  CircleConfig,
  EllipseConfig,
  FastLayerConfig,
  GroupConfig,
  ImageConfig,
  LabelConfig,
  LayerConfig,
  LineConfig,
  PathConfig,
  RectConfig,
  RegularPolygonConfig,
  RingConfig,
  ShapeConfig,
  SpriteConfig,
  StarConfig,
  TagConfig,
  TextPathConfig,
  TextConfig,
  TransformerConfig,
  WedgeConfig,
} from "libs/sketch"

type NODES = {
  // Layer: LayerConfig
  // FastLayer: FastLayerConfig
  // Group: GroupConfig
  // Label: LabelConfig
  Rect: RectConfig
  Circle: CircleConfig
  // Ellipse: EllipseConfig
  // Wedge: WedgeConfig
  // Line: LineConfig
  // Sprite: SpriteConfig
  // Image: ImageConfig
  // Text: TextConfig
  // TextPath: TextPathConfig
  // Star: StarConfig
  // Ring: RingConfig
  // Arc: ArcConfig
  // Tag: TagConfig
  // Path: PathConfig
  // RegularPolygon: RegularPolygonConfig
  // Arrow: ArrowConfig
  // Shape: ShapeConfig
  // Transformer: TransformerConfig
}

export type NodeType = keyof NODES
export type ShapeMeta<T extends keyof NODES> = {
  type: T
} & NODES[T]

export type ShapeState = ShapeMeta<"Rect"> | ShapeMeta<"Circle">

export const selectedShapeIdAtom = atom<number>({
  key: "selected-shape-id",
  default: 0,
})

export const shapeIdsAtom = atom<number[]>({
  key: "shape-ids",
  default: [],
})
