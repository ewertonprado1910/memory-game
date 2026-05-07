import { Difficulty } from "@/shared/interface/difficulty"
import { FC } from "react"
import { StyleSheet, View } from "react-native"
import { useDifficultyIconViewModel } from "./useDifficultyIcon.viewModel"

export interface Props {
    difficulty: Difficulty
    color: string
    isSelected: boolean
    inactiveColor: string
}

export const DifficultyView: FC<Props> = ({
    difficulty,
    color,
    isSelected,
    inactiveColor
}) => {
    const { getBarStyle } = useDifficultyIconViewModel({
        difficulty,
        color,
        isSelected,
        inactiveColor
    })

    return (
        <View style={styles.container}>
            {[1, 2, 3].map((index) => (
                <View key={index} style={[styles.bar, getBarStyle(index)]} />
            ))}
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 2,
        height: 16
    },
    bar: {
        width: 3,
        borderRadius: 2
    }
})