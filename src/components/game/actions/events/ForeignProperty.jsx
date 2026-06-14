import goldImg from '../../../../images/icon-gold.png';
import goldPerTurnImg from '../../../../images/icon-gold-per-turn.png';
import tourismImg from '../../../../images/icon-tourism.png';
import { CELL_IMAGES } from '../../../../constants/game.js';

const LEVEL_ORDER = [
  'LEVEL_1',
  'LEVEL_2',
  'LEVEL_3',
  'LEVEL_4',
  'LEVEL_4_1',
  'LEVEL_4_2',
  'LEVEL_4_3',
];

const ForeignProperty = ({
  propertyConfig,
  ownedProperty,
  roll,
  member,
  onPay,
}) => {
  const ownedUpgrades = ownedProperty?.upgrades || [];
  const ownedBonuses = ownedProperty?.bonuses || [];
  const highestLevel =
    LEVEL_ORDER.filter((l) => ownedUpgrades.includes(l)).at(-1) || 'LEVEL_1';
  const image = CELL_IMAGES[propertyConfig.name]?.[highestLevel];

  let totalGos = 0;
  let totalGpt = 0;
  let totalTourism = 0;
  for (const level of ownedUpgrades) {
    const u = propertyConfig.upgrades[level];
    if (u) {
      totalGos += u.gos || 0;
      totalGpt += u.gpt || 0;
      totalTourism += u.tourism || 0;
    }
  }
  for (const bonus of ownedBonuses) {
    const b = propertyConfig.bonuses?.[bonus];
    if (b) {
      totalGos += b.gos || 0;
      totalGpt += b.gpt || 0;
      totalTourism += b.tourism || 0;
    }
  }

  const rentAmount = totalGos * (roll || 1);
  const ownerColor = ownedProperty?.member?.color;

  return (
    <div
      className={`event-card ${ownerColor ? `color-${ownerColor.toLowerCase()}-g` : ''}`}
    >
      <div className="event-card-header">{propertyConfig.name}</div>
      <div className="event-card-body">
        <div className="event-card-grid">
          {image && (
            <div className="event-card-img-div">
              <img
                src={image}
                className="event-card-img"
                alt={propertyConfig.name}
              />
            </div>
          )}
          <div className="event-card-stats">
            <div className="event-stat">
              Gold on step:
              <span className="event-stat-value">
                <img src={goldImg} className="event-stat-icon" alt="gold" />
                {totalGos}
                {roll > 0 ? 'x' : ''}
              </span>
            </div>
            {totalGpt > 0 && (
              <div className="event-stat">
                Gold per turn:
                <span className="event-stat-value">
                  <img
                    src={goldPerTurnImg}
                    className="event-stat-icon"
                    alt="gpt"
                  />
                  {totalGpt}
                </span>
              </div>
            )}
            {totalTourism > 0 && (
              <div className="event-stat">
                Tourism:
                <span className="event-stat-value">
                  <img
                    src={tourismImg}
                    className="event-stat-icon"
                    alt="tourism"
                  />
                  {totalTourism}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="event-card-buttons">
          <button
            disabled={member?.gold < rentAmount}
            onClick={onPay}
            className="event-btn event-btn-buy"
          >
            pay:
            <img src={goldImg} className="event-stat-icon" alt="gold" />
            {rentAmount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForeignProperty;
