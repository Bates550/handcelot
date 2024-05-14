import { Container } from "pixi.js";
import { CardContainer } from "./Card";

export class HandContainer extends Container {
  cards: CardContainer[] = [];

  constructor(params: { cards: CardContainer[] }) {
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
