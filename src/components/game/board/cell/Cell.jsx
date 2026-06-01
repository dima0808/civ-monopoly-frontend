import './Cell.scss';

// import blueStarImg from '../../../../images/star-blue.png';
// import yellowStarImg from '../../../../images/star-yellow.png';

import { CELL_IMAGES } from '../../../../constants/game.js';

const Cell = ({
  orientation,
  placement,
  isMirrored,
  property: { name, type, upgrades },
  ownedProperty,
}) => {
  const ownerColor = ownedProperty?.member?.color;
  const isMortgaged =
    ownedProperty?.mortgage != null && ownedProperty.mortgage !== -1;

  const displayPrice = () => {
    if (ownerColor) {
      const isWonder = type === 'WONDER';
      const isEncampment = type === 'DISTRICT_ENCAMPMENT';
      const value = isWonder
        ? upgrades['LEVEL_1'].tourism
        : upgrades['LEVEL_1'].gos;
      return (
        <div
          className={`object-${orientation}__price no-select price-${type.toLowerCase()} ${isWonder ? 'object-tourism' : 'object-gold-on-step'}`}
        >
          {value}
          {isEncampment ? 'x' : ''}
        </div>
      );
    }
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
    const colorClass = ownerColor ? `color-${ownerColor.toLowerCase()}-g` : '';
    return (
      <div
        className={`object-${orientation}__cell ${colorClass} ${Object.keys(upgrades).length < 2 && `object-${orientation}__cell-none-upgrades`}`}
      >
        <div
          className={`not-blur ${isMortgaged ? 'gray-blur' : ''}`}
          style={
            isMortgaged
              ? { '--mortgage-value': `"${ownedProperty.mortgage}"` }
              : undefined
          }
        >
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
    if (Object.keys(upgrades).length < 2) return null;

    return (
      <div className={`object-${orientation}__upgrades`}>
        {/*<img src={blueStarImg} alt="Blue Star" className="star-blue" />*/}
        {/*<img src={blueStarImg} alt="Blue Star" className="star-blue" />*/}
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
