import { create } from "zustand";
import { devtools } from "zustand/middleware"

const useUser = create(devtools((set)=>({
    userDataValue: null,
    businessDataValue: null,
    setUserDataValue: (userDataValue) => set({ userDataValue }),
    setBusinessDataValue: (businessDataValue) => set({ businessDataValue })
})))

export default useUser