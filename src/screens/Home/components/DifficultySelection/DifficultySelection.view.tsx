import { MaterialCommunityIcons } from "@expo/vector-icons"
import { StyleSheet, View } from "react-native"

import { colors } from "@/constants/colors"
import { AppText } from "@/shared/components/AppText"
import { Difficulty } from "@/shared/interface/difficulty"
import { FC } from "react"
import Animated from "react-native-reanimated"
import { DifficultyTab } from "./DifficultyTab"
import { useDifficultyViewModel } from "./useDifficultySelecion.viewModel"

export interface DifficultySelectionProps {
    selectedDifficulty: Difficulty,
    setSelectedDifficulty: (difficult: Difficulty) => void
}

export const DifficultySelectionView: FC<DifficultySelectionProps> = ({
    selectedDifficulty,
    setSelectedDifficulty
}) => {
    const {
        diffculties,
        animatedStyle,
        difficultyConfig,
        timeAnimatedStyle
    } = useDifficultyViewModel({
        selectedDifficulty,
        setSelectedDifficulty
    })

    return (
        <View style={styles.difficultySelection}>
            <View style={styles.difficultyHeader}>
                <AppText>Dificuldade</AppText>
                <Animated.View style={[styles.timeIndicator, timeAnimatedStyle]}>
                    <MaterialCommunityIcons
                        name="clock-outline"
                        size={20}
                        color={colors.feedback.info}
                    />
                    <AppText>{difficultyConfig.estimedTime}</AppText>
                </Animated.View>
            </View>

            <View style={styles.difficultyTabs}>
                <Animated.View style={[styles.indicator, animatedStyle]} />
                {diffculties.map((difficulty, index) => (
                    <DifficultyTab
                        key={`difficulty-tab-${index}`}
                        difficulty={difficulty}
                        index={index}
                        isSelected={selectedDifficulty === difficulty}
                        setSelectedDifficulty={setSelectedDifficulty}
                    />
                ))}
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    difficultySelection: {
        marginBottom: 24
    },
    difficultyHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16
    },
    timeIndicator: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.grayscale.gray500,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 30,
        gap: 6
    },
    difficultyTabs: {
        flexDirection: "row",
        borderRadius: 100,
        padding: 4,
        position: "relative",
        borderColor: colors.grayscale.gray400,
        borderWidth: 1,
    },
    indicator: {
        position: "absolute",
        width: "33.33%",
        top: 4,
        zIndex: 0,
        borderRadius: 100,
        left: 0,
        bottom: 4,
        backgroundColor: colors.grayscale.gray500,
        borderColor: colors.grayscale.gray400,
        borderWidth: 1,
        marginLeft: 4
    }
})