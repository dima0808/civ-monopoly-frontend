import './Wins.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { LEADERS } from '../../../../constants/game.js';
import victoryArmyImg from '../../../../images/icon-victory-army.png';
import victoryCultureImg from '../../../../images/icon-victory-culture.png';
import victoryScienceImg from '../../../../images/icon-victory-science.png';
import victoryScoreImg from '../../../../images/icon-victory-score.png';
import houseImg from '../../../../images/icon-house.png';
import strengthImg from '../../../../images/icon-strength.png';
import centerImg from '../../../../images/icon-city-center.png';
import tourismImg from '../../../../images/icon-tourism.png';
import leaderImg from '../../../../images/leader_random.png';

// Total properties on the board required for a military victory.
const MILITARY_TARGET = 30;

// The launch milestones that count toward a science victory.
const SCIENCE_MILESTONES = ['SATELLITE', 'MOON', 'MARS', 'EXOPLANET'];
const SCIENCE_TARGET = SCIENCE_MILESTONES.length;

const Wins = ({ ownedProperties = {} }) => {
  const [selectedVictory, setSelectedVictory] = useState('Military');
  const { room } = useSelector((state) => state.room);
  const gameConfig = useSelector((state) => state.config.game);

  const members = room?.members ?? [];

  const countProperties = (username) =>
    Object.values(ownedProperties).filter(
      (p) => p.member?.username === username,
    ).length;

  // Culture target: twice the most influential other empire's tourism, plus a
  // configured flat bonus.
  const tourismThreshold = (member) => {
    const maxOther = members.reduce(
      (max, p) =>
        p.username !== member.username ? Math.max(max, p.tourism) : max,
      0,
    );
    return 2 * maxOther + (gameConfig?.tourismAdditionalThreshold ?? 0);
  };

  const scienceCompleted = (member) =>
    (member.finishedScienceProjects ?? []).filter((p) =>
      SCIENCE_MILESTONES.includes(p),
    ).length;

  const expeditionTarget = gameConfig?.science?.expeditionTurnAmount ?? 50;

  const renderPlayerHead = (civilization) => (
    <div className="win__player-img-div">
      <img
        src={civilization ? LEADERS[civilization].src : leaderImg}
        className="win__img"
        alt="avatar"
      />
    </div>
  );

  const renderVictoryTypeContent = () => {
    switch (selectedVictory) {
      case 'Military':
        return (
          <div className="win__victory-army">
            <h2 className="win__victory-h2">Military Victory</h2>
            <div className="victory-explain">
              <div className="win__victory-background">
                <div className="win__victory-background-color">
                  <img
                    src={victoryArmyImg}
                    className="win__img"
                    alt="victoryArmy"
                  />
                </div>
              </div>
              <p className="win__victory-p">
                A victory is achieved either by military expansion and a strong
                economy. You must controlling 70% of the map (30 cells) or by
                being the last remaining player. Become a true empire and strike
                fear into your enemies!
              </p>
            </div>
            <h3 className="win__victory-h2 win__victory-h3">Top players:</h3>
            <div className="win__players-list">
              {[...members]
                .sort(
                  (a, b) =>
                    countProperties(b.username) - countProperties(a.username),
                )
                .map((member) => (
                  <div
                    key={member.username}
                    className={`not-civ-color color-${member.color.toLowerCase()}-g`}
                  >
                    <div className="win__player">
                      {renderPlayerHead(member.civilization)}
                      <div className="win__name-and-stats">
                        <h2 className="win__stats-nickname">
                          {member.username}
                        </h2>
                        <div className="win-stats">
                          <div className="player-stat-house width-full half-height no-select">
                            <img
                              src={houseImg}
                              className="recourse-img"
                              alt="house"
                            />
                            {countProperties(member.username)}/{MILITARY_TARGET}
                          </div>
                          <div className="player-stat-strength half-height no-select">
                            <img
                              src={strengthImg}
                              className="recourse-img strength-recourse-img"
                              alt="strength"
                            />
                            {member.strength}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );
      case 'Culture':
        return (
          <div className="win__victory-culture">
            <h2 className="win__victory-h2">Culture Victory</h2>
            <div className="victory-explain">
              <div className="win__victory-background">
                <div className="win__victory-background-color">
                  <img
                    src={victoryCultureImg}
                    className="win__img"
                    alt="victoryCulture"
                  />
                </div>
              </div>
              <p className="win__victory-p">
                A victory is achieved through tourism and cultural activities is
                significant. You need to have more tourism and be twice the size
                of the most influential tourism empire, plus 800 units. Success
                comes from culture, experiences, and unique offerings, not from
                competition.
              </p>
            </div>
            <h3 className="win__victory-h2 win__victory-h3">Top players:</h3>
            <div className="win__players-list">
              {[...members]
                .sort((a, b) => b.tourism - a.tourism)
                .map((member) => (
                  <div
                    key={member.username}
                    className={`not-civ-color color-${member.color.toLowerCase()}-g`}
                  >
                    <div className="win__player">
                      {renderPlayerHead(member.civilization)}
                      <div className="win__name-and-stats">
                        <h2 className="win__stats-nickname">
                          {member.username}
                        </h2>
                        <div className="win-stats">
                          <div className="player-stat-tourism width-full half-height no-select">
                            <img
                              src={tourismImg}
                              className="recourse-img"
                              alt="tourism"
                            />
                            {member.tourism}/{tourismThreshold(member)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );
      case 'Science':
        return (
          <div className="win__victory-science">
            <h2 className="win__victory-h2">Science Victory</h2>
            <div className="victory-explain">
              <div className="win__victory-background">
                <div className="win__victory-background-color">
                  <img
                    src={victoryScienceImg}
                    className="win__img"
                    alt="victoryScience"
                  />
                </div>
              </div>
              <p className="win__victory-p">
                To win, you need to have a spaceport or a laboratory to complete
                scientific projects. These facilities accelerate your scientific
                victory, and you are also given the option to complete a project
                for money every few turns. The waiting time can be shortened
                using a laboratory, spaceport, or Science Department. After
                completing four scientific projects (Exoplanet Expedition), a
                countdown to victory begins, which can also be sped up with the
                Terrestrial Laser Station project. The final goal will be to
                build a base on the Mars.
              </p>
            </div>
            <h3 className="win__victory-h2 win__victory-h3">Top players:</h3>
            <div className="win__players-list">
              {[...members]
                .sort((a, b) => {
                  const diff = scienceCompleted(b) - scienceCompleted(a);
                  if (diff !== 0) return diff;
                  const aTurns =
                    a.expeditionTurns < 0 ? Infinity : a.expeditionTurns;
                  const bTurns =
                    b.expeditionTurns < 0 ? Infinity : b.expeditionTurns;
                  return aTurns - bTurns;
                })
                .map((member) => (
                  <div
                    key={member.username}
                    className={`not-civ-color color-${member.color.toLowerCase()}-g`}
                  >
                    <div className="win__player">
                      {renderPlayerHead(member.civilization)}
                      <div className="win__name-and-stats">
                        <h2 className="win__stats-nickname">
                          {member.username}
                        </h2>
                        <div className="win-stats">
                          <div className="win__value">
                            <p>Projects completed:</p>
                            <div className="player-stat-science width-full half-height no-select">
                              {scienceCompleted(member)}/{SCIENCE_TARGET}
                            </div>
                          </div>
                          <div className="win__value">
                            <p>Turns to expedition:</p>
                            <div className="player-stat-science width-full half-height no-select">
                              {member.expeditionTurns < 0
                                ? '—'
                                : member.expeditionTurns}
                              /{expeditionTarget}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );
      case 'Score':
        return (
          <div className="win__victory-score">
            <h2 className="win__victory-h2">Score Victory</h2>
            <div className="victory-explain">
              <div className="win__victory-background">
                <div className="win__victory-background-color">
                  <img
                    src={victoryScoreImg}
                    className="win__img"
                    alt="victoryScore"
                  />
                </div>
              </div>
              <p className="win__victory-p">
                It's not really about victory; it's about determining the
                position of the leaders. Players earn points from everything
                they do. Accumulate points to show who has the best empire and
                achieve top rankings by the end of the game!
              </p>
            </div>
            <h3 className="win__victory-h2 win__victory-h3">Top players:</h3>
            <div className="win__players-list">
              {[...members]
                .sort((a, b) => b.score - a.score)
                .map((member) => (
                  <div
                    key={member.username}
                    className={`not-civ-color color-${member.color.toLowerCase()}-g`}
                  >
                    <div className="win__player">
                      {renderPlayerHead(member.civilization)}
                      <div className="win__name-and-stats">
                        <h2 className="win__stats-nickname">
                          {member.username}
                        </h2>
                        <div className="win-stats">
                          <div className="player-stat-score width-full half-height no-select">
                            <img
                              src={centerImg}
                              className="recourse-img"
                              alt="score"
                            />
                            {member.score}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="win scroll">
      <div className="win__div">
        <div
          className={`win__choose${selectedVictory === 'Military' ? ' win__chosen' : ''}`}
          onClick={() => setSelectedVictory('Military')}
        >
          <img src={victoryArmyImg} className="win__img" alt="victoryArmy" />
        </div>
        <div
          className={`win__choose${selectedVictory === 'Culture' ? ' win__chosen' : ''}`}
          onClick={() => setSelectedVictory('Culture')}
        >
          <img
            src={victoryCultureImg}
            className="win__img"
            alt="victoryCulture"
          />
        </div>
        <div
          className={`win__choose${selectedVictory === 'Science' ? ' win__chosen' : ''}`}
          onClick={() => setSelectedVictory('Science')}
        >
          <img
            src={victoryScienceImg}
            className="win__img"
            alt="victoryScience"
          />
        </div>
        <div
          className={`win__choose${selectedVictory === 'Score' ? ' win__chosen' : ''}`}
          onClick={() => setSelectedVictory('Score')}
        >
          <img src={victoryScoreImg} className="win__img" alt="victoryScore" />
        </div>
      </div>
      <div className="win__victory">{renderVictoryTypeContent()}</div>
    </div>
  );
};

export default Wins;
