import { Container } from "pixi.js";
import { CardContainer } from "./CardContainer";
import { Card } from "./cards/Card";

export class CommunityCardsContainer extends Container {
  cards: Card[] = [];

  constructor(params: { cards: Card[] }) {
    const { cards } = params;

    super();
    this.cards = cards;

    this.cards.forEach((card, index) => {
      const cardContainer = new CardContainer({ card });
      this.addChild(cardContainer);
      cardContainer.setPosition({
        x: 0,
        y: (cardContainer.height + 20) * index,
      });
    });

    this.pivot.set(this.width / 2, this.height / 2);
  }
}

// flop, turn, river
