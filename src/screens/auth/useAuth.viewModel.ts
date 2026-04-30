import { useAuthStore } from "@/shared/stores/auth.store"
import { useState } from "react"

export const useAuthViewModel = () => {
    const [userName, setUserName] = useState("")
    
    const {setAuthenticate} = useAuthStore()

    const handleSubmit = () => {
        setAuthenticate(userName)
    }

    return {
        userName,
        setUserName,
        handleSubmit
    }
}