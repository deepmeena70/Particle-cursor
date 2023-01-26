const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const toRadians = (degrees) => (degrees * Math.PI) / 180;
let particles = [];

// particle tracing circle
class Particle {
  constructor(x, y, deg) {
    this.x = x;
    this.y = y;
    this.size = 6;
    this.color = 'red';
    this.deg = deg;
    this.degIncrement = 1;
  }
  update() {
    if (this.deg >= 360) {
      this.deg = 0;
    } else {
      this.deg += this.degIncrement;
    }
  }
  draw() {
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((this.deg * Math.PI) / 180);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.globalAlpha = 1;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}

const fillParticles = (numberOfParticles) => {
  for (let i = 0; i < numberOfParticles; i++) {
    particles.push(new Particle(140, 140, 0));
  }
};

const setCanvas = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};

const animate = () => {
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animate);
};

addEventListener('load', () => {
  setCanvas();
  fillParticles(1);
  animate();
});

addEventListener('resize', () => {
  particles = [];
  setCanvas();
  fillParticles(1);
  animate();
});
