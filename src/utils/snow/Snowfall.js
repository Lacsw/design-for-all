import Snowflake from './Snowflake';
import img from './snowflake.svg';

class Snowfall {
  constructor(imageSrc = img) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.imageSrc = imageSrc;
    this.setStyles();
    document.body.append(this.canvas);
    window.addEventListener('resize', () => this.setSize());
    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this.frameId ? this.stop() : this.start();
      }
    });
    this.fps = [];
    this.defineFps();
  }
  defineFps(time) {
    this.fps.push(time);
    if (this.fps.length === 5) {
      this.fps = 1000 / (this.fps[4] - this.fps[3]);
      this.speedCf = 60 / this.fps;
      this.start();
      return;
    }
    requestAnimationFrame((t) => this.defineFps(t));
  }
  setStyles() {
    this.canvas.style.position = 'fixed';
    this.canvas.style.inset = 0;
    this.canvas.style.zIndex = 999;
    this.canvas.style.pointerEvents = 'none';
    this.setSize();
  }
  setSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  start() {
    this.image = new Image();
    this.image.src = this.imageSrc;
    this.image.onerror = () =>
      console.error(
        'Не удалось загрузить изображение по ссылке: ' + this.imageSrc
      );
    this.image.onload = () => {
      this.snowflakes = Array.from(
        { length: 50 },
        () => new Snowflake(this.canvas.width, this.canvas.height)
      );
      this.animate();
    };
  }
  animate() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.snowflakes.forEach((flake) => {
      flake.update(this.canvas.width, this.canvas.height, this.speedCf);
      this.draw(flake);
    });
    this.frameId = requestAnimationFrame(() => this.animate());
  }
  draw(flake) {
    this.context.globalAlpha = flake.opacity;
    this.context.drawImage(
      this.image,
      flake.x,
      flake.y,
      flake.size,
      flake.size
    );
  }
  stop() {
    cancelAnimationFrame(this.frameId);
    this.frameId = null;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default Snowfall;
