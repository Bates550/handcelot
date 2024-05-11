import { Text, Container } from "pixi.js";

export const SUITS = {
  HEARTS: "hearts",
  DIAMONDS: "diamonds",
  CLUBS: "clubs",
  SPADES: "spades",
};
export type Suit = (typeof SUITS)[keyof typeof SUITS];

export class Card extends Container {
  suit: Suit;
  rank: number;
  text: Text;

  constructor(params: { suit: Suit; rank: number }) {
    super();
    this.suit = params.suit;
    this.rank = params.rank;

    this.text = new Text({
      text: `${this.prettyRank()} ${this.prettySuit()}`,
      style: {
        fontFamily: "Arial",
        fontSize: 24,
        fill: this.suitColor(),
        align: "center",
      },
    });

    this.addChild(this.text);
  }

  suitColor() {
    if (this.suit === SUITS.HEARTS || this.suit === SUITS.DIAMONDS) {
      return 0xff1010;
    }
    return 0x131313;
  }

  prettySuit() {
    switch (this.suit) {
      case SUITS.HEARTS: {
        return "♥";
      }
      case SUITS.DIAMONDS: {
        return "♦";
      }
      case SUITS.CLUBS: {
        return "♣";
      }
      case SUITS.SPADES: {
        return "♠";
      }
      default: {
        throw new Error(`Invalid suit: ${this.suit}`);
      }
    }
  }

  prettyRank() {
    switch (this.rank) {
      case 1: {
        return "A";
      }
      case 13: {
        return "K";
      }
      case 12: {
        return "Q";
      }
      case 11: {
        return "J";
      }
      default: {
        if (this.rank > 13 || this.rank < 1) {
          throw new Error(`Invalid rank: ${this.rank}`);
        }

        return this.rank.toString();
      }
    }
  }

  render() {}
}
