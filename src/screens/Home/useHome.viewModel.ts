import { Difficulty } from "@/shared/interface/difficulty"
import { router } from "expo-router"
import { useCallback, useState } from "react"

export const useHomeViewModel = () => {
    const [selectedDifficulty, setSelectedDifficulty] =
        useState<Difficulty>("Fácil")

    const handleSelectChallange = useCallback((themeId: string) => {
        router.push({
            pathname: "/(private)/game",
            params: {
                themeId,
                difficulty: selectedDifficulty
            }
        })
    }, [selectedDifficulty])

    return {
        selectedDifficulty,
        setSelectedDifficulty,
        handleSelectChallange
    }
}