const SNAKE_SEGMENT_SIZE = 8;
const WEST = [-1, 0];
const EAST = [1, 0];
const NORTH = [0, -1];
const SOUTH = [0, 1];
const STOP = [0, 0];
const SPEED = 0.05;
const INIT_SNAKE = [
  [12, 12],
  [12, 11],
  [12, 10],
  [11, 10],
  [10, 10],
];

let snake = INIT_SNAKE;
let snakeDirection = [SOUTH, SOUTH, SOUTH, EAST, EAST];
let nextMove = EAST;

const snakeColor = "lightblue";

const scale = _.map(_.multiply(SNAKE_SEGMENT_SIZE));
const coordAdd = _.zipWith(_.add);
const coordSubtract = _.zipWith(_.subtract);

const directions = (snake) =>
  _.concat(
    [nextMove],
    _.zipWith(coordSubtract, _.initial(snake), _.tail(snake))
  );

const moveSnake = (snake) => _.zipWith(coordAdd, snake, directions(snake));

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
    // snake = moveSnake(snake);
  }
  // snake = moveSnake(snake);
  drawSnake(snake);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    nextMove = NORTH;
  } else if (keyCode === DOWN_ARROW) {
    nextMove = SOUTH;
  } else if (keyCode === LEFT_ARROW) {
    nextMove = WEST;
  } else if (keyCode === RIGHT_ARROW) {
    nextMove = EAST;
  }
  snake = moveSnake(snake);

  return false;
}
