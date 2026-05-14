import { colors } from "@/constants/colors"
import { FC } from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { HomeHeader } from "./components"
import { ChallangeList } from "./components/ChallangeList"
import { DifficultySelectionView } from "./components/DifficultySelection/DifficultySelection.view"
import { useHomeViewModel } from "./useHome.viewModel"


export const HomeView: FC<ReturnType<typeof useHomeViewModel>> = ({

}) => {
    return (
        <SafeAreaView
            style={styles.container}
        >
            <View
                style={styles.content}  >
                <HomeHeader />
                <DifficultySelectionView />
                <ChallangeList />
            </View>
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
        paddingHorizontal: 24
    }
})