import goldImg from '../../../../images/icon-gold.png';
import goldPerTurnImg from '../../../../images/icon-gold-per-turn.png';
import tourismImg from '../../../../images/icon-tourism.png';
import { CELL_IMAGES } from '../../../../constants/game.js';

const ForeignProperty = ({ propertyConfig, roll, member, onPay }) => {
  const upgrade = propertyConfig.upgrades['LEVEL_1'];
  const image = CELL_IMAGES[propertyConfig.name]?.['LEVEL_1'];
  const rentAmount = upgrade.gos * (roll || 1);

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
              Gold on step:
              <span className="event-stat-value">
                <img src={goldImg} className="event-stat-icon" alt="gold" />
                {upgrade.gos}
                {roll > 0 ? 'x' : ''}
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
