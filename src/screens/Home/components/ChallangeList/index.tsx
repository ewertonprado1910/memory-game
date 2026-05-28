import { colors } from "@/constants/colors"
import { AppText } from "@/shared/components/AppText"
import { challangeTheme } from "@/shared/utils/challange"
import { FC } from "react"
import { StyleSheet, View } from "react-native"
import { ChallangeCard } from "./components/ChallangeCard"

interface ChallangeListProps {
   
    handleSelectChallange: (themeId: string) => void
}


export const ChallangeList: FC<ChallangeListProps> = ({
    handleSelectChallange
}) => {
    return (
        <View>
            <AppText style={styles.sectionTitle}>Desafios disponiveis:</AppText>
            {challangeTheme.map((challange) => (
                <ChallangeCard
                    handleSelectChallange={handleSelectChallange}
                    {...challange}
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