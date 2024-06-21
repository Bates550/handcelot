import { Container } from "pixi.js";
import { HandContainer } from "./HandContainer";
import { CommunityCardsContainer } from "./CommunityCardsContainer";
import { Deck } from "./Deck";
import { HeldHand } from "./cards/HeldHand";
import { Card } from "./cards/Card";

type WinningHand = "top" | "bottom";

export class TableContainer extends Container {
  private topHand?: Card[];
  private topHandContainer?: HandContainer;
  private bottomHand?: Card[];
  private bottomHandContainer?: HandContainer;
  private communityCardsContainer?: CommunityCardsContainer;
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
    if (this.topHandContainer) {
      this.removeChild(this.topHandContainer);
    }
    if (this.bottomHandContainer) {
      this.removeChild(this.bottomHandContainer);
    }
    if (this.communityCardsContainer) {
      this.removeChild(this.communityCardsContainer);
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

    this.topHand = [card1, card2, card3];
    this.topHandContainer = new HandContainer({ cards: this.topHand });
    this.bottomHand = [card4, card5, card6];
    this.bottomHandContainer = new HandContainer({
      cards: this.bottomHand,
    });
    this.communityCardsContainer = new CommunityCardsContainer({
      cards: [card7, card8, card9],
    });

    this.addChild(this.topHandContainer);
    this.addChild(this.bottomHandContainer);
    this.addChild(this.communityCardsContainer);

    const winningHand = HeldHand.determineWinningHand({
      a: this.topHand,
      b: this.bottomHand,
    });
    if (winningHand.winner === "a") {
      this.winningHand = "top";
    } else {
      this.winningHand = "bottom";
    }

    this.topHandContainer.position.set(
      this.appWidth / 2,
      this.appHeight / 2 - 200
    );
    this.bottomHandContainer.position.set(
      this.appWidth / 2,
      this.appHeight / 2 + 200
    );
    this.communityCardsContainer.position.set(100, this.appHeight / 2);
  }
}
