import './Cashflow.scss';

import goldPerTurnImg from '../../../../images/icon-gold-per-turn.png';
import { useSelector } from 'react-redux';

const EFFECT_NAMES = {
  COMMERCIAL_HUB_INVESTMENT_1: 'Trade Route I',
  COMMERCIAL_HUB_INVESTMENT_2: 'Trade Route II',
  COMMERCIAL_HUB_INVESTMENT_3: 'Trade Route III',
  COMMERCIAL_HUB_INVESTMENT_4: 'Trade Route IV',
};

const getPropertyGpt = (prop, config) => {
  let gpt = 0;
  for (const level of prop.upgrades) {
    gpt += config.upgrades[level]?.gpt || 0;
  }
  for (const bonus of prop.bonuses ?? []) {
    gpt += config.bonuses?.[bonus]?.gpt || 0;
  }
  return gpt;
};

const Cashflow = ({ ownedProperties }) => {
  const propertiesConfig = useSelector((state) => state.config.properties);
  const { room } = useSelector((state) => state.room);
  const { user } = useSelector((state) => state.auth);

  const currentMember = room?.members?.find(
    (m) => m.username === user?.username,
  );

  if (!propertiesConfig) return null;

  const myProperties = Object.values(ownedProperties).filter(
    (p) => p.member?.username === user?.username && p.mortgage === -1,
  );

  const propertyGpt = myProperties.reduce((sum, prop) => {
    const config = propertiesConfig[prop.position];
    if (!config) return sum;
    return sum + getPropertyGpt(prop, config);
  }, 0);

  const effects = (currentMember?.additionalEffects ?? []).filter(
    (e) => e.goldPerTurn > 0,
  );

  const effectGpt = effects.reduce(
    (sum, effect) => sum + (effect.goldPerTurn || 0),
    0,
  );

  const totalGpt = propertyGpt + effectGpt;

  return (
    <div className="cashflow scroll">
      <div className="cashflow-summary">
        <div className="value">
          <h2>Gold per turn:</h2>
          <div className="player-stat-gold gold-per-turn width-full no-select">
            <img src={goldPerTurnImg} className="recourse-img" alt="gold" />+
            {totalGpt}
          </div>
        </div>
      </div>

      <div className="cashflow-section cashflow-income">
        <div className="value">
          <h2>Income:</h2>
          <div className="player-stat-gold gold-per-turn width-full no-select">
            <img src={goldPerTurnImg} className="recourse-img" alt="gold" />+
            {totalGpt}
          </div>
        </div>

        <ul className="cashflow-list">
          {myProperties.map((prop) => {
            const config = propertiesConfig[prop.position];
            if (!config) return null;
            const gpt = getPropertyGpt(prop, config);
            if (gpt === 0) return null;
            return (
              <li key={prop.position} className="value">
                <div className="player-stat-gold gold-per-turn width-full no-select">
                  <img
                    src={goldPerTurnImg}
                    className="recourse-img"
                    alt="gold"
                  />
                  +{gpt}
                </div>
                <div className="cashflow-source">
                  <h3>
                    from <span className="cashflow-name">{config.name}</span>
                  </h3>
                </div>
              </li>
            );
          })}

          {effects.map((effect) => (
            <li key={effect.type} className="value">
              <div className="player-stat-gold gold-per-turn width-full no-select">
                <img src={goldPerTurnImg} className="recourse-img" alt="gold" />
                +{effect.goldPerTurn}
              </div>
              <div className="cashflow-source">
                <h3>
                  from{' '}
                  <span className="cashflow-name">
                    {EFFECT_NAMES[effect.type] || effect.type}
                  </span>
                  {effect.turnsLeft > 0 && (
                    <span className="cashflow-turns">
                      {' '}
                      ({effect.turnsLeft} turns)
                    </span>
                  )}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cashflow;
