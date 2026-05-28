import { create } from "zustand"
import { GameService } from "../services/game.service"
import { Challange, GameResult, GameState } from "../utils/challange"


interface GameStore extends GameState {
    initGame: (challange: Challange) => void
    startGame: () => void
    selectedCard: (id: string) => void
    resetMismatchedCards: () => void
    finishGame: () => GameResult | null
    tick: () => void
    _timerId: number | null

    startTimer: () => void
    stopTimer: () => void

    pauseGame: () => void
    resumeGame: () => void
    resetGame: () => void
    clearGame: () => void

    previewAllCards: () => void
    hideAllCards: () => void
}

export const useGameStore = create<GameStore>((set, get) => ({
    status: "idle",
    challange: null,
    cards: [],
    selectedCards: [],
    timeElapsed: 0,
    startedAt: null,
    timeRemaing: 0,


    initGame: (challange: Challange) => {
        const gameState = GameService.initializeGame(challange)
        set(gameState)
    },

    finishGame: () => {
        const currentState = get()
        const result = GameService.finishGame(currentState)

        return result
    },

    resetMismatchedCards: () => {
        const currentState = get()
        const newState = GameService.resetMissmartchedCard(currentState)

        set(newState)
    },

    selectedCard: (cardId: string) => {
        const currentState = get()

        const { action, newState } = GameService.selectCards(currentState, cardId)
        set(newState)
        console.log(action)
        switch (action) {
            case 'flip':
                break
            case 'invalid':
                break
            case 'mismatch':
                setTimeout(() => get().resetMismatchedCards(), 1000)
                break
            case 'match':
                if (newState.status === 'finished') {
                    setTimeout(() => get().finishGame(), 500)
                }
                break
        }

    },

    startGame: () => {
        const currentState = get()
        const newState = GameService.startGame(currentState)

        set(newState)
    },
    //timer
    _timerId: null,

    tick: () => {
        const currentState = get()
        const newState = GameService.tick(currentState)

        set(newState)

        if (newState.status === "timeout") {
            get().stopTimer()
        }
    },

    startTimer: () => {
        const currentState = get()

        if (currentState._timerId) {
            clearInterval(currentState._timerId)
        }

        const timerId = setInterval(() => {
            get().tick()
        }, 1000)

        set({ _timerId: timerId })
    },

    stopTimer: () => {
        const currentState = get()

        if (currentState._timerId) {
            clearInterval(currentState._timerId)
            set({ _timerId: null })
        }

    },

    //Ciclo de vida
    clearGame: () => {
        get().stopTimer()
        set({
            status: "idle",
            challange: null,
            cards: [],
            selectedCards: [],
            timeElapsed: 0,
            startedAt: null,
            timeRemaing: 0,
        })
    },

    pauseGame: () => {
        const currentState = get()
        const newState = GameService.pauseGame(currentState)

        set(newState)
        get().stopTimer()
    },

    resumeGame: () => {
        const currentState = get()
        const newState = GameService.resumeGame(currentState)

        set(newState)
        get().startTimer()
    },

    resetGame: () => {
        const currentState = get()
        if (!currentState.challange) return

        const newState = GameService.resetGame(currentState.challange)
        set(newState)
        get().stopTimer()
    },

    //Preview de cartas
    hideAllCards: () => {
        const currentState = get()
        const flippedCards = GameService.hideAllCards(currentState.cards)
        set({ cards: flippedCards })
    },

    previewAllCards: () => {
        const currentState = get()
        const previewdCards = GameService.previewAllCards(currentState.cards)
        set({ cards: previewdCards })
    },

}))

