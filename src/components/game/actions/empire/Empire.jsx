import './Empire.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  CELL_IMAGES,
  UPGRADE_IMAGES,
  REQUIREMENT_DESCRIPTIONS,
} from '../../../../constants/game.js';
import goldImg from '../../../../images/icon-gold.png';
import goldPerTurnImg from '../../../../images/icon-gold-per-turn.png';
import tourismImg from '../../../../images/icon-tourism.png';
import {
  upgradeProperty,
  mortgageProperty,
  demoteProperty,
  buybackProperty,
} from '../../../../http/requests/property.js';
import { pushNotification } from '../../../../store/slices/notificationSlice.js';
import { NOTIFICATION_ERROR } from '../../../../constants/notification.js';

const LEVEL_ORDER = [
  'LEVEL_1',
  'LEVEL_2',
  'LEVEL_3',
  'LEVEL_4',
  'LEVEL_4_1',
  'LEVEL_4_2',
  'LEVEL_4_3',
];

const getHighestLevel = (ownedUpgrades) => {
  return LEVEL_ORDER.filter((l) => ownedUpgrades.includes(l)).at(-1);
};

const getNextLevel = (ownedUpgrades, configUpgrades) => {
  const configKeys = Object.keys(configUpgrades);
  return LEVEL_ORDER.find(
    (l) => configKeys.includes(l) && !ownedUpgrades.includes(l),
  );
};

const getTotalStats = (ownedUpgrades, configUpgrades) => {
  let gos = 0;
  let gpt = 0;
  let tourism = 0;
  for (const level of ownedUpgrades) {
    const upgrade = configUpgrades[level];
    if (upgrade) {
      gos += upgrade.gos || 0;
      gpt += upgrade.gpt || 0;
      tourism += upgrade.tourism || 0;
    }
  }
  return { gos, gpt, tourism };
};

const getLevelImage = (config, level) => {
  if (level === 'LEVEL_1') {
    return CELL_IMAGES[config.name]?.['LEVEL_1'];
  }
  const upgradeName = config.upgrades[level]?.name;
  return upgradeName ? UPGRADE_IMAGES[upgradeName] : null;
};

