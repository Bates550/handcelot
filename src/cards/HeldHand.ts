import { Suit } from "../CardContainer";
import { Card, RANK, Rank, SUIT } from "./Card";

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

  // Sort in place by descending rank (i.e. A, K, Q, J, 10, ...), but starting
  // with Ace Matching ranks are sorted by suit in reverse alphabetical order.
  private static sortByRankDesc(cards: Card[]) {
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
  }

  // Returns available hands. Each hand is sorted by descending rank and then by
  // descending alpha suit, not necessarily the order in the held hand.
  public static availableHands(c: Card[]): PokerHand[] {
    // Sort highest to lowest so that when we iterate through we're assembling
    // the highest rank of any hand.
    const cards = [...c];
    HeldHand.sortByRankDesc(cards);

    const flushes: Record<Suit, Card[]> = {
      [SUIT.CLUBS]: [],
      [SUIT.DIAMONDS]: [],
      [SUIT.HEARTS]: [],
      [SUIT.SPADES]: [],
    };
    const rankMatches: Record<Rank, Card[]> = {
      [RANK.ACE]: [],
      [RANK.TWO]: [],
      [RANK.THREE]: [],
      [RANK.FOUR]: [],
      [RANK.FIVE]: [],
      [RANK.SIX]: [],
      [RANK.SEVEN]: [],
      [RANK.EIGHT]: [],
      [RANK.NINE]: [],
      [RANK.TEN]: [],
      [RANK.JACK]: [],
      [RANK.QUEEN]: [],
      [RANK.KING]: [],
    };
    const straight: Card[] = [];
    const straightFlush: Card[] = []; // Includes royal flushes as well

    const availableHands: PokerHand[] = [];

    for (let i = 0; i < cards.length; ++i) {
      const card = cards[i];

      // Rank Match Tracking
      rankMatches[card.rank].push(card);

      // Flush Tracking
      flushes[card.suit].push(card);

      // Straight, Straight Flush, and Royal Flush Tracking
      if (i === 0) {
        straight.push(card);
        straightFlush.push(card);
      } else {
        const prevCard = cards[i - 1];
        const sameSuit = card.suit === prevCard.suit;
        const aceThenKing = card.rank === 13 && prevCard.rank === 1;
        const descendingRank = card.rank === prevCard.rank - 1 || aceThenKing;
        if (descendingRank) {
          straight.push(card);
          if (sameSuit) {
            straightFlush.push(card);
          }
        }
      }
    }

    // High Card Evaluation
    const highCardPlayedCards: PlayedCard[] = cards.map((card, i) => {
      if (i === 0) {
        return { ...card, scored: true };
      }
      return { ...card, scored: false };
    });
    availableHands.push({
      name: POKER_HAND_NAMES.HIGH_CARD,
      cards: highCardPlayedCards,
    });

    // Rank Match Evaluation
    const ranks = Object.keys(rankMatches).map((rankStr) =>
      parseInt(rankStr)
    ) as Rank[];
    for (let i = 0; i < ranks.length; ++i) {
      const rank = ranks[i];
      const rankMatch = rankMatches[rank];

      if (rankMatch.length === 4) {
        const playedCards: PlayedCard[] = cards.map((card) => {
          const rankMatchCard = rankMatch.find((c) => Card.equals(c, card));
          if (rankMatchCard === undefined) {
            return { ...card, scored: false };
          }
          return { ...card, scored: true };
        });

        availableHands.push({
          name: POKER_HAND_NAMES.FOUR_OF_A_KIND,
          cards: playedCards,
        });
      }

      if (rankMatch.length === 3) {
        const playedCards: PlayedCard[] = cards.map((card) => {
          const rankMatchCard = rankMatch.find((c) => Card.equals(c, card));
          if (rankMatchCard === undefined) {
            return { ...card, scored: false };
          }
          return { ...card, scored: true };
        });

        availableHands.push({
          name: POKER_HAND_NAMES.THREE_OF_A_KIND,
          cards: playedCards,
        });
      }

      if (rankMatch.length === 2) {
        const playedCards: PlayedCard[] = cards.map((card) => {
          const rankMatchCard = rankMatch.find((c) => Card.equals(c, card));
          if (rankMatchCard === undefined) {
            return { ...card, scored: false };
          }
          return { ...card, scored: true };
        });

        availableHands.push({
          name: POKER_HAND_NAMES.PAIR,
          cards: playedCards,
        });
      }
    }

    // Two Pair Evaluation
    const availablePairs = availableHands.filter(
      (hand) => hand.name === POKER_HAND_NAMES.PAIR
    );
    if (availablePairs.length >= 2) {
      const highestPair = availablePairs[0];
      const nextHighestPair = availablePairs[1];
      const playedCards: PlayedCard[] = highestPair.cards.map((card, i) => {
        const nextHighestPairCard = nextHighestPair.cards[i];
        const scored = card.scored || nextHighestPairCard.scored;
        return { ...card, scored };
      });
      availableHands.push({
        name: POKER_HAND_NAMES.TWO_PAIR,
        cards: playedCards,
      });
    }

    // Full House Evaluation
    // Find the highest three of a kind and pair
    let maxThreeOfAKind: Card[] | undefined;
    let maxPair: Card[] | undefined;
    for (let i = ranks.length - 1; i >= 0; --i) {
      const rank = ranks[i];
      const rankMatch = rankMatches[rank];

      if (maxThreeOfAKind === undefined && rankMatch.length === 3) {
        maxThreeOfAKind = rankMatch;
      }

      if (maxPair === undefined && rankMatch.length === 2) {
        maxPair = rankMatch;
      }
    }
    // If they exist you've got a full house.
    if (maxPair !== undefined && maxThreeOfAKind !== undefined) {
      const fullHouseCards = [...maxPair, ...maxThreeOfAKind];
      const playedCards: PlayedCard[] = cards.map((card) => {
        const rankMatchCard = fullHouseCards.find((c) => Card.equals(c, card));
        if (rankMatchCard === undefined) {
          return { ...card, scored: false };
        }
        return { ...card, scored: true };
      });

      availableHands.push({
        name: POKER_HAND_NAMES.FULL_HOUSE,
        cards: playedCards,
      });
    }

    // Flush Evaluation
    const flushSuits = Object.keys(flushes) as Suit[];
    for (let i = 0; i < flushSuits.length; ++i) {
      const flushSuit = flushSuits[i];
      const flush = flushes[flushSuit];
      if (flush.length >= 5) {
        const playedCards: PlayedCard[] = cards.map((card) => {
          const flushCard = flush.find((c) => Card.equals(c, card));
          if (flushCard === undefined) {
            return { ...card, scored: false };
          }
          return { ...card, scored: true };
        });

        availableHands.push({
          name: POKER_HAND_NAMES.FLUSH,
          cards: playedCards,
        });
      }
    }

    // Straight Evaluation
    if (straight.length >= 5) {
      const playedCards: PlayedCard[] = cards.map((card) => {
        const straightCard = straight.find((c) => Card.equals(c, card));
        if (straightCard === undefined) {
          return { ...card, scored: false };
        }
        return { ...card, scored: true };
      });

      availableHands.push({
        name: POKER_HAND_NAMES.STRAIGHT,
        cards: playedCards,
      });
    }

    // Straight Flush and Royal Flush Evaluation
    if (straightFlush.length >= 5) {
      const playedCards: PlayedCard[] = cards.map((card) => {
        const straightFlushCard = straightFlush.find((c) =>
          Card.equals(c, card)
        );
        if (straightFlushCard === undefined) {
          return { ...card, scored: false };
        }
        return { ...card, scored: true };
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

    const sortedAvailableHands =
      HeldHand.sortPokerHandsByPrecedence(availableHands);

    return sortedAvailableHands;
  }

  private static sortPokerHandsByPrecedence(ph: PokerHand[]) {
    const copy = [...ph];
    copy.sort((a, b) => {
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
    return copy;
  }

  public static determineWinningHand(options: { a: Card[]; b: Card[] }): {
    winner: "a" | "b";
    hand: PokerHand;
  } {
    const { a, b } = options;
    const availableHandsA = HeldHand.availableHands(a).map((hand) => ({
      ...hand,
      id: "a",
    }));
    const availableHandsB = HeldHand.availableHands(b).map((hand) => ({
      ...hand,
      id: "b",
    }));

    const [highestHand] = HeldHand.sortPokerHandsByPrecedence([
      ...availableHandsA,
      ...availableHandsB,
    ]);

    // @ts-expect-error
    const winner = highestHand.id;
    // @ts-expect-error
    delete highestHand.id;
    return { winner, hand: highestHand };
  }
}
