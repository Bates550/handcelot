import { CardContainer, SUITS } from "./Card";

export class Deck {
  cards: CardContainer[] = [];

  constructor() {
    for (const suit of Object.values(SUITS)) {
      for (let i = 1; i <= 13; i++) {
        this.cards.push(new CardContainer({ suit, rank: i }));
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw() {
    return this.cards.pop();
  }
}
