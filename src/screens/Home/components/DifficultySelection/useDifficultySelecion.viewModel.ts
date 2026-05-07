import { Difficulty } from "@/shared/interface/difficulty"
import { useEffect, useState } from "react"
import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"

export const useDifficultyViewModel = () => {
    const diffculties: Difficulty[] = ["Fácil", "Médio", "Difícil"]
    const [selectedDifficulty, setSelectedDifficulty] =
        useState<Difficulty>("Fácil")

    const selectedIndex = diffculties.indexOf(selectedDifficulty)

    const translateX = useSharedValue(selectedIndex * 100)

    useEffect(() => {
        const newIndex = diffculties.indexOf(selectedDifficulty)
        translateX.value = withSpring(newIndex * 100, {
            damping: 30,
            stiffness: 120
        })

    }, [selectedDifficulty, diffculties, translateX])

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{translateX: `${translateX.value}%`}]
    }))

    return {
        diffculties,
        selectedDifficulty,
        setSelectedDifficulty,
        animatedStyle
    }
}