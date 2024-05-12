import { CommunityCards } from "./CommunityCards";
import { Hand } from "./Hand";

export const determineWinningHand = (params: {
  a: Hand;
  b: Hand;
  communityCards: CommunityCards;
}): "a" | "b" => {
  const { a, b, communityCards } = params;

  return "a";
};
