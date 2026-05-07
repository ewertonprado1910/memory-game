import { useCallback } from "react"
import { useAnimatedStyle, useSharedValue, withSpring, WithSpringConfig } from "react-native-reanimated"
import { SPRING_CONFIG } from "../config/animation.config"

interface UsePressAnimatonConfig {
    scaleActive?: number
    springConfig?: WithSpringConfig
}

export const usePressAnimations = ({
    scaleActive = 0.70,
    springConfig = SPRING_CONFIG.press
}: UsePressAnimatonConfig = {}) => {
    const scale = useSharedValue(1)

    const onPressIn = useCallback(() => {
        scale.value = withSpring(scaleActive, springConfig)
    }, [scale, scaleActive, springConfig])

    const onPressOut = useCallback(() => {
        scale.value = withSpring(1, springConfig)
    }, [scale, springConfig])

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        width: "100%"
    }))

    return {
        onPressIn,
        animatedStyle,
        onPressOut
    }
}