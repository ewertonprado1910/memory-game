import { useGameStore } from "@/shared/stores/game-store"
import { StoreCard } from "@/shared/utils/challange"
import { useEffect } from "react"
import { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"

interface Props {
    card: StoreCard
}

export const useGameCardViewModel = ({ card }: Props) => {
    const rotation = useSharedValue(card.isFliped ? 180 : 0)

    const {selectedCard, status} = useGameStore()

    const frontAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            { perspective: 1000 }, {
                rotateY:
                    `${interpolate(rotation.value, [0, 180], [0, 180])}deg`
            }]
    }))

    const backAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            { perspective: 1000 }, {
                rotateY:
                    `${interpolate(rotation.value, [0, 180], [180, 360])}deg`
            }]
    }))

    useEffect(() => {
        rotation.value = withSpring(card.isFliped ? 180 : 0, {
            duration: 300
        })
    },[card.isFliped, rotation])

    return {
        card,
        frontAnimatedStyle,
        backAnimatedStyle,
        selectedCard
    }
}