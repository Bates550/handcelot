import { CommunityCards } from "./CommunityCards";
import { Hand } from "./Hand";
import { Card } from "./Card";

export const determineWinningHand = (params: {
  a: Hand;
  b: Hand;
  communityCards: CommunityCards;
}): "a" | "b" => {
  const { a, b, communityCards } = params;

  const cardsForA = [...a.cards, ...communityCards.cards];
  const cardsForB = [...b.cards, ...communityCards.cards];

  return "a";
};

const SHOWDOWN_NAME = {
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
type ShowdownName = (typeof SHOWDOWN_NAME)[keyof typeof SHOWDOWN_NAME];

type Showdown = {
  name: ShowdownName;
  cards: Card[];
};

const findHighestHand = (cards: Card[]): Showdown => {
  cards.sort((a, b) => {
    return a.rank - b.rank;
  });

  if (isRoyalFlush(cards)) {
    return {
      name: SHOWDOWN_NAME.ROYAL_FLUSH,
      cards,
    };
  }

  return {
    name: SHOWDOWN_NAME.HIGH_CARD,
    cards,
  };
};

const isRoyalFlush = (cards: Card[]): boolean => {
  const ranks = cards.map((card) => card.rank);
  const hasStraightRoyals =
    ranks.includes(1) && // A
    ranks.includes(13) && // K
    ranks.includes(12) && // Q
    ranks.includes(11) && // J
    ranks.includes(10);
  return hasStraightRoyals;
};

const isStraightFlush = (cards: Card[]): boolean => {
  return false;
};

const isStraight = (cards: Card[]): boolean => {
  // highest to lowest
  const c = [...cards].reverse();
  let straightBegin = 0;
  let straightEnd = 0;
  // Going backwards over
  for (let i = 1; i < c.length; ++i) {
    const card = cards[i];
    const prevCard = cards[i - 1];

    if (card.rank === prevCard.rank - 1) {
      // This card is one less than the next highest card so we can advance
      // our straight
      straightEnd += 1;
    } else if (c.length - i < 5) {
      // We're not on a straight and there's no room left to find one
      return false;
    } else {
      return false;
    }
  }
};
