
import { router } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"

export default function Home() {
    return (
        <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text>
                TELA DE GAME
            </Text>

            <TouchableOpacity onPress={() => router.push("/(public)/login")}>
                <Text>Botão</Text>
            </TouchableOpacity>
        </View>
    )
}