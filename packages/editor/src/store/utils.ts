export function assign<T>(self: any, options: Partial<T>) {
  let property: keyof T
  for (property in options) {
    if(self[property] === undefined) continue
    self[property] = options[property]
  }
}
