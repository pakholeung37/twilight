import { createContext, useContext } from "react"
import RootStore from "../RootStore"

export const StoreContext = createContext<RootStore>({} as RootStore)
export const RootStoreProvider = StoreContext.Provider

export const useRootStore = () => useContext(StoreContext)
