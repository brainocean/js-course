const snakeSegmentSize = 8;
const speed = 0.05;
const initSnake = [
  [10, 10],
  [11, 10],
  [12, 10],
  [12, 11],
  [12, 12],
];

let snake = initSnake;
let snakeDirection = Array(initSnake.length).fill([1, 0]);

const snakeColor = "lightblue";

const scale = R.map((v) => v * snakeSegmentSize);
const move = R.zipWith((coord, dir) => coord + dir * speed);
const moveSnake = R.addIndex(R.map)((segment, idx) =>
  move(segment, snakeDirection[idx])
);

console.log(moveSnake(snake));

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
}

function draw() {
  background("black");
  snake = moveSnake(snake);
  drawSnake(snake);
}
