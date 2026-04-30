import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { FC } from "react"
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { colors, gradients } from "@/constants/colors"
import { useAuthViewModel } from "./useAuth.viewModel"


export const LoginView: FC<ReturnType<typeof useAuthViewModel>> = ({
    userName,
    setUserName,
    handleSubmit
}) => {

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
            style={{flex: 1}}
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
                    <Text style={styles.title}>
                        memory game
                    </Text>

                    <Text style={styles.subTitle}>
                        Teste sua memória enquanto aprende!
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <TextInput
                        onChangeText={setUserName}
                        value={userName}
                        style={styles.input}
                        placeholder="Digite seu nome"
                        placeholderTextColor={colors.grayscale.gray300}
                        autoCapitalize="words"
                        returnKeyType="done"
                    />

                    <LinearGradient
                        colors={gradients.colorful}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 2 }}
                        style={[styles.buttonGradient, styles.buttonGlow]}
                    >
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => router.push("/(private)/home")}>
                            <Text style={styles.buttonText}>
                                Entrar
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
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
        fontSize: 28,
        fontWeight: "bold"
    },
    subTitle: {
        color: colors.grayscale.gray200,
        fontSize: 16,
        marginBottom: 40
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
