import { router } from "expo-router"
import { Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


export default function Index() {
    return (

        <SafeAreaView style={{ alignItems: "center", marginTop: 50 }}>
            <Text>Tela Index Home</Text>

            <TouchableOpacity onPress={() => router.push("/(private)/game")}>
                <Text>Botão</Text>
            </TouchableOpacity>

        </SafeAreaView>

    )
}