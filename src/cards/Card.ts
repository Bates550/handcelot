export const SUIT = {
  CLUBS: "clubs",
  DIAMONDS: "diamonds",
  HEARTS: "hearts",
  SPADES: "spades",
} as const;
export type Suit = (typeof SUIT)[keyof typeof SUIT];

// It's alphabetical
export const SUIT_ORDER = [SUIT.CLUBS, SUIT.DIAMONDS, SUIT.HEARTS, SUIT.SPADES];

export const RANK = {
  ACE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  TEN: 10,
  JACK: 11,
  QUEEN: 12,
  KING: 13,
} as const;
export type Rank = (typeof RANK)[keyof typeof RANK];

export class Card {
  suit: Suit;
  rank: Rank;

  constructor(params: { suit: Suit; rank: Rank }) {
    const { suit, rank } = params;

    this.suit = suit;
    this.rank = rank;
  }

  static equals(a: Card, b: Card): boolean {
    return a.rank === b.rank && a.suit === b.suit;
  }
}
