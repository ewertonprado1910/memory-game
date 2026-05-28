import { FC } from "react"

import { useGameStore } from "@/shared/stores/game-store"
import { StoreCard } from "@/shared/utils/challange"
import { GameCardView } from "./GameCard.view"
import { useGameCardViewModel } from "./useGameCard.viewModel"

interface Params {
    card: StoreCard
    index: number
}
export const GameCard: FC<Params> = ({ card }) => {

     const storeCard = useGameStore(
        (state) => state.cards.find(c => c.id === card.id)
    )

    const viewModel = useGameCardViewModel({ card: storeCard! })

    return (
        <GameCardView {...viewModel} />
    )
}

