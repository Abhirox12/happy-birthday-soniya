function nextPage() {
  document.querySelector('.landing').classList.add('hidden');
  document.getElementById('letter').classList.add('show');
}

// Balloon animation
const canvas = document.getElementById('balloons');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balloons = [];
for (let i = 0; i < 40; i++) {
  balloons.push({
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 200,
    r: 8 + Math.random() * 14,
    c: `hsl(${Math.random() * 360}, 80%, 70%)`,
    s: 1 + Math.random() * 2
  });
}

function animateBalloons() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let b of balloons) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = b.c;
    ctx.fill();
    b.y -= b.s;
    if (b.y < -b.r) {
      b.y = canvas.height + b.r;
      b.x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(animateBalloons);
}

animateBalloons();
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Fireworks (crackbusters)
const fw = document.getElementById('fireworks');
const fctx = fw.getContext('2d');
fw.width = window.innerWidth;
fw.height = window.innerHeight;

let particles = [];
function createFirework() {
  let x = Math.random() * fw.width;
  let y = Math.random() * fw.height / 2;
  let colors = ["#ff4e50", "#fc913a", "#f9d62e", "#eae374", "#e2f4c7"];
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: x,
      y: y,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 4 + 1,
      radius: Math.random() * 3 + 2,
      alpha: 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
}

function animateFireworks() {
  fctx.clearRect(0, 0, fw.width, fw.height);
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    let vx = Math.cos(p.angle) * p.speed;
    let vy = Math.sin(p.angle) * p.speed;
    p.x += vx;
    p.y += vy;
    p.alpha -= 0.01;
    if (p.alpha <= 0) particles.splice(i, 1);
    else {
      fctx.globalAlpha = p.alpha;
      fctx.beginPath();
      fctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      fctx.fillStyle = p.color;
      fctx.fill();
    }
  }
  fctx.globalAlpha = 1;
  requestAnimationFrame(animateFireworks);
}

setInterval(createFirework, 2000);
animateFireworks();

// Flower animation (soft floating flowers)
const flowerCanvas = document.getElementById('flowers');
const flowerCtx = flowerCanvas.getContext('2d');
flowerCanvas.width = window.innerWidth;
flowerCanvas.height = window.innerHeight;

let flowers = [];
for (let i = 0; i < 20; i++) {
  flowers.push({
    x: Math.random() * flowerCanvas.width,
    y: Math.random() * flowerCanvas.height,
    size: 10 + Math.random() * 20,
    speed: 0.5 + Math.random() * 1,
    angle: Math.random() * Math.PI * 2
  });
}

function drawFlower(x, y, size) {
  flowerCtx.beginPath();
  for (let i = 0; i < 5; i++) {
    flowerCtx.lineTo(
      x + size * Math.cos((Math.PI * 2 * i) / 5),
      y + size * Math.sin((Math.PI * 2 * i) / 5)
    );
  }
  flowerCtx.closePath();
  flowerCtx.fillStyle = 'rgba(255,255,255,0.4)';
  flowerCtx.fill();
}

function animateFlowers() {
  flowerCtx.clearRect(0, 0, flowerCanvas.width, flowerCanvas.height);
  for (let f of flowers) {
    f.y += f.speed;
    if (f.y > flowerCanvas.height) {
      f.y = -f.size;
      f.x = Math.random() * flowerCanvas.width;
    }
    drawFlower(f.x, f.y, f.size);
  }
  requestAnimationFrame(animateFlowers);
}

animateFlowers();
function nextPage() {
  document.querySelector(".landing").style.display = "none";
  const letter = document.querySelector(".letter");
  letter.classList.remove("hidden");
  letter.style.display = "flex";
}
