import { useAuthStore } from "@/shared/stores/auth.store"
import { router } from "expo-router"
import { useState } from "react"

export const useAuthViewModel = () => {
    const [userName, setUserName] = useState("")

    const { setAuthenticate } = useAuthStore()

    const handleSubmit = () => {
        if (!userName.length) return
        setAuthenticate(userName)
        router.replace("/(private)/home")
    }

    return {
        userName,
        setUserName,
        handleSubmit
    }
}