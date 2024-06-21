import { Application, Sprite } from "pixi.js";
import { Result } from "./Result";
import { TableContainer } from "./TableContainer";

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

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        pressedKey.ArrowUp = true;
        break;
      case "ArrowDown":
        pressedKey.ArrowDown = true;
        break;
    }
  });
  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "ArrowUp":
        pressedKey.ArrowUp = false;
        if (table.winningHand === "top") {
          showGoodResult();
        } else {
          showBadResult();
        }
        break;
      case "ArrowDown":
        pressedKey.ArrowDown = false;
        if (table.winningHand === "bottom") {
          showGoodResult();
        } else {
          showBadResult();
        }
        break;
    }
  });

  const showGoodResult = () => {
    app.stage.addChild(goodResult);
    setTimeout(() => {
      app.stage.removeChild(goodResult);
      table.deal();
    }, 1000);
  };

  const showBadResult = () => {
    app.stage.addChild(badResult);
    setTimeout(() => {
      app.stage.removeChild(badResult);
      table.deal();
    }, 1000);
  };

  const goodResult = new Result({ result: "Correct :D" });
  goodResult.position.set(app.screen.width / 2, app.screen.height / 2);
  const badResult = new Result({ result: "Incorrect :(" });
  badResult.position.set(app.screen.width / 2, app.screen.height / 2);

  const table = new TableContainer({
    appWidth: app.screen.width,
    appHeight: app.screen.height,
  });

  app.stage.addChild(table);
};

main();
