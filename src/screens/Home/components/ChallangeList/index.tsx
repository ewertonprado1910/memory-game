import { colors } from "@/constants/colors"
import { AppText } from "@/shared/components/AppText"
import { challangeTheme } from "@/shared/utils/challange"
import { StyleSheet, View } from "react-native"
import { ChallangeCard } from "./components/ChallangeCard"


export const ChallangeList = () => {
    return (
        <View>
            <AppText style={styles.sectionTitle}>Desafios disponiveis:</AppText>
            {challangeTheme.map((challange) => (
                <ChallangeCard {...challange}
                    key={`challange-id${challange.id}`} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 16,
        color: colors.grayscale.gray200
    }
})