import { Application, Sprite } from "pixi.js";
import { Deck } from "./Deck";
import { Hand } from "./Hand";
import { CommunityCards } from "./CommunityCards";
import { Result } from "./Result";
import { Table } from "./Table";

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

  const pressedKey = { ArrowUp: false, ArrowDown: false };

  window.addEventListener(
    "keydown",
    (e) => {
      switch (e.key) {
        case "ArrowUp":
          pressedKey.ArrowUp = true;
          break;
        case "ArrowDown":
          pressedKey.ArrowDown = true;
          break;
      }
    },
    false
  );
  window.addEventListener(
    "keyup",
    (e) => {
      switch (e.key) {
        case "ArrowUp":
          pressedKey.ArrowUp = false;
          app.stage.addChild(goodResult);
          setTimeout(() => {
            app.stage.removeChild(goodResult);
            table.deal();
          }, 1000);
          break;
        case "ArrowDown":
          pressedKey.ArrowDown = false;
          app.stage.addChild(badResult);
          setTimeout(() => {
            app.stage.removeChild(badResult);
            table.deal();
          }, 1000);
          break;
      }
    },
    false
  );

  const goodResult = new Result({ result: "You win!" });
  goodResult.position.set(app.screen.width / 2, app.screen.height / 2);
  const badResult = new Result({ result: "You lose!" });
  badResult.position.set(app.screen.width / 2, app.screen.height / 2);

  const table = new Table({
    appWidth: app.screen.width,
    appHeight: app.screen.height,
  });

  app.stage.addChild(table);
};

main();
