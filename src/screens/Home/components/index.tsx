import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Pressable, StyleSheet, View } from "react-native"

import { usePressAnimations } from "@/animations/hooks/usePressAnimation"
import { colors } from "@/constants/colors"
import { AppText } from "@/shared/components/AppText"
import { useAuthStore } from "@/shared/stores/auth.store"
import Animated from "react-native-reanimated"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export const HomeHeader = () => {
    const { user } = useAuthStore()

    const pressAnimatedStyles = usePressAnimations({
        scaleActive: 0.6
    })

    return (
        <View style={styles.header}>
            <View style={styles.headerContent}>
                <View style={styles.headerLeft}>
                    <View>
                        <AppText style={styles.greeting}>
                            Boas vindas, {user?.name}
                        </AppText>
                        <AppText style={styles.subTitle}>
                            Comece a jogar, selecionando os desafios abaixo
                        </AppText>
                    </View>
                </View>

                <View style={{ width: 40 }}>
                    <Animated.View>
                        <AnimatedPressable
                            style={[styles.trophyContainer, pressAnimatedStyles.animatedStyle]}
                            onPressIn={pressAnimatedStyles.onPressIn}
                            onPressOut={pressAnimatedStyles.onPressOut}
                        >
                            <MaterialCommunityIcons
                                name="trophy-outline"
                                size={20}
                                color={colors.accent.lightPurple}
                            />
                        </AnimatedPressable>
                    </Animated.View>
                </View>

            </View>

        </View>

    )
}

export const styles = StyleSheet.create({
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        // paddingHorizontal: 15
    },
    headerContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    headerLeft: {
        flex: 1,
        maxWidth: "60%"
    },
    greeting: {
        fontSize: 20,
        fontFamily: "Baloo2_700Bold",
        marginBottom: 8
    },
    subTitle: {
        fontSize: 15,
        color: colors.grayscale.gray200,
        lineHeight: 20,
    },
    trophyContainer: {
        width: 40,
        height: 40,
        borderColor: colors.grayscale.gray400,
        borderRadius: 40,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.grayscale.gray450
    }
})