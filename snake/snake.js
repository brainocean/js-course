const SNAKE_SEGMENT_SIZE = 8;
const LEFT = [-1, 0];
const RIGHT = [1, 0];
const UP = [0, -1];
const DOWN = [0, 1];
const SPEED = 0.01;
const INIT_SNAKE = [
  [12, 12],
  [12, 11],
  [12, 10],
  [11, 10],
  [10, 10],
];

let snake = INIT_SNAKE;
let snakeDirection = [DOWN, DOWN, DOWN, RIGHT, RIGHT];

const snakeColor = "lightblue";

const scale = R.map((v) => v * SNAKE_SEGMENT_SIZE);
const move = R.zipWith((coord, dir) => coord + dir * SPEED);
const segmentDirection = (idx) => R.nth(idx);
const moveSnake = R.addIndex(R.map)((segment, idx) =>
  move(segment, segmentDirection(idx)(snakeDirection))
);
const updateSnakeDirection = (newHeadDir) =>
  R.compose(R.init, R.prepend(newHeadDir));

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

let lastFrameCount = 0;
function hasMovedOneStep() {
  if (frameCount - lastFrameCount >= 1 / SPEED) {
    lastFrameCount = frameCount;
    return true;
  } else return false;
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background("black");
  if (hasMovedOneStep()) {
    snakeDirection = updateSnakeDirection([1, 0])(snakeDirection);
  }
  snake = moveSnake(snake);
  drawSnake(snake);
}
