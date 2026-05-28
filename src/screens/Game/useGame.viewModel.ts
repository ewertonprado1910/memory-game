import { Difficulty } from "@/shared/interface/difficulty"
import { useGameStore } from "@/shared/stores/game-store"
import { challangeTheme, difficultyConfings } from "@/shared/utils/challange"
import { createSequence } from "@/shared/utils/sequence.util"
import { useLocalSearchParams } from "expo-router"
import { useCallback, useEffect, useState } from "react"

export const useGameViewModel = () => {
    const { difficulty, themeId } = useLocalSearchParams<{
        themeId: string,
        difficulty: Difficulty
    }>()

    const {
        initGame,
        status,
        previewAllCards,
        hideAllCards,
        startGame
    } = useGameStore()

    const [visibleCountdown, setVisibleCountdown] = useState(
        status === "countdown"
    )

    const selectedTheme = challangeTheme.find((theme) => theme.id === themeId)

    const handleCountdownComplete = useCallback(() => {
        setVisibleCountdown(false)

        createSequence()
            .wait(2000)
            .then(previewAllCards)
            .wait(2000)
            .then(hideAllCards)
            .wait(300)
            .then(startGame)
            .run()
    }, [previewAllCards,hideAllCards, startGame])

    useEffect(() => {
        initGame({
            id: `${themeId}-${difficulty}`,
            title: selectedTheme?.title || "",
            cards: selectedTheme?.cards || [],
            difficulty,
            estimatedTime: difficultyConfings[difficulty].estimatedTime,
            timeLimit: difficultyConfings[difficulty].timeLimit,

        })

        createSequence()
            .wait(500)
            .then(() => setVisibleCountdown(true))
            .run()
    }, [
        difficulty,
        initGame,
        selectedTheme?.cards,
        selectedTheme?.title,
        themeId,
    ])

    return {
        selectedTheme,
        visibleCountdown,
        handleCountdownComplete
    }
}