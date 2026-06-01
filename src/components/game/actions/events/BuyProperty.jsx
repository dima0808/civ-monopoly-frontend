import goldImg from '../../../../images/icon-gold.png';
import goldPerTurnImg from '../../../../images/icon-gold-per-turn.png';
import tourismImg from '../../../../images/icon-tourism.png';
import {
  CELL_IMAGES,
  REQUIREMENT_DESCRIPTIONS,
} from '../../../../constants/game.js';

const BuyProperty = ({
  propertyConfig,
  requirements,
  member,
  onBuy,
  onSkip,
}) => {
  const upgrade = propertyConfig.upgrades['LEVEL_1'];
  const allReqsMet =
    !requirements?.requirements ||
    Object.values(requirements.requirements).every(Boolean);
  const image = CELL_IMAGES[propertyConfig.name]?.['LEVEL_1'];

  return (
    <div className="event-card">
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
              Price:
              <span className="event-stat-value">
                <img src={goldImg} className="event-stat-icon" alt="gold" />
                {upgrade.price}
              </span>
            </div>
            <div className="event-stat">
              Gold on step:
              <span className="event-stat-value">
                <img src={goldImg} className="event-stat-icon" alt="gold" />
                {upgrade.gos}
              </span>
            </div>
            {upgrade.gpt > 0 && (
              <div className="event-stat">
                Gold per turn:
                <span className="event-stat-value">
                  <img
                    src={goldPerTurnImg}
                    className="event-stat-icon"
                    alt="gpt"
                  />
                  {upgrade.gpt}
                </span>
              </div>
            )}
            {upgrade.tourism > 0 && (
              <div className="event-stat">
                Tourism:
                <span className="event-stat-value">
                  <img
                    src={tourismImg}
                    className="event-stat-icon"
                    alt="tourism"
                  />
                  {upgrade.tourism}
                </span>
              </div>
            )}
          </div>
        </div>
        {upgrade.requirements?.length > 0 &&
          upgrade.requirements.map((req) => {
            const isMet = requirements?.requirements?.[req] !== false;
            return (
              <div
                key={req}
                className={`event-req-div ${!isMet ? 'event-req-div-unmet' : ''}`}
              >
                <p className="event-req-text">
                  {REQUIREMENT_DESCRIPTIONS[req] || req}
                </p>
              </div>
            );
          })}
        <div className="event-card-buttons">
          <button
            disabled={member?.gold < upgrade.price || !allReqsMet}
            onClick={onBuy}
            className="event-btn event-btn-buy"
          >
            buy:
            <img src={goldImg} className="event-stat-icon" alt="gold" />
            {upgrade.price}
          </button>
          <button onClick={onSkip} className="event-btn event-btn-skip">
            skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyProperty;
