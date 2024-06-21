import { Container } from "pixi.js";
import type { Card } from "./cards/Card";
import { CardContainer } from "./CardContainer";

export class HandContainer extends Container {
  cards: Card[] = [];

  constructor(params: { cards: Card[] }) {
    const { cards } = params;

    super();
    this.cards = cards;

    this.cards.forEach((card, index) => {
      const cardContainer = new CardContainer({ card });
      this.addChild(cardContainer);
      cardContainer.setPosition({
        x: (cardContainer.width + 20) * index,
        y: 0,
      });
    });

    this.pivot.set(this.width / 2, this.height / 2);
  }
}
