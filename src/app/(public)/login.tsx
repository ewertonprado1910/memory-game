import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";


export default function Login() {
    return (
        <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text>
                Login
            </Text>

            <TouchableOpacity onPress={() => router.push("/(private)/game")}>
                <Text>Botão</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/(private)/home")}>
                <Text>INDEX-HOME</Text>
            </TouchableOpacity>
        </View>
    )
}