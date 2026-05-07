import { LinearGradient } from "expo-linear-gradient"
import { FC } from "react"
import { Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import Animated from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"

import { useInputFocusAnimation } from "@/animations/hooks/useInputFocusAnimation"
import { usePressAnimations } from "@/animations/hooks/usePressAnimation"
import { colors, gradients } from "@/constants/colors"
import { AppText } from "@/shared/components/AppText"
import { useAuthViewModel } from "./useAuth.viewModel"

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

export const LoginView: FC<ReturnType<typeof useAuthViewModel>> = ({
    userName,
    setUserName,
    handleSubmit
}) => {

    const handleSubmitPressAnimation = usePressAnimations()
    const animatedTextInputFocus = useInputFocusAnimation()

    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={Keyboard.dismiss}
        >
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <View style={styles.content}>
                        <View style={styles.logoContainer}>
                            <Image style={styles.logo}
                                source={require("@/assets/logo-game.png")}
                                resizeMode="contain"
                            />
                        </View>

                        <View style={styles.titleContainer}>
                            <AppText style={styles.title}>
                                memory game
                            </AppText>

                            <AppText style={styles.subTitle}>
                                Teste sua memória enquanto aprende!
                            </AppText>
                        </View>

                        <View style={styles.formContainer}>
                            <AnimatedTextInput
                                onChangeText={setUserName}
                                value={userName}
                                style={[styles.input, animatedTextInputFocus.animatedStyle]}
                                placeholder="Digite seu nome"
                                placeholderTextColor={colors.grayscale.gray300}
                                autoCapitalize="words"
                                returnKeyType="done"
                                onFocus={animatedTextInputFocus.onFocus}
                                onBlur={animatedTextInputFocus.onBlur}
                            />

                            <Animated.View
                                style={handleSubmitPressAnimation.animatedStyle}
                            >
                                <LinearGradient
                                    colors={gradients.colorful}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 2 }}
                                    style={[styles.buttonGradient, styles.buttonGlow]}
                                >
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={handleSubmit}
                                        onPressIn={handleSubmitPressAnimation.onPressIn}
                                        onPressOut={handleSubmitPressAnimation.onPressOut}
                                    >
                                        <Text style={styles.buttonText}>
                                            Entrar
                                        </Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </Animated.View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grayscale.gray700
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },
    logoContainer: {
        marginBottom: 20
    },
    logo: {
        width: 81,
        height: 81
    },
    titleContainer: {
        alignItems: "center",
        gap: 5
    },
    title: {
        color: colors.grayscale.gray100,
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Baloo2_800ExtraBold"
    },
    subTitle: {
        color: colors.grayscale.gray200,
        fontSize: 16,
        marginBottom: 40,
    },
    formContainer: {
        width: "100%",
        gap: 16
    },
    buttonText: {
        color: colors.grayscale.white,
        fontSize: 16,
        fontWeight: "bold"
    },
    buttonGradient: {
        borderRadius: 50
    },
    button: {
        height: 48,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonGlow: {
        shadowColor: "#6121EB",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 30,
        elevation: 20
    },
    input: {
        width: "100%",
        height: 48,
        backgroundColor: colors.grayscale.gray500,
        borderRadius: 50,
        fontSize: 14,
        color: colors.grayscale.white,
        borderWidth: 1,
        borderColor: colors.grayscale.gray400,
        textAlign: "center"
    }
})
