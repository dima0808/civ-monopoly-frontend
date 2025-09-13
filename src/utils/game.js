import { BOARD_CELL_RANGE } from '../constants/game.js';

export const getPropertiesForPlacement = (side, properties) => {
  return Object.fromEntries(
    Object.entries(properties).filter(
      ([key]) =>
        key >= BOARD_CELL_RANGE[side][0] && key <= BOARD_CELL_RANGE[side][1],
    ),
  );
};

export const calculatePosition = (position) => {
  if (position === 0) {
    return { topValue: 42, leftValue: 42, position: 'vertical' };
  } else if (position < 13) {
    return {
      topValue: 42,
      leftValue: 122 + 50 * (position - 1),
      position: 'vertical',
    };
  } else if (position === 13) {
    return { topValue: 42, leftValue: 752, position: 'horizontal' };
  } else if (position < 24) {
    return {
      topValue: 122 + 50 * (position - 14),
      leftValue: 752,
      position: 'horizontal',
    };
  } else if (position === 24) {
    return { topValue: 652, leftValue: 752, position: 'vertical' };
  } else if (position < 37) {
    return {
      topValue: 652,
      leftValue: 672 - 50 * (position - 25),
      position: 'vertical',
    };
  } else if (position === 37) {
    return { topValue: 652, leftValue: 42, position: 'horizontal' };
  } else {
    return {
      topValue: 572 - 50 * (position - 38),
      leftValue: 42,
      position: 'horizontal',
    };
  }
};

export const getTransform = (index, total, position) => {
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
  return position === 'vertical'
    ? `translate(${x}px, ${y}px)`
    : `translate(${y}px, ${x}px)`;
};
