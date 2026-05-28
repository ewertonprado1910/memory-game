import { colors, gradients } from "@/constants/colors"
import { AppText } from "@/shared/components/AppText"
import { LinearGradient } from "expo-linear-gradient"
import { FC } from "react"
import { Image, Pressable, StyleSheet } from "react-native"
import Animated from "react-native-reanimated"
import { useGameCardViewModel } from "./useGameCard.viewModel"

export const GameCardView: FC<ReturnType<
    typeof useGameCardViewModel>> = ({
        card,
        frontAnimatedStyle,
        backAnimatedStyle,
        selectedCard
    }) => {
        return (
            <Animated.View style={[styles.containerWraper]}>
                <Pressable onPress={() => selectedCard(card.id)}
                    style={styles.container}>
                    <Animated.View style={styles.innerContainer}>

                        {/**front-cards */}

                        <Animated.View style={[styles.cardFace, frontAnimatedStyle]}>
                            <LinearGradient
                                style={styles.cardGradient}
                                colors={gradients.card}
                            >
                                <Image
                                    style={styles.logoImage}
                                    source={require("@/assets/logo-logo.png")}
                                />
                            </LinearGradient>
                        </Animated.View>


                        {/**back-card */}

                        <Animated.View style={[styles.cardFace, backAnimatedStyle]}>
                            <LinearGradient
                                style={styles.cardGradient}
                                colors={gradients.card}
                            >
                                <Image
                                    style={styles.cardImage}
                                    source={card.image} />

                                <AppText style={styles.cardText}>
                                    {card.name}
                                </AppText>
                            </LinearGradient>
                        </Animated.View>

                    </Animated.View>
                </Pressable>

            </Animated.View>
        )
    }

const styles = StyleSheet.create({
    containerWraper: {
        width: "32%",
        height: 130,
        marginBottom: 8,
        borderColor: colors.grayscale.gray400,
        borderWidth: 1,
        borderRadius: 16
    },
    container: {
        flex: 1
    },
    innerContainer: {
        flex: 1
    },
    cardFace: {
        position: "absolute",
        backfaceVisibility: "hidden",
        width: "100%",
        height: "100%",
    },
    cardGradient: {
        flex: 1,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        gap: 4
    },
    logoImage: {
        width: "55%",
        height: "50%",
        opacity: 0.3
    },
    cardImage: {
        width: 40,
        height: 40,
        borderRadius: 8
    },
    cardText: {
        color: colors.grayscale.gray100,
        fontSize: 16,
    }
})