const Empire = ({ ownedProperties, propertyRequirements }) => {
  const dispatch = useDispatch();
  const propertiesConfig = useSelector((state) => state.config.properties);
  const { room } = useSelector((state) => state.room);
  const { user } = useSelector((state) => state.auth);

  const isUserTurn =
    room.members.at(room.turnIndex)?.username === user?.username;
  const currentMember = room.members.find((m) => m.username === user?.username);

  const myProperties = Object.values(ownedProperties).filter(
    (p) => p.member?.username === user?.username,
  );

  const handleError = (e) => {
    dispatch(pushNotification({ type: NOTIFICATION_ERROR, error: e.message }));
  };

  const onUpgrade = (position, upgradeType) => {
    upgradeProperty(position, upgradeType).catch(handleError);
  };

  const onMortgage = (position) => {
    mortgageProperty(position).catch(handleError);
  };

  const onDemote = (position) => {
    demoteProperty(position).catch(handleError);
  };

  const onBuyback = (position) => {
    buybackProperty(position).catch(handleError);
  };

  if (!propertiesConfig || !currentMember) return null;

  if (myProperties.length === 0) {
    return (
      <div className="empire-empty">
        <p>No properties owned yet.</p>
      </div>
    );
  }

  return (
    <div className="empire-list scroll">
      {myProperties.map((property) => {
        const config = propertiesConfig[property.position];
        if (!config) return null;

        const isMortgaged = property.mortgage !== -1;
        const highestLevel = getHighestLevel(property.upgrades);
        const nextLevel = getNextLevel(property.upgrades, config.upgrades);
        const nextUpgrade = nextLevel ? config.upgrades[nextLevel] : null;
        const image = CELL_IMAGES[config.name]?.[highestLevel];
        const hasHigherUpgrades = property.upgrades.length > 1;
        const totals = getTotalStats(property.upgrades, config.upgrades);

        const reqData = propertyRequirements[property.position];
        const canUpgrade =
          reqData?.requirements &&
          Object.values(reqData.requirements).every(Boolean);

        const allLevels = LEVEL_ORDER.filter(
          (l) => config.upgrades[l] && !l.startsWith('LEVEL_4_'),
        );

        return (
          <div
            key={property.position}
            className={`empire-card color-${property.member.color.toLowerCase()}-g ${isMortgaged ? 'empire-card-mortgaged' : ''}`}
          >
            <div className="empire-card-name">{config.name}</div>
            <div
              className={`event-card-body ${isMortgaged ? 'gray-blur' : ''}`}
              style={
                isMortgaged
                  ? { '--mortgage-value': `"${property.mortgage}"` }
                  : undefined
              }
            >
              <div className="event-card-grid">
                {image && (
                  <div className="event-card-img-div">
                    <img
                      src={image}
                      className="event-card-img"
                      alt={config.name}
                    />
                  </div>
                )}
                <div className="event-card-stats">
                  {totals.gos > 0 && (
                    <div className="event-stat">
                      Gold on step:
                      <span className="event-stat-value">
                        <img
                          src={goldImg}
                          className="event-stat-icon"
                          alt="gold"
                        />
                        {totals.gos}
                      </span>
                    </div>
                  )}
                  {totals.gpt > 0 && (
                    <div className="event-stat">
                      Gold per turn:
                      <span className="event-stat-value">
                        <img
                          src={goldPerTurnImg}
                          className="event-stat-icon"
                          alt="gpt"
                        />
                        {totals.gpt}
                      </span>
                    </div>
                  )}
                  {totals.tourism > 0 && (
                    <div className="event-stat">
                      Tourism:
                      <span className="event-stat-value">
                        <img
                          src={tourismImg}
                          className="event-stat-icon"
                          alt="tourism"
                        />
                        {totals.tourism}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {allLevels.length > 1 && (
                <div className="empire-levels">
                  {allLevels.map((level) => {
                    const upgrade = config.upgrades[level];
                    const isOwned = property.upgrades.includes(level);
                    const isNext = !isOwned && level === reqData?.nextUpgrade;
                    const allReqsMet =
                      isNext &&
                      reqData?.requirements &&
                      Object.values(reqData.requirements).every(Boolean);
                    const levelClass = isOwned
                      ? 'empire-level-owned'
                      : isNext && allReqsMet
                        ? 'empire-level-next'
                        : isNext
                          ? ''
                          : 'empire-level-future';
                    const levelImage = getLevelImage(config, level);
                    return (
                      <div key={level} className={`empire-level ${levelClass}`}>
                        <h3 className="empire-level-h3">{upgrade.name}</h3>
                        <div className="empire-level-grid">
                          <div className="empire-level-img-div">
                            {levelImage && (
                              <img
                                src={levelImage}
                                className="empire-level-img"
                                alt={upgrade.name}
                              />
                            )}
                          </div>
                          <div className="empire-level-requirements">
                            {upgrade.requirements?.map((req) => (
                              <p
                                key={req}
                                className={`empire-level-req-text ${isNext && reqData?.requirements?.[req] === false ? 'empire-level-req-unmet' : ''}`}
                              >
                                {REQUIREMENT_DESCRIPTIONS[req] || req}
                              </p>
                            ))}
                          </div>
                          <div className="empire-level-stats">
                            <div className="empire-stat-row">
                              <span className="empire-stat-label">cost</span>
                              <span className="empire-stat-value">
                                <img
                                  src={goldImg}
                                  className="empire-stat-icon"
                                  alt="gold"
                                />
                                {upgrade.price}
                              </span>
                            </div>
                            {upgrade.gos > 0 && (
                              <div className="empire-stat-row">
                                <span className="empire-stat-label">g.o.s</span>
                                <span className="empire-stat-value">
                                  <img
                                    src={goldImg}
                                    className="empire-stat-icon"
                                    alt="gos"
                                  />
                                  {upgrade.gos}
                                </span>
                              </div>
                            )}
                            {upgrade.tourism > 0 && (
                              <div className="empire-stat-row">
                                <span className="empire-stat-label">t.o.s</span>
                                <span className="empire-stat-value">
                                  <img
                                    src={tourismImg}
                                    className="empire-stat-icon"
                                    alt="tourism"
                                  />
                                  {upgrade.tourism}
                                </span>
                              </div>
                            )}
                            {upgrade.gpt > 0 && (
                              <div className="empire-stat-row">
                                <span className="empire-stat-label">g.p.t</span>
                                <span className="empire-stat-value">
                                  <img
                                    src={goldPerTurnImg}
                                    className="empire-stat-icon"
                                    alt="gpt"
                                  />
                                  {upgrade.gpt}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="event-card-buttons">
                {!isMortgaged && nextUpgrade && (
                  <button
                    disabled={
                      !isUserTurn ||
                      !canUpgrade ||
                      currentMember.gold < nextUpgrade.price
                    }
                    onClick={() => onUpgrade(property.position, nextLevel)}
                    className="event-btn event-btn-buy"
                  >
                    upgrade:
                    <img src={goldImg} className="event-stat-icon" alt="gold" />
                    {nextUpgrade.price}
                  </button>
                )}
                {isMortgaged && (
                  <button
                    disabled={!isUserTurn}
                    onClick={() => onBuyback(property.position)}
                    className="event-btn event-btn-buy"
                  >
                    redeem
                  </button>
                )}
                {!isMortgaged && (
                  <button
                    disabled={!isUserTurn}
                    onClick={() =>
                      hasHigherUpgrades
                        ? onDemote(property.position)
                        : onMortgage(property.position)
                    }
                    className="event-btn event-btn-skip"
                  >
                    {hasHigherUpgrades ? 'demote' : 'pledge'}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Empire;
