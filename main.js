let canvas = document.querySelector("#canvas");
canvas.width = innerWidth
canvas.height = innerHeight
let c = canvas.getContext("2d");

let mouse = {
  x: null,
  y: null,
};

window.addEventListener("mousemove", function () {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener( 'resize' , function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
} )

let maxRadius = 60;

let colorArray = [
  "rgba( 0, 0, 255, 1 )",
];

function Circle(x, y, radius, dx, dy, minRadius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = minRadius;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    c.fillStyle = 'blue';
    c.fill();
  };
  this.upDate = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (
      mouse.x - this.x < maxRadius &&
      mouse.x - this.x > -maxRadius &&
      mouse.y - this.y < maxRadius &&
      mouse.y - this.y > -maxRadius
    ) {
    if(this.radius < maxRadius){
      this.radius += 1 };
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
    this.draw();
  };
}

let circleStore = [];

for (let j = 0; j < 800; j++) {
  let radius = Math.random()*6+1 ;
  let minRadius = radius;
  let x = Math.random() * (innerWidth - 2 * radius) + radius;
  let y = Math.random() * (innerHeight - 2 * radius) + radius;
  let dx = (Math.random() - 0.5) * 5;
  let dy = (Math.random() - 0.5) * 5;

  circleStore.push(new Circle(x, y, radius, dx, dy, minRadius));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleStore.length; i++) {
    circleStore[i].upDate();
  }
}
animate();
