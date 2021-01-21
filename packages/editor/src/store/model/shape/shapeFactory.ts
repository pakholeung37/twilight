import { RectModel, RectModelInterface } from "./RectModel";
import { ShapeModel } from "./ShapeModel";

type shapeOptions = RectModelInterface
const ModelDef = {
  Rect: RectModel
}
export class ShapeFactory {
  get({ type, ...args }: { type: keyof typeof ModelDef } & shapeOptions): ShapeModel {
    return new ModelDef[type](args)
  }
}

export const shapeFactory = new ShapeFactory()
