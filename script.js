"strict"

const canvas = document.querySelector("div.game canvas")
const ctx = canvas.getContext("2d")

class Bird {
  constructor(x, y, width, height, velocityY) {
    this.x = x;
    this.y = y;
    this.velocityY = velocityY;
    this.width = width;
    this.height = height;
  }

  draw() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.y += this.velocityY;
  }

  birdGravity() {
    this.velocityY += 0.075;
  }
}

class Pipe {
  constructor(width, gapHeight, velocityX) {
    this.width = width;
    this.velocityX = velocityX;
    this.gapHeight = gapHeight;
    this.position();
  }

  position() {
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.gapHeight);
  }

  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, 0, this.width, this.y)
    ctx.fillRect(this.x, this.y + this.gapHeight, this.width, canvas.height - this.gapHeight - this.y)
  }

  update() {
    this.x -= this.velocityX

    if (this.x + this.width < 0) {
      pipes.splice(0, 1)
    }
  }
}

function resetGame() {
  myBird = new Bird(30, 30, 50, 50, 1);
  pipes = [];
  score = 0;
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function checkCollision() {
  pipes.forEach((pipe) => {
    if (
      myBird.x < pipe.x + pipe.width &&
      myBird.x + myBird.width > pipe.x &&
      (myBird.y < pipe.y || myBird.y + myBird.height > pipe.y + pipe.gapHeight)
    ) {
      resetGame();
    }
  })
}

function handleKeyPress(event) {
  if (event.code === "Space") {
    myBird.velocityY = -3.5  
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  myBird.draw()
  myBird.update()
  myBird.birdGravity()
  console.log(myBird.velocityY)
  
  pipes.forEach((pipe) => {
    pipe.draw()
    pipe.update()
    if (pipe.x + pipe.width < myBird.x && !pipe.passed) {
      pipe.passed = true;
      score++; 
    }
  })

  drawScore()
  checkCollision()

  requestAnimationFrame(gameLoop)
}

document.addEventListener("keydown", handleKeyPress)
let myBird = new Bird(30, 30, 50, 50, 1)
let pipes = []
let minPipeDistance = 300;
let score = 0;

setInterval(() => {
  const pipe = new Pipe(50, 200, 1);
  pipes.push(pipe);
}, 2000);

gameLoop()