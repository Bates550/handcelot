import { Text, Container, Graphics } from "pixi.js";

export const SUITS = {
  HEARTS: "hearts",
  DIAMONDS: "diamonds",
  CLUBS: "clubs",
  SPADES: "spades",
} as const;
export type Suit = (typeof SUITS)[keyof typeof SUITS];

export class CardContainer extends Container {
  suit: Suit;
  rank: number;
  text: Text;
  cardRectangle: Graphics;

  constructor(params: {
    suit: Suit;
    rank: number;
    position?: { x: number; y: number };
  }) {
    const { suit, rank, position = { x: 0, y: 0 } } = params;

    super();
    this.suit = suit;
    this.rank = rank;

    this.text = new Text({
      text: `${this.prettyRank()} ${this.prettySuit()}`,
      style: {
        fontFamily: "Arial",
        fontSize: 24,
        fill: this.suitColor(),
        align: "center",
      },
    });

    this.cardRectangle = new Graphics()
      .roundRect(0, 0, 100, 200, 10)
      .fill(0xffffff);

    this.addChild(this.cardRectangle);
    this.addChild(this.text);

    this.setPosition(position);
  }

  setPosition(position: { x: number; y: number }) {
    this.position.set(position.x, position.y);
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
