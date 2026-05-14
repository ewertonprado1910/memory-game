import { LinearGradient } from "expo-linear-gradient"
import { FC } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import Animated from "react-native-reanimated"

import { usePressAnimations } from "@/animations/hooks/usePressAnimation"
import { colors } from "@/constants/colors"
import { AppText } from "@/shared/components/AppText"
import { ChallangeTheme } from "@/shared/utils/challange"
import { MaterialCommunityIcons } from "@expo/vector-icons"


export const ChallangeCard: FC<ChallangeTheme> = ({
    arrowColor,
    cards,
    gradient,
    id,
    title
}) => {

    const pressAnimated = usePressAnimations()

    return (
        <LinearGradient
            colors={gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.challangeCard}
        >
            <Animated.View style={pressAnimated.animatedStyle}>
                <Pressable
                    onPressIn={pressAnimated.onPressIn}
                    onPressOut={pressAnimated.onPressOut}
                    style={styles.challangeContent}>
                    <AppText style={styles.challangeTitle}>{title}</AppText>

                    <View style={[styles.arrowIcon, { backgroundColor: arrowColor }]}>
                        <MaterialCommunityIcons
                            name="arrow-right"
                            size={23}
                        />
                    </View>
                </Pressable>
            </Animated.View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    challangeCard: {
        borderRadius: 16,
        marginBottom: 16,
        marginTop: 5,
        overflow: "hidden"
    },
    challangeContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20
    },
    challangeTitle: {
        fontSize: 17,
        color: colors.grayscale.gray100,
        maxWidth: "50%"
    },
    arrowIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 16
    }
})