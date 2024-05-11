import { Application, Sprite } from "pixi.js";
import { Deck } from "./Deck";
import { Hand } from "./Hand";
import { CommunityCards } from "./CommunityCards";

const main = async () => {
  const app = new Application();

  await app.init({
    view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 0x35654d,
    width: 960,
    height: 1000,
  });

  const clampy: Sprite = Sprite.from("clampy.png");

  clampy.anchor.set(0.5);

  clampy.x = app.screen.width / 2;
  clampy.y = app.screen.height / 2;

  const deck = new Deck();

  deck.shuffle();

  // deck.cards.forEach((card, i) => {
  //   console.log(`${i + 1}: ${card.suit} ${card.number}`);
  // });

  const card1 = deck.draw()!;
  const card2 = deck.draw()!;
  const card3 = deck.draw()!;

  const card4 = deck.draw()!;
  const card5 = deck.draw()!;
  const card6 = deck.draw()!;

  const card7 = deck.draw()!;
  const card8 = deck.draw()!;
  const card9 = deck.draw()!;

  const topHand = new Hand({ cards: [card1, card2, card3] });
  topHand.position.set(app.screen.width / 2, app.screen.height / 2 - 200);

  const bottomHand = new Hand({ cards: [card4, card5, card6] });
  bottomHand.position.set(app.screen.width / 2, app.screen.height / 2 + 200);

  const communityCards = new CommunityCards({ cards: [card7, card8, card9] });
  communityCards.position.set(100, app.screen.height / 2);

  app.stage.addChild(topHand);
  app.stage.addChild(bottomHand);
  app.stage.addChild(communityCards);
};

main();
