import { useCallback } from "react"

export function useCompose(...funcs: ((...args: any) => any)[]) {
  return useCallback(
    (...args: any) => {
      funcs.forEach(func => func(...args))
    },
    [funcs],
  )
}
