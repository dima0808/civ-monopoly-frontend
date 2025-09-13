import './Board.scss';

import Cell from './cell/Cell.jsx';
import { BOARD_CELL_RANGE } from '../../../constants/game.js';
import { cloneElement } from 'react';

const SideBoard = ({ placement, properties, uniqueCells = [] }) => {
  const cellOrientation =
    placement === 'left' || placement === 'right' ? 'horizontal' : 'vertical';
  const isCellMirrored = placement === 'down' || placement === 'right';

  const displayCells = () => {
    const [start, end] = BOARD_CELL_RANGE[placement];
    let uniqueIndex = 0;
    const indices =
      placement === 'left' || placement === 'down'
        ? [...Array(end - start + 1)].map((_, idx) => end - idx)
        : [...Array(end - start + 1)].map((_, idx) => start + idx);
    return indices.map((i) => {
      if (properties[i]) {
        return (
          <Cell
            key={i}
            orientation={cellOrientation}
            placement={placement}
            isMirrored={isCellMirrored}
            property={properties[i]}
          />
        );
      } else if (
        uniqueIndex < uniqueCells.length &&
        cellOrientation === 'vertical'
      ) {
        const uniqueCell = cloneElement(uniqueCells[uniqueIndex], {
          key: `unique-${i}`,
        });
        uniqueIndex++;
        return uniqueCell;
      } else {
        return <div key={`empty-${i}`}>Empty</div>;
      }
    });
  };

  return (
    <div
      className={`board__element board__element-side board__element-side-${cellOrientation} ${placement}`}
    >
      {displayCells()}
    </div>
  );
};

export default SideBoard;
