import { Container } from "pixi.js";
import { Card } from "./Card";

export class CommunityCards extends Container {
  cards: Card[] = [];

  constructor(params: { cards: Card[] }) {
    const { cards } = params;

    super();
    this.cards = cards;

    this.cards.forEach((card, index) => {
      this.addChild(card);
      card.setPosition({ x: 0, y: (card.height + 20) * index });
    });

    this.pivot.set(this.width / 2, this.height / 2);
  }
}

// flop, turn, river
