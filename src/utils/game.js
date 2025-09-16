import { BOARD_CELL_RANGE } from '../constants/game.js';

export const getPropertiesForPlacement = (side, properties) => {
  return Object.fromEntries(
    Object.entries(properties).filter(
      ([key]) =>
        key >= BOARD_CELL_RANGE[side][0] && key <= BOARD_CELL_RANGE[side][1],
    ),
  );
};

const CELL_SIZE = 50;

export const calculatePosition = (position) => {
  if (position === 0) {
    return { topValue: 42, leftValue: 42, orientation: 'vertical' };
  } else if (position < 13) {
    return {
      topValue: 42,
      leftValue: 122 + CELL_SIZE * (position - 1),
      orientation: 'vertical',
    };
  } else if (position === 13) {
    return { topValue: 42, leftValue: 752, orientation: 'horizontal' };
  } else if (position < 24) {
    return {
      topValue: 122 + CELL_SIZE * (position - 14),
      leftValue: 752,
      orientation: 'horizontal',
    };
  } else if (position === 24) {
    return { topValue: 652, leftValue: 752, orientation: 'vertical' };
  } else if (position < 37) {
    return {
      topValue: 652,
      leftValue: 672 - CELL_SIZE * (position - 25),
      orientation: 'vertical',
    };
  } else if (position === 37) {
    return { topValue: 652, leftValue: 42, orientation: 'horizontal' };
  } else {
    return {
      topValue: 572 - CELL_SIZE * (position - 38),
      leftValue: 42,
      orientation: 'horizontal',
    };
  }
};

export const getTransform = (index, total, orientation) => {
  const transforms = {
    1: [[-10, -16]],
    2: [
      [-12, -22],
      [12, 20],
    ],
    3: [
      [12, -20],
      [-12, 0],
      [12, 20],
    ],
    4: [
      [-12, -22],
      [12, -10],
      [-12, 10],
      [12, 20],
    ],
    5: [
      [-10, -24],
      [12, -12],
      [-16, 0],
      [12, 12],
      [-12, 24],
    ],
    6: [
      [-12, -24],
      [12, -24],
      [-16, 0],
      [16, 0],
      [-12, 24],
      [12, 24],
    ],
  };

  const [x, y] = transforms[total][index];
  return orientation === 'vertical'
    ? `translate(${x}px, ${y}px)`
    : `translate(${y}px, ${x}px)`;
};

const EDGE_POSITIONS = [0, 13, 24, 37];
const TOTAL_CELLS = 48;

export const getPath = (start, end) => {
  if (start === end) return [];

  const path = [];
  let current = start;
  while (current !== end) {
    current = (current + 1) % TOTAL_CELLS;
    if (EDGE_POSITIONS.includes(current) || current === end) {
      path.push(current);
    }
  }
  return path;
};
