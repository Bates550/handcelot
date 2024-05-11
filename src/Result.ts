import { Container, Text } from "pixi.js";

export class Result extends Container {
  result: string;
  text: Text;

  constructor(params: { result: string }) {
    const { result } = params;

    super();
    this.result = result;

    this.text = new Text({
      text: this.result,
      style: {
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0x131313,
        align: "center",
      },
    });

    this.addChild(this.text);
    this.pivot.set(this.width / 2, this.height / 2);
  }
}
