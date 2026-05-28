import { Challange, GameResult, GameState, StoreCard } from "../utils/challange"
import { CardService } from "./card.service"

export class GameService {

    static initializeGame(challange: Challange): GameState {
        const cards = CardService.generateCards(challange)

        return {
            status: "countdown",
            challange,
            cards,
            selectedCards: [],
            timeRemaing: challange.timeLimit,
            timeElapsed: 0,
            startedAt: null
        }
    }

    static startGame(gameState: GameState): GameState {

        return {
            ...gameState,
            status: "playing",
            startedAt: new Date
        }
    }

    static isGameComplete(cards: StoreCard[]): boolean {
        return cards.every((card) => card.isMached)
    }

    static selectCards(
        gameState: GameState,
        cardId: string
    ): {
        newState: GameState,
        action: "flip" | "match" | "mismatch" | "invalid"
    } {
        const { cards, selectedCards, status } = gameState

        if (status !== "playing") {
            return { newState: gameState, action: "invalid" }
        }

        const card = cards.find((card) => card.id === cardId)

        if (!card || card.isMached || card.isFliped) {
            return { newState: gameState, action: "invalid" }
        }

        if (selectedCards.length >= 2) {
            return { newState: gameState, action: "invalid" }
        }

        const updatedCardArray = cards.map((card) => {
            if (card.id === cardId) {
                return CardService.flipCard(card, true)
            } else {
                return card
            }
        })

        const newSelectedCards = [...selectedCards, card]

        if (newSelectedCards.length === 1) {
            return {
                newState: {
                    ...gameState,
                    cards: updatedCardArray,
                    selectedCards: newSelectedCards
                },
                action: "flip"
            }
        }

        const [firstCard, secondCard] = newSelectedCards

        const isMatch = Boolean(firstCard.name === secondCard.name)

        if (isMatch) {
            const finalCards = updatedCardArray.map((card) => {
                if (card.id === firstCard.id || card.id === secondCard.id) {
                    return CardService.markAsMartched(card)
                } else {
                    return card
                }
            })

            const isComplete = this.isGameComplete(finalCards)

            return {
                newState: {
                    ...gameState,
                    cards: finalCards,
                    selectedCards: [],
                    status: isComplete ? "finished" : "playing",
                },
                action: "match"
            }
        } else {
            return {
                newState: {
                    ...gameState,
                    cards: updatedCardArray,
                    selectedCards: newSelectedCards,
                },
                action: "mismatch"
            }
        }
    }

    static resetMissmartchedCard(gameState: GameState) {

        const { cards, selectedCards } = gameState

        const updatedCardArray = cards.map((card) => {
            const isSelected = selectedCards.some(({ id }) => card.id === id)

            if (isSelected && !card.isMached) {
                return CardService.flipCard(card, false)
            } else {
                return card
            }
        })
        return {
            ...gameState,
            cards: updatedCardArray,
            selectedCards: []
        }
    }

    static pauseGame(gameState: GameState): GameState {
        return {
            ...gameState,
            status: "paused"
        }
    }

    static resumeGame(gameState: GameState): GameState {
        return {
            ...gameState,
            status: "playing"
        }
    }

    static resetGame(challange: Challange): GameState {
        return this.initializeGame(challange)
    }

    static tick(gameState: GameState): GameState {
        if (gameState.status !== "playing") {
            return gameState
        }

        const timeRemaing = Math.max(0, gameState.timeRemaing - 1)
        const timeElapsed = gameState.timeElapsed + 1

        return {
            ...gameState,
            timeElapsed,
            timeRemaing,
            status: timeRemaing === 0 ? "timeout" : gameState.status
        }
    }

    static finishGame(gameState: GameState): GameResult | null {
        if (!gameState.challange) {
            return null
        }

        return {
            completed: Boolean(gameState.status === "finished"),
            timeElapsed: gameState.timeElapsed,
            challange: gameState.challange
        }
    }

    static previewAllCards(cards: StoreCard[]): StoreCard[] {
        return cards.map((card) => CardService.flipCard(card, true))
    }

    static hideAllCards(cards: StoreCard[]): StoreCard[] {
        return cards.map((card) => CardService.flipCard(card, false))
    }
}