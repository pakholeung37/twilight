import { useCallback } from "react"

export function useCompose(...funcs: Function[]) {
  return useCallback(
    (...args: any) => {
      funcs.forEach(func => func(...args))
    },
    [funcs],
  )
}
