import { Suit } from "../Card";
import { Card, SUIT } from "./Card";

type Result = {
  result: boolean;
  cards: PlayedCard[];
};

const isRoyal = (cards: Card[]): Result => {
  const ranks = cards.map((card) => card.rank);
  const hasStraightRoyals =
    ranks.includes(1) && // A
    ranks.includes(13) && // K
    ranks.includes(12) && // Q
    ranks.includes(11) && // J
    ranks.includes(10);

  const royalRanks = [1, 13, 12, 11, 10];
  if (hasStraightRoyals) {
    const playedCards: PlayedCard[] = cards.map((card) => {
      return {
        ...card,
        scored: royalRanks.includes(card.rank),
      };
    });

    // Put ace on the end
    const ace = playedCards[0];
    playedCards.shift();
    playedCards.push(ace);

    return {
      result: true,
      cards: playedCards,
    };
  }

  return {
    result: false,
    cards: [],
  };
};

const isStraight = (cards: Card[]): Result => {
  for (let i = 0; i < cards.length - 1; ++i) {
    const rank = cards[i].rank;
    const nextRank = cards[i + 1].rank;

    if (rank + 1 !== nextRank) {
      return {
        result: false,
        cards: [],
      };
    }
  }

  return {
    result: true,
    cards: cards.map((card) => {
      return { ...card, scored: true };
    }),
  };
};

const isFlush = (cards: Card[]): Result => {
  for (let i = 0; i < cards.length - 1; ++i) {
    const suit = cards[i].suit;
    const nextSuit = cards[i + 1].suit;

    if (suit !== nextSuit) {
      return {
        result: false,
        cards: [],
      };
    }
  }

  return {
    result: true,
    cards: cards.map((card) => {
      return { ...card, scored: true };
    }),
  };
};

const isFourOfAKind = (cards: Card[]): Result => {
  let ranksHeld = new Map<number, { numHeld: number; indices: number[] }>();
  for (let i = 0; i < cards.length; ++i) {
    const rank = cards[i].rank;

    const rankHeld = ranksHeld.get(rank);
    if (rankHeld === undefined) {
      ranksHeld.set(rank, {
        numHeld: 1,
        indices: [i],
      });
    } else {
      rankHeld.numHeld += 1;
      rankHeld.indices.push(i);
    }
  }

  for (const rankHeld of ranksHeld.values()) {
    if (rankHeld.numHeld === 4) {
      const playedCards: PlayedCard[] = cards.map((card, i) => {
        const scored = rankHeld.indices.includes(i);
        return { ...card, scored };
      });
      return {
        result: true,
        cards: playedCards,
      };
    }
  }
  return {
    result: false,
    cards: [],
  };
};

// const isFullHouse = (cards: Card[]): Result => {
//   if (isTwoPair(cards).result && isThreePair(cards).result) {
//   }
// }

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
type PlayedCard = Card & {
  scored: boolean;
};

type PokerHand = {
  name: PokerHandNames;
  cards: PlayedCard[];
};

export class HeldHand {
  cards: Card[] = [];

  constructor(params: { cards: Card[] }) {
    const { cards } = params;

    this.cards = cards;
  }

  // Returns available hands. Each hand is sorted by card rank, not necessarily
  // the order in the held hand.
  availableHands(): PokerHand[] {
    // Sort highest to lowest so that when we iterate through we're assembling
    // the highest rank of any hand.
    const cards = [...this.cards];
    cards.sort((a, b) => {
      const aRank = a.rank === 1 ? 14 : a.rank;
      const bRank = b.rank === 1 ? 14 : b.rank;
      return bRank - aRank;
    });
    console.log(cards);

    const flushes: Record<Suit, Card[]> = {
      [SUIT.CLUBS]: [],
      [SUIT.DIAMONDS]: [],
      [SUIT.HEARTS]: [],
      [SUIT.SPADES]: [],
    };

    const availableHands: PokerHand[] = [];

    for (let i = 0; i < cards.length; ++i) {
      const card = cards[i];

      // Flush Tracking
      flushes[card.suit].push(card);
    }

    const flushSuits = Object.keys(flushes) as Suit[];
    for (let i = 0; i < flushSuits.length; ++i) {
      const flushSuit = flushSuits[i];
      const flush = flushes[flushSuit];
      if (flush.length >= 5) {
        const playedCards: PlayedCard[] = flush.map((card) => {
          return {
            ...card,
            scored: true,
          };
        });

        availableHands.push({
          name: POKER_HAND_NAMES.FLUSH,
          cards: playedCards,
        });
      }
    }

    return availableHands;
  }
}
