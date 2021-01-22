import { RectModel, RectModelOptions } from "./RectModel";
import { ShapeModel, ShapeType } from "./ShapeModel";

export type ShapeOptions = RectModelOptions
export type ShapeCreator = { type: ShapeType } & ShapeOptions

const ModelDef = {
  Rect: RectModel
}
export class ShapeFactory {
  get({ type, ...args }: ShapeCreator): ShapeModel {
    if(!type) throw Error(`type ${type} not existed`)
    return new ModelDef[type](args)
  }
}

export const shapeFactory = new ShapeFactory()
