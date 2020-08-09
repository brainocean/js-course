const snakeSegmentSize = 8;
const speed = 0.05;
const initSnake = [
  [10, 10],
  [11, 10],
  [12, 10],
];

const snakeColor = "lightblue";

const scale = _.map((v) => v * snakeSegmentSize);

function drawSnakeSegment(x, y) {
  rectMode(CENTER);
  fill(snakeColor);
  stroke(snakeColor);
  rect.apply(null, scale([x, y, 1, 1]));
}
function drawSnake(snake) {
  snake.forEach((segment) => {
    drawSnakeSegment(segment[0], segment[1]);
  });
}

function setup() {
  createCanvas(400, 400);
  background("black");
}

function draw() {
  drawSnake(initSnake);
}
