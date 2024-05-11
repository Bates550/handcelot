import { Application, Sprite } from "pixi.js";
import { Deck } from "./Deck";

const app = new Application<HTMLCanvasElement>({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: 0x6495ed,
  width: 640,
  height: 480,
});

const clampy: Sprite = Sprite.from("clampy.png");

clampy.anchor.set(0.5);

clampy.x = app.screen.width / 2;
clampy.y = app.screen.height / 2;

const deck = new Deck();

// deck.shuffle();

deck.cards.forEach((card, i) => {
  console.log(`${i + 1}: ${card.suit} ${card.number}`);
});

app.stage.addChild(clampy);
