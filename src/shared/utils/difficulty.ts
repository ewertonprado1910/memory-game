import { colors } from "@/constants/colors"
import { Difficulty } from "../interface/difficulty"

const difficultyColors: Record<Difficulty, string> = {
    "Fácil": colors.feedback.info,
    "Médio": colors.semantic.warning,
    "Difícil": colors.semantic.error
}

export const getDifficultyColor = (difficulty: Difficulty) => {
    return difficultyColors[difficulty]
}