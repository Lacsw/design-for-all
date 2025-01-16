import getRandom from './getRandom';

class Snowflake {
  constructor(canvasWidth, canvasHeight) {
    this.size = getRandom(15, 30);
    this.x = getRandom(0, canvasWidth - this.size);
    this.y = getRandom(-canvasHeight, -this.size);
    this.speedX = getRandom(-240 / this.size, 240 / this.size) / 10;
    this.speedY = Math.round(this.size / 15 * 10) / 10;
    this.opacity = getRandom(3, 9) / 10;
  }
  update(canvasWidth, canvasHeight, speedCf) {
    this.x += this.speedX * speedCf;
    this.y += this.speedY * speedCf;
    if (this.y > canvasHeight || this.x > canvasWidth || this.x < -this.size) {
      this.x = getRandom(0, canvasWidth - this.size);
      this.y = -this.size;
    }
  }
}

export default Snowflake;
