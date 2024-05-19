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

  // Returns available hands. Each hand is sorted by descending rank and then by
  // descending alpha suit, not necessarily the order in the held hand.
  availableHands(): PokerHand[] {
    // Sort highest to lowest so that when we iterate through we're assembling
    // the highest rank of any hand.
    const cards = [...this.cards];

    // Sort by descending rank, but starting with Ace
    cards.sort((a, b) => {
      const aRank = a.rank === 1 ? 14 : a.rank;
      const bRank = b.rank === 1 ? 14 : b.rank;
      const rankComparison = bRank - aRank;

      const suitOrder: Suit[] = [
        SUIT.SPADES,
        SUIT.HEARTS,
        SUIT.DIAMONDS,
        SUIT.CLUBS,
      ];
      if (rankComparison === 0) {
        const aSuit = suitOrder.findIndex((suit) => a.suit === suit);
        const bSuit = suitOrder.findIndex((suit) => b.suit === suit);

        if (aSuit === -1) {
          throw new Error(`Could not find ${aSuit} in ${suitOrder}`);
        }
        if (bSuit === -1) {
          throw new Error(`Could not find ${bSuit} in ${suitOrder}`);
        }

        return aSuit - bSuit;
      }

      return rankComparison;
    });

    const flushes: Record<Suit, Card[]> = {
      [SUIT.CLUBS]: [],
      [SUIT.DIAMONDS]: [],
      [SUIT.HEARTS]: [],
      [SUIT.SPADES]: [],
    };
    const straight: Card[] = [];
    const straightFlush: Card[] = []; // Includes royal flushes as well

    const availableHands: PokerHand[] = [];

    for (let i = 0; i < cards.length; ++i) {
      const card = cards[i];

      // Flush Tracking
      flushes[card.suit].push(card);

      // Straight Tracking
      if (i === 0) {
        straight.push(card);
      } else {
        const prevCard = cards[i - 1];
        const aceThenKing = card.rank === 13 && prevCard.rank === 1;
        const descendingRank = card.rank === prevCard.rank - 1 || aceThenKing;
        if (descendingRank) {
          straight.push(card);
        } else if (card.rank < prevCard.rank - 1) {
          straight.length = 0;
        }
      }

      // Straight Flush and Royal Flush Tracking
      if (i === 0) {
        straightFlush.push(card);
      } else {
        const prevCard = cards[i - 1];
        const sameSuit = card.suit === prevCard.suit;
        const aceThenKing = card.rank === 13 && prevCard.rank === 1;
        const descendingRank = card.rank === prevCard.rank - 1 || aceThenKing;
        if (descendingRank && sameSuit) {
          straightFlush.push(card);
        } else if (
          card.rank < prevCard.rank - 1 ||
          card.suit !== prevCard.suit
        ) {
          straightFlush.length = 0;
        }
      }
    }

    // Flush Evaluation
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

    // Straight Evaluation
    if (straight.length >= 5) {
      const playedCards: PlayedCard[] = straight.map((card) => {
        return {
          ...card,
          scored: true,
        };
      });

      availableHands.push({
        name: POKER_HAND_NAMES.STRAIGHT,
        cards: playedCards,
      });
    }

    // Straight Flush and Royal Flush Evaluation
    if (straightFlush.length >= 5) {
      const playedCards: PlayedCard[] = straightFlush.map((card) => {
        return {
          ...card,
          scored: true,
        };
      });

      const isRoyal = straightFlush[0].rank === 1;
      const name = isRoyal
        ? POKER_HAND_NAMES.ROYAL_FLUSH
        : POKER_HAND_NAMES.STRAIGHT_FLUSH;
      availableHands.push({
        name,
        cards: playedCards,
      });
    }

    availableHands.sort((a, b) => {
      const handPrecedence = Object.values(POKER_HAND_NAMES);
      const aName = handPrecedence.findIndex((handName) => a.name === handName);
      const bName = handPrecedence.findIndex((handName) => b.name === handName);

      if (aName === -1) {
        throw new Error(`Could not find ${aName} in ${handPrecedence}`);
      }
      if (bName === -1) {
        throw new Error(`Could not find ${bName} in ${handPrecedence}`);
      }

      return aName - bName;
    });

    return availableHands;
  }
}
