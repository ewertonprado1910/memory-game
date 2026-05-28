import { FC } from "react"
import { CountdownOverlayView } from "./Countdown.view"
import { useCountdownOverlayViewModel } from "./useCountdownOverlay.viewModel"

export interface CountdownOverlayProps {
    visibleCountdown:  boolean
    handleCountdownComplete: () => void
}
export const CountdownOverlay: FC<CountdownOverlayProps> = (
    params
) => {
    const viewModel = useCountdownOverlayViewModel(params)

    return <CountdownOverlayView {...viewModel}/>
}