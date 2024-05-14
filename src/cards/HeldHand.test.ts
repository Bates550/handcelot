import * as C from "./CardFixtures";
import { HeldHand, POKER_HAND_NAMES } from "./HeldHand";

describe("HeldHand", () => {
  describe("availableHands", () => {
    it("detects royal flushes", () => {
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
          cards,
        },
      ]);
    });

    it("detects straight flushes", () => {
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
          cards,
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
          cards,
        },
      ]);
    });
  });
});
