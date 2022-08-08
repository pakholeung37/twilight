import { ShapeModel } from "./ShapeModel"
import { ShapeOptions, ShapeType, ShapeModelDef } from "./def"

export type ShapeCreator = { type: ShapeType } & ShapeOptions

export class ShapeFactory {
  get({ type, ...args }: ShapeCreator): ShapeModel {
    if (!type) throw Error(`type ${type} not existed`)
    return new ShapeModelDef[type](args)
  }
}

export const shapeFactory = new ShapeFactory()
