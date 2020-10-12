import { Stage, Node } from "./index"

export default class ImageBuilder {
  static _stage: InstanceType<typeof Stage>

  public static toImageURL(json: string): Promise<string> {
    const el = document.createElement("div")
    this._stage = Node.create(json, el) as InstanceType<typeof Stage>
    return new Promise((res, rej) => {
      this._stage.toDataURL({
        callback: img => {
          if (img) {
            res(img)
          } else {
            rej({ errMsg: "something wrong with node" })
          }
          this._stage.destroy()
        },
      })
    })
  }
}
