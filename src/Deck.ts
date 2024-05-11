import { Card, SUITS } from "./Card";

export class Deck {
  cards: Card[] = [];

  constructor() {
    for (const suit of Object.values(SUITS)) {
      for (let i = 1; i <= 13; i++) {
        this.cards.push(new Card({ suit, number: i }));
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
}
