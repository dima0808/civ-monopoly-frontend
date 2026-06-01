import './Empire.scss';
import { useDispatch, useSelector } from 'react-redux';
import { CELL_IMAGES } from '../../../../constants/game.js';
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

const Empire = ({ ownedProperties }) => {
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
        const currentUpgrade = config.upgrades[highestLevel];
        const nextUpgrade = nextLevel ? config.upgrades[nextLevel] : null;
        const image = CELL_IMAGES[config.name]?.[highestLevel];
        const hasHigherUpgrades = property.upgrades.length > 1;

        return (
          <div
            key={property.position}
            className={`empire-card color-${property.member.color.toLowerCase()}-g ${isMortgaged ? 'empire-card-mortgaged' : ''}`}
          >
            <div className="empire-card-name">{config.name}</div>
            <div className="event-card-body">
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
                  {currentUpgrade.gos > 0 && (
                    <div className="event-stat">
                      Gold on step:
                      <span className="event-stat-value">
                        <img
                          src={goldImg}
                          className="event-stat-icon"
                          alt="gold"
                        />
                        {currentUpgrade.gos}
                      </span>
                    </div>
                  )}
                  {currentUpgrade.gpt > 0 && (
                    <div className="event-stat">
                      Gold per turn:
                      <span className="event-stat-value">
                        <img
                          src={goldPerTurnImg}
                          className="event-stat-icon"
                          alt="gpt"
                        />
                        {currentUpgrade.gpt}
                      </span>
                    </div>
                  )}
                  {currentUpgrade.tourism > 0 && (
                    <div className="event-stat">
                      Tourism:
                      <span className="event-stat-value">
                        <img
                          src={tourismImg}
                          className="event-stat-icon"
                          alt="tourism"
                        />
                        {currentUpgrade.tourism}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="event-card-buttons">
                {!isMortgaged && nextUpgrade && (
                  <button
                    disabled={
                      !isUserTurn || currentMember.gold < nextUpgrade.price
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
