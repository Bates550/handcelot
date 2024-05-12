import { Container } from "pixi.js";
import { Card } from "./Card";
import { Hand } from "./Hand";
import { CommunityCards } from "./CommunityCards";
import { Deck } from "./Deck";
import { determineWinningHand } from "./determineWinningHand";

type WinningHand = "top" | "bottom";

export class Table extends Container {
  private topHand?: Hand;
  private bottomHand?: Hand;
  private communityCards?: CommunityCards;
  private deck: Deck;
  private appWidth: number;
  private appHeight: number;
  private _winningHand?: WinningHand;

  constructor(params: { appWidth: number; appHeight: number }) {
    super();

    const { appWidth, appHeight } = params;
    this.appWidth = appWidth;
    this.appHeight = appHeight;

    this.deck = new Deck();

    this.deck.shuffle();
    this.deal();
  }

  get winningHand() {
    if (this._winningHand === undefined) {
      throw new Error("Winning hand requested before it was determined.");
    }
    return this._winningHand;
  }

  set winningHand(val: WinningHand) {
    this._winningHand = val;
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

    const winningHand = determineWinningHand({
      a: this.topHand,
      b: this.bottomHand,
      communityCards: this.communityCards,
    });
    if (winningHand === "a") {
      this.winningHand = "top";
    } else {
      this.winningHand = "bottom";
    }

    this.topHand.position.set(this.appWidth / 2, this.appHeight / 2 - 200);
    this.bottomHand.position.set(this.appWidth / 2, this.appHeight / 2 + 200);
    this.communityCards.position.set(100, this.appHeight / 2);
  }
}
