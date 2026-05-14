import { Challange, GameState } from "../utils/challange"
import { CardService } from "./card.service"

export class GameSerive {


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
            status: "plying",
            startedAt: new Date
        }
    }

    static selectCard(
        gameState: GameState,
        cardId: string
    ): {
        newState: GameSerive,
        action: "flip" | "match" | "mismatch" | "invalid";
    } {
        const { cards, selectedCards, status } = gameState

        if (status !== "plying") {
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
            if (cardId === card.id) {
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
            return {
                newState: {
                    ...gameState,
                    cards: finalCards,
                    selectedCards: []
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
}