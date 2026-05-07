import { Difficulty } from "@/shared/interface/difficulty"

export const useDifficultyViewModel = () => {
    const diffculties: Difficulty[] = ["Fácil", "Médio", "Difícil"]

    return {
        diffculties
    }
}