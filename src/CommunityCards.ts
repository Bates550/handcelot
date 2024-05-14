import { Container } from "pixi.js";
import { CardContainer } from "./Card";

export class CommunityCards extends Container {
  cards: CardContainer[] = [];

  constructor(params: { cards: CardContainer[] }) {
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
