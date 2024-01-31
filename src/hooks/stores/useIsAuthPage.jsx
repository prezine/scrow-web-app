import { create } from "zustand";
import { devtools } from "zustand/middleware"

const useIsAuthPage = create(devtools((set)=>({
    isAuthPage: false,
    setIsAuthPage: () => set({isAuthPage: true}),
    setIsNotAuthPage: () => set({isAuthPage: false})
})))

export default useIsAuthPage