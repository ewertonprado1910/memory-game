import { LoginView } from "@/screens/auth/Login.view"
import { useAuthViewModel } from "@/screens/auth/useAuth.viewModel"

export default function Login () {
    const viewModel = useAuthViewModel()

    return <LoginView {...viewModel} />
}