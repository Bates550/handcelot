import * as C from "./CardFixtures";
import { HeldHand, POKER_HAND_NAMES } from "./HeldHand";

describe("HeldHand", () => {
  describe("availableHands", () => {
    it("detects royal flush", () => {
      const cards = [
        C.TEN_OF_SPADES,
        C.JACK_OF_SPADES,
        C.QUEEN_OF_SPADES,
        C.KING_OF_SPADES,
        C.ACE_OF_SPADES,
      ];

      const hand = new HeldHand({ cards });

      expect(hand.availableHands()).toEqual([
        {
          name: POKER_HAND_NAMES.ROYAL_FLUSH,
          cards: [
            { ...C.ACE_OF_SPADES, scored: true },
            { ...C.KING_OF_SPADES, scored: true },
            { ...C.QUEEN_OF_SPADES, scored: true },
            { ...C.JACK_OF_SPADES, scored: true },
            { ...C.TEN_OF_SPADES, scored: true },
          ],
        },
        {
          name: POKER_HAND_NAMES.FLUSH,
          cards: [
            { ...C.ACE_OF_SPADES, scored: true },
            { ...C.KING_OF_SPADES, scored: true },
            { ...C.QUEEN_OF_SPADES, scored: true },
            { ...C.JACK_OF_SPADES, scored: true },
            { ...C.TEN_OF_SPADES, scored: true },
          ],
        },
        {
          name: POKER_HAND_NAMES.STRAIGHT,
          cards: [
            { ...C.ACE_OF_SPADES, scored: true },
            { ...C.KING_OF_SPADES, scored: true },
            { ...C.QUEEN_OF_SPADES, scored: true },
            { ...C.JACK_OF_SPADES, scored: true },
            { ...C.TEN_OF_SPADES, scored: true },
          ],
        },
      ]);
    });

    it("detects straight flush", () => {
      const cards = [
        C.NINE_OF_SPADES,
        C.TEN_OF_SPADES,
        C.JACK_OF_SPADES,
        C.QUEEN_OF_SPADES,
        C.KING_OF_SPADES,
      ];

      const hand = new HeldHand({ cards });

      expect(hand.availableHands()).toEqual([
        {
          name: POKER_HAND_NAMES.STRAIGHT_FLUSH,
          cards: [
            { ...C.KING_OF_SPADES, scored: true },
            { ...C.QUEEN_OF_SPADES, scored: true },
            { ...C.JACK_OF_SPADES, scored: true },
            { ...C.TEN_OF_SPADES, scored: true },
            { ...C.NINE_OF_SPADES, scored: true },
          ],
        },
        {
          name: POKER_HAND_NAMES.FLUSH,
          cards: [
            { ...C.KING_OF_SPADES, scored: true },
            { ...C.QUEEN_OF_SPADES, scored: true },
            { ...C.JACK_OF_SPADES, scored: true },
            { ...C.TEN_OF_SPADES, scored: true },
            { ...C.NINE_OF_SPADES, scored: true },
          ],
        },
        {
          name: POKER_HAND_NAMES.STRAIGHT,
          cards: [
            { ...C.KING_OF_SPADES, scored: true },
            { ...C.QUEEN_OF_SPADES, scored: true },
            { ...C.JACK_OF_SPADES, scored: true },
            { ...C.TEN_OF_SPADES, scored: true },
            { ...C.NINE_OF_SPADES, scored: true },
          ],
        },
      ]);
    });

    it("detects four of a kind", () => {
      const cards = [
        C.ACE_OF_CLUBS,
        C.TWO_OF_DIAMONDS,
        C.ACE_OF_DIAMONDS,
        C.ACE_OF_HEARTS,
        C.ACE_OF_SPADES,
      ];

      const hand = new HeldHand({ cards });

      expect(hand.availableHands()).toEqual([
        {
          name: POKER_HAND_NAMES.FOUR_OF_A_KIND,
          cards: [
            { ...C.ACE_OF_CLUBS, scored: true },
            { ...C.ACE_OF_DIAMONDS, scored: true },
            { ...C.ACE_OF_HEARTS, scored: true },
            { ...C.ACE_OF_SPADES, scored: true },
            { ...C.TWO_OF_DIAMONDS, scored: false },
          ],
        },
      ]);
    });

    it("detects full house", () => {
      const cards = [
        C.ACE_OF_CLUBS,
        C.ACE_OF_DIAMONDS,
        C.ACE_OF_HEARTS,
        C.KING_OF_CLUBS,
        C.KING_OF_DIAMONDS,
      ];

      const hand = new HeldHand({ cards });

      expect(hand.availableHands()).toEqual([
        {
          name: POKER_HAND_NAMES.FULL_HOUSE,
          cards: [
            { ...C.ACE_OF_CLUBS, scored: true },
            { ...C.ACE_OF_DIAMONDS, scored: true },
            { ...C.ACE_OF_HEARTS, scored: true },
            { ...C.KING_OF_CLUBS, scored: true },
            { ...C.KING_OF_DIAMONDS, scored: true },
          ],
        },
      ]);
    });

    it("detects flush", () => {
      const cards = [
        C.FIVE_OF_SPADES,
        C.JACK_OF_SPADES,
        C.QUEEN_OF_SPADES,
        C.KING_OF_SPADES,
        C.ACE_OF_SPADES,
      ];

      const hand = new HeldHand({ cards });

      expect(hand.availableHands()).toEqual([
        {
          name: POKER_HAND_NAMES.FLUSH,
          cards: [
            { ...C.ACE_OF_SPADES, scored: true },
            { ...C.KING_OF_SPADES, scored: true },
            { ...C.QUEEN_OF_SPADES, scored: true },
            { ...C.JACK_OF_SPADES, scored: true },
            { ...C.FIVE_OF_SPADES, scored: true },
          ],
        },
      ]);
    });

    it("detects straight", () => {
      const cards = [
        C.NINE_OF_HEARTS,
        C.TEN_OF_CLUBS,
        C.TEN_OF_HEARTS,
        C.JACK_OF_SPADES,
        C.QUEEN_OF_SPADES,
        C.KING_OF_SPADES,
      ];

      const hand = new HeldHand({ cards });

      expect(hand.availableHands()).toEqual([
        {
          name: POKER_HAND_NAMES.STRAIGHT,
          cards: [
            { ...C.KING_OF_SPADES, scored: true },
            { ...C.QUEEN_OF_SPADES, scored: true },
            { ...C.JACK_OF_SPADES, scored: true },
            { ...C.TEN_OF_HEARTS, scored: true },
            { ...C.NINE_OF_HEARTS, scored: true },
          ],
        },
      ]);
    });

    it("detects 'royal' straight as a straight", () => {
      const cards = [
        C.TEN_OF_CLUBS,
        C.TEN_OF_HEARTS,
        C.JACK_OF_SPADES,
        C.QUEEN_OF_SPADES,
        C.KING_OF_SPADES,
        C.ACE_OF_SPADES,
      ];

      const hand = new HeldHand({ cards });

      expect(hand.availableHands()).toEqual([
        {
          name: POKER_HAND_NAMES.STRAIGHT,
          cards: [
            { ...C.ACE_OF_SPADES, scored: true },
            { ...C.KING_OF_SPADES, scored: true },
            { ...C.QUEEN_OF_SPADES, scored: true },
            { ...C.JACK_OF_SPADES, scored: true },
            { ...C.TEN_OF_HEARTS, scored: true },
          ],
        },
      ]);
    });

    it("detects three of a kind", () => {
      const cards = [
        C.ACE_OF_CLUBS,
        C.TWO_OF_DIAMONDS,
        C.THREE_OF_DIAMONDS,
        C.ACE_OF_HEARTS,
        C.ACE_OF_SPADES,
      ];

      const hand = new HeldHand({ cards });

      expect(hand.availableHands()).toEqual([
        {
          name: POKER_HAND_NAMES.THREE_OF_A_KIND,
          cards: [
            { ...C.ACE_OF_CLUBS, scored: true },
            { ...C.ACE_OF_HEARTS, scored: true },
            { ...C.ACE_OF_SPADES, scored: true },
            { ...C.TWO_OF_DIAMONDS, scored: false },
            { ...C.THREE_OF_DIAMONDS, scored: false },
          ],
        },
      ]);
    });

    it("detects two pair", () => {
      const cards = [
        C.ACE_OF_CLUBS,
        C.TWO_OF_DIAMONDS,
        C.TWO_OF_SPADES,
        C.FOUR_OF_DIAMONDS,
        C.ACE_OF_SPADES,
      ];

      const hand = new HeldHand({ cards });

      expect(hand.availableHands()).toEqual([
        {
          name: POKER_HAND_NAMES.TWO_PAIR,
          cards: [
            { ...C.ACE_OF_CLUBS, scored: true },
            { ...C.ACE_OF_SPADES, scored: true },
            { ...C.TWO_OF_DIAMONDS, scored: true },
            { ...C.TWO_OF_SPADES, scored: true },
            { ...C.FOUR_OF_DIAMONDS, scored: false },
          ],
        },
      ]);
    });

    it("detects pair", () => {
      const cards = [
        C.ACE_OF_CLUBS,
        C.TWO_OF_DIAMONDS,
        C.THREE_OF_DIAMONDS,
        C.FOUR_OF_DIAMONDS,
        C.ACE_OF_SPADES,
      ];

      const hand = new HeldHand({ cards });

      expect(hand.availableHands()).toEqual([
        {
          name: POKER_HAND_NAMES.PAIR,
          cards: [
            { ...C.ACE_OF_CLUBS, scored: true },
            { ...C.ACE_OF_SPADES, scored: true },
            { ...C.TWO_OF_DIAMONDS, scored: false },
            { ...C.THREE_OF_DIAMONDS, scored: false },
            { ...C.FOUR_OF_DIAMONDS, scored: false },
          ],
        },
      ]);
    });

    it("detects high card", () => {
      const cards = [
        C.ACE_OF_CLUBS,
        C.TWO_OF_DIAMONDS,
        C.THREE_OF_DIAMONDS,
        C.FOUR_OF_DIAMONDS,
        C.SEVEN_OF_DIAMONDS,
      ];

      const hand = new HeldHand({ cards });

      expect(hand.availableHands()).toEqual([
        {
          name: POKER_HAND_NAMES.HIGH_CARD,
          cards: [
            { ...C.ACE_OF_CLUBS, scored: true },
            { ...C.TWO_OF_DIAMONDS, scored: false },
            { ...C.THREE_OF_DIAMONDS, scored: false },
            { ...C.FOUR_OF_DIAMONDS, scored: false },
            { ...C.SEVEN_OF_DIAMONDS, scored: false },
          ],
        },
      ]);
    });
  });
});
