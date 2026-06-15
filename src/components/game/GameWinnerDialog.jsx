import './GameWinnerDialog.scss';

import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { LEADERS } from '../../constants/game.js';

import iconVictoryArmy from '../../images/icon-victory-army.png';
import iconVictoryCulture from '../../images/icon-victory-culture.png';
import iconVictoryScience from '../../images/icon-victory-science.png';
import iconVictoryScore from '../../images/icon-victory-score.png';

const VICTORY_CONFIG = {
  MILITARY: {
    icon: iconVictoryArmy,
    title: 'Military Victory',
    className: 'game-winner--military',
  },
  CULTURE: {
    icon: iconVictoryCulture,
    title: 'Culture Victory',
    className: 'game-winner--culture',
  },
  SCIENCE: {
    icon: iconVictoryScience,
    title: 'Science Victory',
    className: 'game-winner--science',
  },
  SCORE: {
    icon: iconVictoryScore,
    title: 'Score Victory',
    className: 'game-winner--score',
  },
};

const GameWinnerDialog = ({ winner, victoryType, members }) => {
  const navigate = useNavigate();

  const config = VICTORY_CONFIG[victoryType] || VICTORY_CONFIG.SCORE;
  const winnerMember = members?.find((m) => m.username === winner);
  const leader = winnerMember ? LEADERS[winnerMember.civilization] : null;

  return createPortal(
    <dialog open className="full-screen-div">
      <div className={`game-winner ${config.className}`}>
        <img
          src={config.icon}
          alt={config.title}
          className="game-winner__victory-icon"
          draggable="false"
        />
        <h2 className="game-winner__title">{config.title}</h2>
        {leader && (
          <img
            src={leader.src}
            alt={leader.name}
            className="game-winner__leader"
            draggable="false"
          />
        )}
        <p className="game-winner__username">{winner}</p>
        <button className="game-winner__btn" onClick={() => navigate('/')}>
          Back to Lobby
        </button>
      </div>
    </dialog>,
    document.getElementById('modal'),
  );
};

export default GameWinnerDialog;
