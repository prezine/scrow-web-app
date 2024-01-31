import { create } from 'zustand'
import { devtools } from 'zustand/middleware'


const useMobileNav = create(devtools(
(set)=>({
    showMobileNav: false,
    closeMobileNav: () => set({ showMobileNav: false }),
    toggleMobileNav: () => set((state) => ({showMobileNav: !state.showMobileNav}))
})))


export default useMobileNav;