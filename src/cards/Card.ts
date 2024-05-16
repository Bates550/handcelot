export const SUIT = {
  CLUBS: "clubs",
  DIAMONDS: "diamonds",
  HEARTS: "hearts",
  SPADES: "spades",
} as const;
export type Suit = (typeof SUIT)[keyof typeof SUIT];

// It's alphabetical
export const SUIT_ORDER = [SUIT.CLUBS, SUIT.DIAMONDS, SUIT.HEARTS, SUIT.SPADES];

export class Card {
  suit: Suit;
  rank: number;

  constructor(params: { suit: Suit; rank: number }) {
    const { suit, rank } = params;

    this.suit = suit;
    this.rank = rank;
  }
}
