export const SUITS = {
  HEARTS: "hearts",
  DIAMONDS: "diamonds",
  CLUBS: "clubs",
  SPADES: "spades",
};
export type Suit = (typeof SUITS)[keyof typeof SUITS];
// export type PastSuit = "hearts" | "diamonds" | "clubs" | "spades";

export class Card {
  suit: Suit;
  number: number;

  constructor(params: { suit: Suit; number: number }) {
    this.suit = params.suit;
    this.number = params.number;
  }
}
