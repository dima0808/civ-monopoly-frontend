import './Cell.scss';

import barbariansImg from '../../../../images/barbarians.png';

const BarbCell = () => {
  return (
    <div className="object-vertical mirror border full-vertical-cell">
      <div className="object-vertical__barbarians-color"></div>
      <div className="object-vertical__cell">
        <img src={barbariansImg} alt="barbarians" className="cell-img-unique" />
      </div>
      <div className="object-vertical__barbarians-color"></div>
    </div>
  );
};

export default BarbCell;
