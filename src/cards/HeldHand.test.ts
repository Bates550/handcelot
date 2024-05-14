import * as C from "./CardFixtures";
import { HeldHand, POKER_HAND_NAMES } from "./HeldHand";

describe("HeldHand", () => {
  describe("availableHands", () => {
    it("detects royal flushes", () => {
      const royalFlush = [
        C.TEN_OF_SPADES,
        C.JACK_OF_SPADES,
        C.QUEEN_OF_SPADES,
        C.KING_OF_SPADES,
        C.ACE_OF_SPADES,
      ];

      const hand = new HeldHand({ cards: royalFlush });

      expect(hand.availableHands()).toEqual([
        {
          name: POKER_HAND_NAMES.ROYAL_FLUSH,
          cards: royalFlush,
        },
      ]);
    });
  });
});
