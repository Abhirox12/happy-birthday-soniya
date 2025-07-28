const glitterCanvas = document.getElementById("glitter");
const glitterCtx = glitterCanvas.getContext("2d");
glitterCanvas.width = window.innerWidth;
glitterCanvas.height = window.innerHeight;

let glitters = [];
document.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 5; i++) {
    glitters.push({
      x: e.clientX,
      y: e.clientY,
      radius: Math.random() * 2 + 1,
      alpha: 1,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
      color: `hsl(${Math.random() * 360}, 100%, 75%)`
    });
  }
});

function animateGlitters() {
  glitterCtx.clearRect(0, 0, glitterCanvas.width, glitterCanvas.height);
  for (let i = 0; i < glitters.length; i++) {
    let g = glitters[i];
    glitterCtx.beginPath();
    glitterCtx.arc(g.x, g.y, g.radius, 0, 2 * Math.PI);
    glitterCtx.fillStyle = g.color;
    glitterCtx.globalAlpha = g.alpha;
    glitterCtx.fill();

    g.x += g.dx;
    g.y += g.dy;
    g.alpha -= 0.02;

    if (g.alpha <= 0) {
      glitters.splice(i, 1);
      i--;
    }
  }
  glitterCtx.globalAlpha = 1;
  requestAnimationFrame(animateGlitters);
}

animateGlitters();
window.addEventListener("resize", () => {
  glitterCanvas.width = window.innerWidth;
  glitterCanvas.height = window.innerHeight;
});