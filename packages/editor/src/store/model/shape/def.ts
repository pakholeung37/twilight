import { CircleModel, CircleModelOptions } from "./CircleModel";
import { EllipseModel, EllipseModelOptions } from "./EllipseModel";
import { RectModel, RectModelOptions } from "./RectModel";

export type ShapeOptions = RectModelOptions | CircleModelOptions | EllipseModelOptions
export type ShapeType = "Rect" | "Circle" | "Ellipse" | ""

export const ShapeModelDef = {
  Rect: RectModel,
  Circle: CircleModel,
  Ellipse: EllipseModel
}
