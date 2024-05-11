import { Container } from "pixi.js";
import { Card } from "./Card";

export class Hand extends Container {
  cards: Card[] = [];

  constructor(params: { cards: Card[] }) {
    const { cards } = params;

    super();
    this.cards = cards;

    this.cards.forEach((card, index) => {
      this.addChild(card);
      card.setPosition({ x: (card.width + 20) * index, y: 0 });
    });

    this.pivot.set(this.width / 2, this.height / 2);
  }
}
