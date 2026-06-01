import './Cell.scss';

import blueStarImg from '../../../../images/star-blue.png';
import yellowStarImg from '../../../../images/star-yellow.png';

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
        className={`object-${orientation}__price no-select price-${type.toLowerCase()}`}
      >
        {upgrades['LEVEL_1'].price}
      </div>
    );
  };

  const LEVEL_ORDER = [
    'LEVEL_1',
    'LEVEL_2',
    'LEVEL_3',
    'LEVEL_4',
    'LEVEL_4_1',
    'LEVEL_4_2',
    'LEVEL_4_3',
  ];

  const displayImage = () => {
    const ownedUpgrades = ownedProperty?.upgrades || [];
    const lastLevelUpgraded =
      LEVEL_ORDER.filter((l) => ownedUpgrades.includes(l)).at(-1) || 'LEVEL_1';
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

    const ownedUpgrades = ownedProperty?.upgrades || [];
    const allConfigLevels = LEVEL_ORDER.filter((l) => upgrades[l]);
    const ownedCount = ownedUpgrades.filter((l) =>
      l.startsWith('LEVEL'),
    ).length;
    const isGovernment = type === 'DISTRICT_GOVERNMENT';
    const highestOwned = LEVEL_ORDER.filter((l) =>
      ownedUpgrades.includes(l),
    ).at(-1);
    const allOwned =
      ownedCount === allConfigLevels.length ||
      (isGovernment && highestOwned?.startsWith('LEVEL_4_'));

    return (
      <div className={`object-${orientation}__upgrades`}>
        {ownedProperty?.member &&
          (() => {
            if (allOwned) {
              return (
                <img
                  src={yellowStarImg}
                  alt="Yellow Star"
                  className="star-yellow"
                />
              );
            }
            return Array.from({ length: Math.max(0, ownedCount - 1) }).map(
              (_, i) => (
                <img
                  key={i}
                  src={blueStarImg}
                  alt="Blue Star"
                  className="star-blue"
                />
              ),
            );
          })()}
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
