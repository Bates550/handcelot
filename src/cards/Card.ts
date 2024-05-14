export const SUIT = {
  HEARTS: "hearts",
  DIAMONDS: "diamonds",
  CLUBS: "clubs",
  SPADES: "spades",
} as const;
export type Suit = (typeof SUIT)[keyof typeof SUIT];

export class Card {
  suit: Suit;
  rank: number;

  constructor(params: { suit: Suit; rank: number }) {
    const { suit, rank } = params;

    this.suit = suit;
    this.rank = rank;
  }
}
