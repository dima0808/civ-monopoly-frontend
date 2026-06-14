import { useDispatch, useSelector } from 'react-redux';
import {
  CELL_IMAGES,
  UPGRADE_IMAGES,
  REQUIREMENT_DESCRIPTIONS,
  BONUS_IMAGES,
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
import GovernmentDepartments from './GovernmentDepartments.jsx';

const LEVEL_ORDER = [
  'LEVEL_1',
  'LEVEL_2',
  'LEVEL_3',
  'LEVEL_4',
  'LEVEL_4_1',
  'LEVEL_4_2',
  'LEVEL_4_3',
];

const BRANCH_LEVELS = ['LEVEL_4_1', 'LEVEL_4_2', 'LEVEL_4_3'];

const getHighestLevel = (ownedUpgrades) =>
  LEVEL_ORDER.filter((l) => ownedUpgrades.includes(l)).at(-1) || 'LEVEL_1';

const getNextLevel = (ownedUpgrades, configUpgrades) => {
  const configKeys = Object.keys(configUpgrades);
  return LEVEL_ORDER.find(
    (l) => configKeys.includes(l) && !ownedUpgrades.includes(l),
  );
};

const getTotalStats = (
  ownedUpgrades,
  configUpgrades,
  ownedBonuses,
  configBonuses,
) => {
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
  for (const bonus of ownedBonuses ?? []) {
    const b = configBonuses?.[bonus];
    if (b) {
      gos += b.gos || 0;
      gpt += b.gpt || 0;
      tourism += b.tourism || 0;
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

const PropertyCard = ({ position, ownedProperty, reqData }) => {
  const dispatch = useDispatch();
  const propertiesConfig = useSelector((state) => state.config.properties);
  const { room } = useSelector((state) => state.room);
  const { user } = useSelector((state) => state.auth);

  const config = propertiesConfig?.[position];
  if (!config) return null;

  const isOwn = ownedProperty?.member?.username === user?.username;
  const isForeign = !!ownedProperty && !isOwn;
  const currentMember = room.members.find((m) => m.username === user?.username);
  const isUserTurn =
    room.members.at(room.turnIndex)?.username === user?.username;

  const ownedUpgrades = ownedProperty?.upgrades ?? [];
  const isMortgaged = ownedProperty != null && ownedProperty.mortgage !== -1;

  const handleError = (e) => {
    dispatch(pushNotification({ type: NOTIFICATION_ERROR, error: e.message }));
  };

  const onUpgrade = (pos, upgradeType) => {
    upgradeProperty(pos, upgradeType).catch(handleError);
  };
  const onMortgage = (pos) => {
    mortgageProperty(pos).catch(handleError);
  };
  const onDemote = (pos) => {
    demoteProperty(pos).catch(handleError);
  };
  const onBuyback = (pos) => {
    buybackProperty(pos).catch(handleError);
  };

  const summaryUpgrades = ownedProperty ? ownedUpgrades : ['LEVEL_1'];
  const ownedBonuses = ownedProperty?.bonuses ?? [];
  const totals = getTotalStats(
    summaryUpgrades,
    config.upgrades,
    ownedBonuses,
    config.bonuses,
  );
  const highestLevel = getHighestLevel(ownedUpgrades);
  const image = CELL_IMAGES[config.name]?.[highestLevel];

  const nextLevel = getNextLevel(ownedUpgrades, config.upgrades);
  const nextUpgrade = nextLevel ? config.upgrades[nextLevel] : null;
  const hasHigherUpgrades = ownedUpgrades.length > 1;
  const canUpgrade =
    reqData?.requirements && Object.values(reqData.requirements).every(Boolean);

  // Government Plaza branches at level 4. Only the owner manages it; for others
  // we just show the chosen department (if any) as a read-only level.
  const isGovPlaza = config.upgrades['LEVEL_4_1'] != null;
  const isGovBranch = isGovPlaza && ownedUpgrades.includes('LEVEL_3');

  let displayLevels = LEVEL_ORDER.filter(
    (l) => config.upgrades[l] && !l.startsWith('LEVEL_4_'),
  );
  if (isForeign) {
    const ownedBranch = BRANCH_LEVELS.find((l) => ownedUpgrades.includes(l));
    if (ownedBranch) {
      displayLevels = [...displayLevels, ownedBranch];
    }
  }

  const colorClass = ownedProperty
    ? `color-${ownedProperty.member.color.toLowerCase()}-g`
    : 'empire-card--unowned';

  return (
    <div
      className={`empire-card ${colorClass} ${isMortgaged ? 'empire-card-mortgaged' : ''}`}
    >
      <div className="empire-card-name">{config.name}</div>
      <div
        className={`event-card-body ${isMortgaged ? 'gray-blur' : ''}`}
        style={
          isMortgaged
            ? { '--mortgage-value': `"${ownedProperty.mortgage}"` }
            : undefined
        }
      >
        <div className="event-card-grid">
          {image && (
            <div className="event-card-img-div">
              <img src={image} className="event-card-img" alt={config.name} />
            </div>
          )}
          <div className="event-card-stats">
            {!ownedProperty && (
              <div className="event-stat">
                Price:
                <span className="event-stat-value">
                  <img src={goldImg} className="event-stat-icon" alt="gold" />
                  {config.upgrades['LEVEL_1'].price}
                </span>
              </div>
            )}
            {totals.gos > 0 && (
              <div className="event-stat">
                Gold on step:
                <span className="event-stat-value">
                  <img src={goldImg} className="event-stat-icon" alt="gold" />
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

        {displayLevels.length > 1 && (
          <div className="empire-levels">
            {displayLevels.map((level) => {
              const upgrade = config.upgrades[level];
              const isOwned = ownedUpgrades.includes(level);
              const isNext =
                isOwn && !isOwned && level === reqData?.nextUpgrade;
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

        {ownedBonuses.length > 0 && (
          <div className="empire-bonuses">
            <h4 className="empire-bonuses-title">Buffs:</h4>
            {ownedBonuses.map((bonus) => {
              const bonusConfig = config.bonuses?.[bonus];
              if (!bonusConfig) return null;
              const isWonder = bonusConfig.type === 0;
              return (
                <div
                  key={bonus}
                  className={`empire-bonus ${isWonder ? 'empire-bonus-wonder' : 'empire-bonus-adjacency'}`}
                >
                  <div className="empire-bonus-grid">
                    <div className="empire-bonus-img-div">
                      {BONUS_IMAGES[bonus] && (
                        <img
                          src={BONUS_IMAGES[bonus]}
                          className="empire-bonus-img"
                          alt={bonusConfig.name}
                        />
                      )}
                    </div>
                    <div className="empire-bonus-name">{bonusConfig.name}</div>
                    <div className="empire-bonus-stats">
                      {bonusConfig.gos > 0 && (
                        <div className="empire-stat-row">
                          <span className="empire-stat-label">g.o.s</span>
                          <span className="empire-stat-value">
                            <img
                              src={goldImg}
                              className="empire-stat-icon"
                              alt="gos"
                            />
                            {bonusConfig.gos}
                          </span>
                        </div>
                      )}
                      {bonusConfig.tourism > 0 && (
                        <div className="empire-stat-row">
                          <span className="empire-stat-label">t.o.s</span>
                          <span className="empire-stat-value">
                            <img
                              src={tourismImg}
                              className="empire-stat-icon"
                              alt="tourism"
                            />
                            {bonusConfig.tourism}
                          </span>
                        </div>
                      )}
                      {bonusConfig.gpt > 0 && (
                        <div className="empire-stat-row">
                          <span className="empire-stat-label">g.p.t</span>
                          <span className="empire-stat-value">
                            <img
                              src={goldPerTurnImg}
                              className="empire-stat-icon"
                              alt="gpt"
                            />
                            {bonusConfig.gpt}
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

        {isOwn && isGovBranch && !isMortgaged && (
          <GovernmentDepartments
            config={config}
            property={ownedProperty}
            reqData={reqData}
            currentMember={currentMember}
            isUserTurn={isUserTurn}
            onUpgrade={onUpgrade}
            onDemote={onDemote}
          />
        )}

        {isOwn && !(isGovBranch && !isMortgaged) && (
          <div className="event-card-buttons">
            {!isMortgaged && nextUpgrade && (
              <button
                disabled={
                  !isUserTurn ||
                  !canUpgrade ||
                  currentMember.gold < nextUpgrade.price
                }
                onClick={() => onUpgrade(position, nextLevel)}
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
                onClick={() => onBuyback(position)}
                className="event-btn event-btn-buy"
              >
                redeem
              </button>
            )}
            {!isMortgaged && (
              <button
                disabled={!isUserTurn}
                onClick={() =>
                  hasHigherUpgrades ? onDemote(position) : onMortgage(position)
                }
                className="event-btn event-btn-skip"
              >
                {hasHigherUpgrades ? 'demote' : 'pledge'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
