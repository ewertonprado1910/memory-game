import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Pressable, StyleSheet, View } from "react-native"

import { colors } from "@/constants/colors"
import { AppText } from "@/shared/components/AppText"
import { getDifficultyColor } from "@/shared/utils/difficulty"
import { DifficultyView } from "./DifficultyIcon/DifficultyIcon.view"
import { useDifficultyViewModel } from "./useDifficultySelecion.viewModel"

export const DifficultySelectionView = () => {
    const { diffculties } = useDifficultyViewModel()

    return (
        <View style={styles.difficultySelection}>
            <View style={styles.difficultyHeader}>
                <AppText>Dificuldade</AppText>
                <View style={styles.timeIndicator}>
                    <MaterialCommunityIcons
                        name="clock-outline"
                        size={20}
                        color={colors.accent.green}
                    />
                    <AppText>5 min</AppText>
                </View>
            </View>

            <View style={styles.difficultyTabs}>
                {diffculties.map((difficulty, index) => (
                    <Pressable
                        style={styles.difficultyTab}
                        key={`difficulty-key-${index}`}>

                        <DifficultyView
                            difficulty={difficulty}
                            color={getDifficultyColor(difficulty)}
                            inactiveColor={colors.grayscale.gray200}
                            isSelected
                        />
                        <AppText >
                            {difficulty}
                        </AppText>
                    </Pressable>
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
    difficultyLabel: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.grayscale.gray200
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
        borderWidth: 1
    },
    difficultyTab: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 12,
        borderRadius: 100,
        gap: 6,
        zIndex: 1
    },
    difficultyBadge: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20
    }

})