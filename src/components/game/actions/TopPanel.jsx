import './Actions.scss';

import { useEffect } from 'react';
import goldPerTurnImg from '../../../images/icon-gold-per-turn.png';
import { useDispatch, useSelector } from 'react-redux';
import ArmySpending from './ArmySpending.jsx';
import {
  setSelectedTab,
  setArmySpendingIndex,
} from '../../../store/slices/gameSlice.js';

const TopPanel = ({ hasAvailableUpgrade, ownedProperties }) => {
  const dispatch = useDispatch();
  const gameConfig = useSelector((state) => state.config.game);
  const propertiesConfig = useSelector((state) => state.config.properties);
  const { armySpendingIndex } = useSelector((state) => state.game);
  const { room } = useSelector((state) => state.room);
  const { user } = useSelector((state) => state.auth);

  const currentMember = room?.members?.find(
    (m) => m.username === user?.username,
  );

  const totalGpt = propertiesConfig
    ? Object.values(ownedProperties)
        .filter((p) => p.member?.username === user?.username)
        .reduce((sum, prop) => {
          const config = propertiesConfig[prop.position];
          if (!config) return sum;
          for (const level of prop.upgrades) {
            sum += config.upgrades[level]?.gpt || 0;
          }
          return sum;
        }, 0)
    : 0;

  const isSpendingDisabled = (spending) => {
    if (!currentMember) return false;
    return (
      currentMember.gold < -spending.gold ||
      currentMember.strength < -spending.strength
    );
  };

  useEffect(() => {
    if (
      gameConfig?.armySpending &&
      isSpendingDisabled(gameConfig.armySpending[armySpendingIndex])
    ) {
      dispatch(setArmySpendingIndex(0));
    }
  }, [currentMember?.gold, currentMember?.strength]);

  const displayArmySpending = () => {
    return gameConfig.armySpending.map((spending, index) => (
      <ArmySpending
        key={index}
        gold={spending.gold}
        strength={spending.strength}
        isSelected={index === armySpendingIndex}
        isDisabled={isSpendingDisabled(spending)}
        onClick={() => {
          if (!isSpendingDisabled(spending)) {
            dispatch(setArmySpendingIndex(index));
          }
        }}
      />
    ));
  };

  return (
    <div className="static-choises">
      <div className="flex-between top-flex">
        <div className="value">
          <h2>Gold per turn:</h2>
          <div className="player-stat-gold gold-per-turn width-full pointer no-select">
            <img src={goldPerTurnImg} className="recourse-img" alt="gold" />+
            {totalGpt}
          </div>
        </div>
        <button className="satings-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="satings-btn-svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
      </div>

      <h2 className="military-economic-h2">Army spending:</h2>
      <ul className="military-economic">{displayArmySpending()}</ul>

      <div className="flex-between management-btns">
        <button
          className={`management-btn ${hasAvailableUpgrade ? 'available-upgrade' : ''}`}
          onClick={() => dispatch(setSelectedTab('MANAGEMENT'))}
        >
          Empire
        </button>
        <button className="management-btn">Wins</button>
      </div>
    </div>
  );
};

export default TopPanel;
