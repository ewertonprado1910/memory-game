import { create } from "zustand";
import { CardEntryAnimationType } from "../config/animation.config";

interface AnimationsStore {
    entryAnimationType: CardEntryAnimationType
    isAnimating: boolean
    setEntryAnimationType: (type: CardEntryAnimationType) => void
    setIsAnimating: (isAnimating: boolean) => void
}

export const useAnimationStore = create<AnimationsStore>((set) => ({
    entryAnimationType: "throw",
    isAnimating: false,
    setEntryAnimationType:
        (entryAnimationType) => set({ entryAnimationType }),
    setIsAnimating:
        (isAnimating) => set({ isAnimating })
}))