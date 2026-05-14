import { create } from "zustand"
import { Challange, GameResult, GameState } from "../utils/challange"

interface GameStore extends GameState {
    initialGame: (challange: Challange) => void
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


    initialGame: () => { },
    finishGame: () => null,
    resetMismatchedCards: () => { },
    selectedCard: (cards: string) => { },
    startGame: () => { },

    //timer
    _timerId: null,
    tick: () => { },
    startTimer: () => { },
    stopTimer: () => { },

    //Ciclo de vida
    pauseGame: () => { },
    resumeGame: () => { },
    resetGame: () => { },
    clearGame: () => { },

    //Preview de cartas
    previewAllCards: () => { },
    hideAllCards: () => { }
}))

