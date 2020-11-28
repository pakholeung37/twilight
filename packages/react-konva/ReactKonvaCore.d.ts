import * as React from "react"
import Konva from "konva"

export interface KonvaNodeEvents {
  onMouseOver?(evt: Konva.KonvaEventObject<MouseEvent>): void
  onMouseMove?(evt: Konva.KonvaEventObject<MouseEvent>): void
  onMouseOut?(evt: Konva.KonvaEventObject<MouseEvent>): void
  onMouseEnter?(evt: Konva.KonvaEventObject<MouseEvent>): void
  onMouseLeave?(evt: Konva.KonvaEventObject<MouseEvent>): void
  onMouseDown?(evt: Konva.KonvaEventObject<MouseEvent>): void
  onMouseUp?(evt: Konva.KonvaEventObject<MouseEvent>): void
  onWheel?(evt: Konva.KonvaEventObject<WheelEvent>): void
  onClick?(evt: Konva.KonvaEventObject<MouseEvent>): void
  onDblClick?(evt: Konva.KonvaEventObject<MouseEvent>): void
  onTouchStart?(evt: Konva.KonvaEventObject<TouchEvent>): void
  onTouchMove?(evt: Konva.KonvaEventObject<TouchEvent>): void
  onTouchEnd?(evt: Konva.KonvaEventObject<TouchEvent>): void
  onTap?(evt: Konva.KonvaEventObject<Event>): void
  onDblTap?(evt: Konva.KonvaEventObject<Event>): void
  onDragStart?(evt: Konva.KonvaEventObject<DragEvent>): void
  onDragMove?(evt: Konva.KonvaEventObject<DragEvent>): void
  onDragEnd?(evt: Konva.KonvaEventObject<DragEvent>): void
  onTransform?(evt: Konva.KonvaEventObject<Event>): void
  onTransformStart?(evt: Konva.KonvaEventObject<Event>): void
  onTransformEnd?(evt: Konva.KonvaEventObject<Event>): void
  onContextMenu?(evt: Konva.KonvaEventObject<PointerEvent>): void
}

export interface KonvaNodeComponent<
  Node extends Konva.Node,
  Props = Konva.NodeConfig
  // We use React.ClassAttributes to fake the 'ref' attribute. This will ensure
  // consumers get the proper 'Node' type in 'ref' instead of the wrapper
  // component type.
> extends React.SFC<Props & KonvaNodeEvents & React.ClassAttributes<Node>> {
  getPublicInstance(): Node
  getNativeNode(): Node
  // putEventListener(type: string, listener: Function): void;
  // handleEvent(event: Event): void;
}

export interface StageProps
  extends Konva.NodeConfig,
    KonvaNodeEvents,
    Pick<
      React.HTMLProps<any>,
      "className" | "role" | "style" | "tabIndex" | "title"
    > {
  onContentMouseover?(evt: any): void
  onContentMousemove?(evt: any): void
  onContentMouseout?(evt: any): void
  onContentMousedown?(evt: any): void
  onContentMouseup?(evt: any): void
  onContentClick?(evt: any): void
  onContentDblclick?(evt: any): void
  onContentTouchstart?(evt: any): void
  onContentTouchmove?(evt: any): void
  onContentTouchend?(evt: any): void
  onContentTap?(evt: any): void
  onContentDbltap?(evt: any): void
  onContentWheel?(evt: any): void
}

// Stage is the only real class because the others are stubs that only know how
// to be rendered when they are under stage. Since there is no real backing
// class and are in reality are a string literal we don't want users to actually
// try and use them as a type. By defining them as a variable with an interface
// consumers will not be able to use the values as a type or constructor.
// The down side to this approach, is that typescript thinks the type is a
// function, but if the user tries to call it a runtime exception will occur.
export const Stage: KonvaNodeComponent<Konva.Stage, StageProps>
export const Layer: KonvaNodeComponent<Konva.Layer, Konva.LayerConfig>
export const FastLayer: KonvaNodeComponent<Konva.FastLayer, Konva.LayerConfig>
export const Group: KonvaNodeComponent<Konva.Group>
export const Label: KonvaNodeComponent<Konva.Label>

