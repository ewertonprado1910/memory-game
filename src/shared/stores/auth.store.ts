import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface AuthStore {
    user: {
        name: string,
        id: string,
        createdAt: Date
    } | null
    logout: () => void
    setAuthenticate: (name: string) => void
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            logout: () => {
                set({ user: null })
            },
            setAuthenticate: (name) => {
                set({
                    user: {
                        name,
                        id: `user-${Date.now()}`,
                        createdAt: new Date()
                    }
                })
            },
        }),
        {
            name: "@memory-game:auth",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)
