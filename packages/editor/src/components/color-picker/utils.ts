export const calculatePosition = (e: MouseEvent, container: DOMRect) => {
  const { width: containerWidth, height: containerHeight } = container
  const x = e.pageX
  const y = e.pageY
  let left = x - (container.left + window.pageXOffset)
  let top = y - (container.top + window.pageYOffset)

  if (left < 0) {
    left = 0
  } else if (left > containerWidth) {
    left = containerWidth
  }

  if (top < 0) {
    top = 0
  } else if (top > containerHeight) {
    top = containerHeight
  }

  // const saturation = left / containerWidth
  // const bright = 1 - top / containerHeight
  return { left, top }
}
