import './Cell.scss';

import goodyHutImg from '../../../../images/goody_hut.png';

const GoodyHutCell = () => {
  return (
    <div className="object-vertical border full-vertical-cell">
      <div className="object-vertical__village-color"></div>
      <div className="object-vertical__cell">
        <img src={goodyHutImg} alt="goody hut" className="cell-img-unique" />
      </div>
      <div className="object-vertical__village-color"></div>
    </div>
  );
};

export default GoodyHutCell;
