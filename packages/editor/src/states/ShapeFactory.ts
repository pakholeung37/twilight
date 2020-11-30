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
} from "@twilight/react-konva"

type NODES = {
  Layer: LayerConfig
  FastLayer: FastLayerConfig
  Group: GroupConfig
  Label: LabelConfig
  Rect: RectConfig
  Circle: CircleConfig
  Ellipse: EllipseConfig
  Wedge: WedgeConfig
  Line: LineConfig
  Sprite: SpriteConfig
  Image: ImageConfig
  Text: TextConfig
  TextPath: TextPathConfig
  Star: StarConfig
  Ring: RingConfig
  Arc: ArcConfig
  Tag: TagConfig
  Path: PathConfig
  RegularPolygon: RegularPolygonConfig
  Arrow: ArrowConfig
  Shape: ShapeConfig
  Transformer: TransformerConfig
}

export type NodeType = keyof NODES
export type ShapeMeta<T extends keyof NODES> = {
  type: T
  label: string
} & NODES[T]

export type ShapeState = ShapeMeta<"Rect"> | ShapeMeta<"Circle">

export interface ShapeFactoryInterface {
  get(options: ShapeOptions): ShapeState
}
export type ShapeOptions = Partial<ShapeState>

export class ShapeFactory implements ShapeFactoryInterface {
  public get({ type, ...args }: ShapeOptions): ShapeState {
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
          label: "circle",
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
          label: "rect",
          ...args,
        } as ShapeMeta<"Rect">
    }
  }
}
