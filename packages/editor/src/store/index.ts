import RootStore from "./RootStore"

export const createStore = () => {
  const rootStore = new RootStore()
  return rootStore
}

export const rootStore = createStore()
export * from "./hooks/useRootStore"
