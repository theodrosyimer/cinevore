import { create } from 'zustand'

type SearchFilterState = {
  isActive: boolean
  setActive: () => void
  setInactive: () => void
}

export const useSearchFilterStore = create<SearchFilterState>((set) => ({
  isActive: false,
  setActive: () => set({ isActive: true }),
  setInactive: () => set({ isActive: false }),
}))
