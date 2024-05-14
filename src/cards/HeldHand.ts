import { Card } from "./Card";

const isRoyal = (cards: Card[]): boolean => {
  const ranks = cards.map((card) => card.rank);
  const hasStraightRoyals =
    ranks.includes(1) && // A
    ranks.includes(13) && // K
    ranks.includes(12) && // Q
    ranks.includes(11) && // J
    ranks.includes(10);
  return hasStraightRoyals;
};

const isStraight = (cards: Card[]): boolean => {
  for (let i = 0; i < cards.length - 1; ++i) {
    const rank = cards[i].rank;
    const nextRank = cards[i + 1].rank;

    if (rank + 1 !== nextRank) {
      return false;
    }
  }
  return true;
};

const isFlush = (cards: Card[]): boolean => {
  for (let i = 0; i < cards.length - 1; ++i) {
    const suit = cards[i].suit;
    const nextSuit = cards[i + 1].suit;

    if (suit !== nextSuit) {
      return false;
    }
  }

  return true;
};

const isFourOfAKind = (cards: Card[]): boolean => {
  let ranksHeld = new Map<number, number>();
  for (let i = 0; i < cards.length; ++i) {
    const rank = cards[i].rank;

    const numOfRankHeld = ranksHeld.get(rank);
    if (numOfRankHeld === undefined) {
      ranksHeld.set(rank, 1);
    } else {
      ranksHeld.set(rank, numOfRankHeld + 1);
    }
  }

  console.log(ranksHeld);
  for (const numOfRank of ranksHeld.values()) {
    console.log({ numOfRank });
    if (numOfRank === 4) {
      return true;
    }
  }
  return false;
};

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
    this.cards.sort((a, b) => {
      return a.rank - b.rank;
    });
    const availableHands: PokerHand[] = [];
    if (isFlush(this.cards)) {
      if (isRoyal(this.cards)) {
        availableHands.push({
          name: POKER_HAND_NAMES.ROYAL_FLUSH,
          cards: this.cards,
        });
      } else if (isStraight(this.cards)) {
        availableHands.push({
          name: POKER_HAND_NAMES.STRAIGHT_FLUSH,
          cards: this.cards,
        });
      }
    } else if (isFourOfAKind(this.cards)) {
      availableHands.push({
        name: POKER_HAND_NAMES.FOUR_OF_A_KIND,
        cards: this.cards,
      });
    }

    return availableHands;
  }
}
