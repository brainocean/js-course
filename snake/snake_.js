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

const KEY_DIR_MAP = {
  87: NORTH,
  83: SOUTH,
  65: WEST,
  68: EAST,
};

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
  nextMove = _.getOr(nextMove, keyCode, KEY_DIR_MAP);
  snake = moveSnake(snake);

  return false;
}
