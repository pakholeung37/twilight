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
  name: string
} & NODES[T]

export type ShapeState = ShapeMeta<"Rect"> | ShapeMeta<"Circle">  | ShapeMeta<"Ellipse">

export interface ShapeFactoryInterface {
  get(options: ShapeOptions): ShapeState
}
export type ShapeOptions = Partial<ShapeState>

const defaultOptions = {
  Circle: {
    radius: 25,
    x: 10,
    y: 10,
    fill: "#ffff00",
    name: "circle",
  } as ShapeMeta<"Circle">,
  Rect: {
    width: 40,
    height: 40,
    x: 10,
    y: 10,
    fill: "#ffff00",
    name: "rect",
  } as ShapeMeta<"Rect">,
  Ellipse: {
    width: 50,
    height: 50,
    x: 30,
    y: 20,
    radiusX: 30,
    radiusY: 20,
    fill: "#ffff00",
    name: "ellipse"
  } as ShapeMeta<"Ellipse">
}
export class ShapeFactory implements ShapeFactoryInterface {
  public get({ type, ...args }: ShapeOptions): ShapeState {
    if(!type || !defaultOptions[type]) {
      throw new Error("not expected type")
    }
    return {
      ...defaultOptions[type],
      type,
      ...args,
    } as ShapeState
  }
}
