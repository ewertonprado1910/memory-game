import { useAuthStore } from "@/shared/stores/auth.store"
import { router } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"

export default function Home() {
    const { logout } = useAuthStore()
    return (
        <View style={{ marginTop: 50 }}>
            <Text>
                HOME HOME
            </Text>

            <TouchableOpacity
           
                onPress={() => {
                    logout()
                    router.replace("/(public)/login")
                }}>
                <Text  style={{color: 'red'}} >DESLOGAR</Text>
            </TouchableOpacity>
        </View>
    )
}