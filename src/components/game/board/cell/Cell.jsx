import './Cell.scss';

import blueStarImg from '../../../../images/star-blue.png';
// import yellowStarImg from '../../../../images/star-yellow.png';

import { CELL_IMAGES } from '../../../../constants/game.js';

const Cell = ({
  orientation,
  placement,
  isMirrored,
  property: { name, type, upgrades },
}) => {
  const displayPrice = () => {
    return (
      <div
        className={`object-${orientation}__price no-select price-${type.toLowerCase()} ${type === 'WONDER' ? 'object-tourism' : ''}`}
      >
        {upgrades['LEVEL_1'].price}
      </div>
    );
  };

  const displayImage = () => {
    const lastLevelUpgraded = 'LEVEL_1';
    return (
      <div
        className={`object-${orientation}__cell ${!upgrades && `object-${orientation}__cell-none-upgrades`}`}
      >
        <div className="not-blur">
          <img
            src={CELL_IMAGES[name][lastLevelUpgraded]}
            alt={upgrades[lastLevelUpgraded].name}
            className="cell-img"
          />
        </div>
      </div>
    );
  };

  const displayUpgrades = () => {
    if (!upgrades) return null;

    return (
      <div className={`object-${orientation}__upgrades`}>
        <img src={blueStarImg} alt="Blue Star" className="star-blue" />
        <img src={blueStarImg} alt="Blue Star" className="star-blue" />
      </div>
    );
  };

  const displayBlocksByPlacement = () => {
    switch (placement) {
      case 'up':
        return (
          <>
            {displayPrice()}
            {displayImage()}
            {displayUpgrades()}
          </>
        );
      case 'right':
        return (
          <>
            {displayUpgrades()}
            {displayImage()}
            {displayPrice()}
          </>
        );
      case 'down':
        return (
          <>
            {displayUpgrades()}
            {displayImage()}
            {displayPrice()}
          </>
        );
      case 'left':
        return (
          <>
            {displayPrice()}
            {displayImage()}
            {displayUpgrades()}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`object-${orientation} ${isMirrored && 'mirror'} border`}>
      {displayBlocksByPlacement()}
    </div>
  );
};

export default Cell;
