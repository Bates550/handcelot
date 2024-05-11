import { Application, Sprite } from "pixi.js";
import { Deck } from "./Deck";
import { Hand } from "./Hand";

const main = async () => {
  const app = new Application();

  await app.init({
    view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 0x35654d,
    width: 480,
    height: 640,
  });

  const clampy: Sprite = Sprite.from("clampy.png");

  clampy.anchor.set(0.5);

  clampy.x = app.screen.width / 2;
  clampy.y = app.screen.height / 2;

  const deck = new Deck();

  // deck.shuffle();

  // deck.cards.forEach((card, i) => {
  //   console.log(`${i + 1}: ${card.suit} ${card.number}`);
  // });

  const card1 = deck.draw()!;
  const card2 = deck.draw()!;
  const card3 = deck.draw()!;

  const hand = new Hand({ cards: [card1, card2, card3] });

  app.stage.addChild(hand);
};

main();
