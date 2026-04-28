import { router } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"

export default function Home() {
    return (
        <View style={{marginTop: 50}}>
            <Text>
                HOME HOME
            </Text>

            <TouchableOpacity onPress={() => router.push("/(private)/game")}>
                <Text>Botão</Text>
            </TouchableOpacity>
        </View>
    )
}