import { useNumberAnimation } from "@/animations/hooks/useNumberAnimation"
import { Difficulty } from "@/shared/interface/difficulty"
import { difficultyConfings } from "@/shared/utils/challange"
import { useEffect } from "react"
import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { DifficultySelectionProps } from "./DifficultySelection.view"

const diffculties: Difficulty[] = ["Fácil", "Médio", "Difícil"]

export const useDifficultyViewModel = ({
    selectedDifficulty,
    setSelectedDifficulty
}: DifficultySelectionProps) => {


    const difficultyConfig = difficultyConfings[selectedDifficulty]
    const { animatedStyle: timeAnimatedStyle } = useNumberAnimation(difficultyConfig.estimedTime)

    const selectedIndex = diffculties.indexOf(selectedDifficulty)
    const translateX = useSharedValue(selectedIndex * 100)

    useEffect(() => {
        const newIndex = diffculties.indexOf(selectedDifficulty)
        translateX.value = withSpring(newIndex * 100, {
            damping: 30,
            stiffness: 120
        })

    }, [selectedDifficulty, translateX])

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: `${translateX.value}%` }]
    }))

    return {
        diffculties,
        selectedDifficulty,
        setSelectedDifficulty,
        animatedStyle,
        difficultyConfig,
        timeAnimatedStyle
    }
}