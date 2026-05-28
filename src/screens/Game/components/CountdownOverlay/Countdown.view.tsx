import { AppText } from "@/shared/components/AppText"
import { FC } from "react"
import { StyleSheet, View } from "react-native"
import { useCountdownOverlayViewModel } from "./useCountdownOverlay.viewModel"

export const CountdownOverlayView: FC<ReturnType<
    typeof useCountdownOverlayViewModel>> = ({
        count,
        visible
    }) => {
        if(!visible) return

        return (
            <View style={styles.overlay}>
                <View style={styles.contentWrapper}>
                    <AppText style={styles.countText}>{count}</AppText>
                </View>
            </View>
        )
    }

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center"
    },
    contentWrapper: {
        width: 160,
        height: 160,
        justifyContent: "center",
        alignItems: "center"
    },
    countText: {
        fontSize: 72,
        fontFamily: "Baloo2_800ExtraBold"
    }
})