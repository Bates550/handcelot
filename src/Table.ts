import { Container } from "pixi.js";
import { Card } from "./Card";
import { Hand } from "./Hand";
import { CommunityCards } from "./CommunityCards";
import { Deck } from "./Deck";

export class Table extends Container {
  topHand?: Hand;
  bottomHand?: Hand;
  communityCards?: CommunityCards;
  deck: Deck;
  appWidth: number;
  appHeight: number;

  constructor(params: { appWidth: number; appHeight: number }) {
    super();

    const { appWidth, appHeight } = params;
    this.appWidth = appWidth;
    this.appHeight = appHeight;

    this.deck = new Deck();

    this.deck.shuffle();
    this.deal();
  }

  deal() {
    if (this.topHand) {
      this.removeChild(this.topHand);
    }
    if (this.bottomHand) {
      this.removeChild(this.bottomHand);
    }
    if (this.communityCards) {
      this.removeChild(this.communityCards);
    }

    const card1 = this.deck.draw()!;
    const card2 = this.deck.draw()!;
    const card3 = this.deck.draw()!;

    const card4 = this.deck.draw()!;
    const card5 = this.deck.draw()!;
    const card6 = this.deck.draw()!;

    const card7 = this.deck.draw()!;
    const card8 = this.deck.draw()!;
    const card9 = this.deck.draw()!;

    this.topHand = new Hand({ cards: [card1, card2, card3] });
    this.bottomHand = new Hand({ cards: [card4, card5, card6] });
    this.communityCards = new CommunityCards({ cards: [card7, card8, card9] });

    this.addChild(this.topHand);
    this.addChild(this.bottomHand);
    this.addChild(this.communityCards);

    this.topHand.position.set(this.appWidth / 2, this.appHeight / 2 - 200);
    this.bottomHand.position.set(this.appWidth / 2, this.appHeight / 2 + 200);
    this.communityCards.position.set(100, this.appHeight / 2);
  }
}
