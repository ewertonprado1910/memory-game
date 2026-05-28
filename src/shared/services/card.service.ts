import { CardItem, Challange, StoreCard } from "../utils/challange";

export class CardService {
    static shuffle(cards: StoreCard[]) {
        const shuffled = [...cards]

        for (let index = shuffled.length - 1; index > 0; index--) {
            const secondItem = Math.floor(Math.random() * (index + 1));

            [shuffled[index], shuffled[secondItem]] = [
                shuffled[secondItem],
                shuffled[index]
            ]
        }
        return shuffled
    }

    static createCardPair(
        cardItem: CardItem,
        startIndex: number,
    ): [StoreCard, StoreCard] {

        return [
            {
                id: `${cardItem.name}-1-${startIndex}`,
                ...cardItem,
                isFliped: false,
                isMached: false
            },
            {
                id: `${cardItem.name}-2-${startIndex + 2}`,
                ...cardItem,
                isFliped: false,
                isMached: false
            }
        ]
    }

    static generateCards(challange: Challange): StoreCard[] {
        const cards: StoreCard[] = []

        challange.cards.forEach((cardItem, index) => {
            const [card1, card2] = CardService.createCardPair(cardItem, index)
            cards.push(card1, card2)
        })

        return this.shuffle(cards)
    }

    static flipCard (card: StoreCard, flipped: boolean): StoreCard {
        return {
            ...card,
            isFliped: flipped
        }
    }

     static markAsMartched (card: StoreCard): StoreCard {
        return {
            ...card,
            isFliped: true,
            isMached: true
        }
    }
}