import konva from "konva"
import { ShapeCreator } from "../../store/model"
const Stage = konva.Stage
const Node = konva.Node

export function adapter(options: ShapeCreator) {
  return {
    className: options.type,
    attrs: {
      ...options,
    },
  }
}
export default class ImageBuilder {
  static _stage: InstanceType<typeof Stage>

  public static toImageURL(options: ShapeCreator): Promise<string> {
    const el = document.createElement("div")
    this._stage = Node.create(
      JSON.stringify(adapter(options)),
      el,
    ) as InstanceType<typeof Stage>
    return new Promise((res, rej) => {
      this._stage.toDataURL({
        callback: img => {
          if (img) {
            res(img)
          } else {
            rej({ errMsg: "something wrong with parsing node" })
          }
          this._stage.destroy()
        },
      })
    })
  }
}
