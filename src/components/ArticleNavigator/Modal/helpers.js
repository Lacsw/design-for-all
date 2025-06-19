// @ts-check

export class WheelConfig {
  /** @param {number} listLength */
  constructor(listLength) {
    this.minOpacity = 0;
    this.minScale = 0;
  }

  scaleRange = {
    x: [],
    y: [],
  };

  opacityRange = {
    x: [],
    y: [],
  };
}

const config = new WheelConfig(6);
