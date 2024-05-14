import { Card } from "./Card";

export const POKER_HAND_NAMES = {
  ROYAL_FLUSH: "royalFlush",
  STRAIGHT_FLUSH: "straightFlush",
  FOUR_OF_A_KIND: "fourOfAKind",
  FULL_HOUSE: "fullHouse",
  FLUSH: "flush",
  STRAIGHT: "straight",
  THREE_OF_A_KIND: "threeOfAKind",
  TWO_PAIR: "twoPair",
  PAIR: "pair",
  HIGH_CARD: "highCard",
} as const;
type PokerHandNames = (typeof POKER_HAND_NAMES)[keyof typeof POKER_HAND_NAMES];
type PokerHand = {
  name: PokerHandNames;
  cards: Card[];
};

export class HeldHand {
  cards: Card[] = [];

  constructor(params: { cards: Card[] }) {
    const { cards } = params;

    this.cards = cards;
  }

  availableHands(): PokerHand[] {
    return [
      {
        name: POKER_HAND_NAMES.ROYAL_FLUSH,
        cards: this.cards,
      },
    ];
  }
}
