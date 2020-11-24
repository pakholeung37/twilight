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

export class ShapeFactory {
  public static get({ type, ...args }: Partial<ShapeState>): ShapeState {
    switch (type) {
      case "Circle":
        return {
          width: 50,
          height: 50,
          x: 10,
          y: 10,
          fill: "#ffff00",
          radius: 25,
          type,
          ...args,
        } as ShapeMeta<"Circle">
      case "Rect":
      default:
        return {
          width: 40,
          height: 40,
          x: 10,
          y: 10,
          fill: "#ffff00",
          type,
          ...args,
        } as ShapeMeta<"Rect">
    }
  }
}
export const selectedShapeIdAtom = atom<number | null>({
  key: "selected-shape-id",
  default: null,
})

export const nullShapeAtom = atom<ShapeState>({
  key: "shape-null",
  default: ShapeFactory.get({
    type: "Rect",
    width: undefined,
    height: undefined,
    x: undefined,
    y: undefined,
    fill: "#ffff00",
  }),
})

export const shapeIdsAtom = atom<number[]>({
  key: "shape-ids",
  default: [],
})