/** Shapes */
export const Rect: KonvaNodeComponent<Konva.Rect, Konva.RectConfig>
export const Circle: KonvaNodeComponent<Konva.Circle, Konva.CircleConfig>
export const Ellipse: KonvaNodeComponent<Konva.Ellipse, Konva.EllipseConfig>
export const Wedge: KonvaNodeComponent<Konva.Wedge, Konva.WedgeConfig>
export const Transformer: KonvaNodeComponent<
  Konva.Transformer,
  Konva.TransformerConfig
>
export const Line: KonvaNodeComponent<Konva.Line, Konva.LineConfig>
export const Sprite: KonvaNodeComponent<Konva.Sprite, Konva.SpriteConfig>
export const Image: KonvaNodeComponent<Konva.Image, Konva.ImageConfig>
export const Text: KonvaNodeComponent<Konva.Text, Konva.TextConfig>
export const TextPath: KonvaNodeComponent<Konva.TextPath, Konva.TextPathConfig>
export const Star: KonvaNodeComponent<Konva.Star, Konva.StarConfig>
export const Ring: KonvaNodeComponent<Konva.Ring, Konva.RingConfig>
export const Arc: KonvaNodeComponent<Konva.Arc, Konva.ArcConfig>
export const Tag: KonvaNodeComponent<Konva.Tag, Konva.TagConfig>
export const Path: KonvaNodeComponent<Konva.Path, Konva.PathConfig>
export const RegularPolygon: KonvaNodeComponent<
  Konva.RegularPolygon,
  Konva.RegularPolygonConfig
>
export const Arrow: KonvaNodeComponent<Konva.Arrow, Konva.ArrowConfig>
export const Shape: KonvaNodeComponent<Konva.Shape, Konva.ShapeConfig>

export type LayerProps = Konva.LayerConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.Layer>
export type FastLayerProps = Konva.LayerConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.FastLayer>
export type GroupProps = Konva.NodeConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.Group>
export type LabelProps = Konva.NodeConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.Label>

/** Shapes */
export type RectProps = Konva.RectConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.Rect>
export type CircleProps = Konva.CircleConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.Circle>
export type EllipseProps = Konva.EllipseConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.Ellipse>
export type WedgeProps = Konva.WedgeConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.Wedge>
export type TransformerProps = Konva.TransformerConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.Transformer>
export type LineProps = Konva.LineConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.Line>
export type SpriteProps = Konva.SpriteConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.Sprite>
export type ImageProps = Konva.ImageConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.Image>
export type TextProps = Konva.TextConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.Text>
export type TextPathProps = Konva.TextPathConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.TextPath>
export type StarProps = Konva.StarConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.Star>
export type RingProps = Konva.RingConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.Ring>
export type ArcProps = Konva.ArcConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.Arc>
export type TagProps = Konva.TagConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.Tag>
export type PathProps = Konva.PathConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.Path>
export type RegularPolygonProps = Konva.RegularPolygonConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.RegularPolygon>
export type ArrowProps = Konva.ArrowConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.Arrow>
export type ShapeProps = Konva.ShapeConfig &
  KonvaNodeEvents &
  React.ClassAttributes<Konva.Shape>

export type LayerConfig = Konva.LayerConfig
export type FastLayerConfig = Konva.LayerConfig
export type GroupConfig = Konva.NodeConfig
export type LabelConfig = Konva.NodeConfig

export type RectConfig = Konva.RectConfig
export type CircleConfig = Konva.CircleConfig
export type EllipseConfig = Konva.EllipseConfig
export type WedgeConfig = Konva.WedgeConfig
export type TransformerConfig = Konva.TransformerConfig
export type LineConfig = Konva.LineConfig
export type SpriteConfig = Konva.SpriteConfig
export type ImageConfig = Konva.ImageConfig
export type TextConfig = Konva.TextConfig
export type TextPathConfig = Konva.TextPathConfig
export type StarConfig = Konva.StarConfig
export type RingConfig = Konva.RingConfig
export type ArcConfig = Konva.ArcConfig
export type TagConfig = Konva.TagConfig
export type PathConfig = Konva.PathConfig
export type RegularPolygonConfig = Konva.RegularPolygonConfig
export type ArrowConfig = Konva.ArrowConfig
export type ShapeConfig = Konva.ShapeConfig

export const useStrictMode: (useStrictMode: boolean) => void
