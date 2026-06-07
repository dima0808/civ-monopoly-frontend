import { useState } from 'react';
import goldImg from '../../../../images/icon-gold.png';
import goldPerTurnImg from '../../../../images/icon-gold-per-turn.png';
import tourismImg from '../../../../images/icon-tourism.png';
import strengthImg from '../../../../images/icon-strength.png';

import campusImg from '../../../../images/icon_project_enhance_district_campus.png';
import commercialImg from '../../../../images/icon_project_enhance_district_commercial_hub.png';
import encampmentImg from '../../../../images/icon_project_enhance_district_encampment.png';
import harborImg from '../../../../images/icon_project_enhance_district_harbor.png';
import theaterImg from '../../../../images/icon_project_enhance_district_theatre_square.png';

const DISTRICT_LEVELS = ['LEVEL_1', 'LEVEL_2', 'LEVEL_3', 'LEVEL_4'];

// Only the project types the backend currently accepts in /projects/choose are
// listed. BREAD_AND_CIRCUSES and INDUSTRIAL_ZONE_LOGISTICS are intentionally
// omitted until the backend supports them (it throws "not supported yet").
const PROJECTS = [
  {
    type: 'CAMPUS_RESEARCH_GRANTS',
    title: 'Campus Research Grants',
    img: campusImg,
    positions: [15, 45],
    scienceGate: 'CAMPUS',
  },
  {
    type: 'COMMERCIAL_HUB_INVESTMENT',
    title: 'Commercial Hub Investment',
    img: commercialImg,
    positions: [19, 43],
  },
  {
    type: 'ENCAMPMENT_TRAINING',
    title: 'Encampment Training',
    img: encampmentImg,
    positions: [7, 30],
  },
  {
    type: 'HARBOR_SHIPPING',
    title: 'Harbor Shipping',
    img: harborImg,
    positions: [17, 31],
  },
  {
    type: 'THEATER_SQUARE_PERFORMANCES',
    title: 'Theater Square Performances',
    img: theaterImg,
    positions: [21, 39],
  },
];

const Projects = ({ ownedProperties, member, gameConfig, onChoose }) => {
  const [selected, setSelected] = useState(null);

  const ownsPosition = (position) =>
    ownedProperties[position]?.member?.username === member.username;

  // Highest owned district level across both copies of a district, as an index
  // into DISTRICT_LEVELS (-1 when none owned).
  const districtLevelIndex = (positions) => {
    let best = -1;
    positions.forEach((position) => {
      if (!ownsPosition(position)) return;
      (ownedProperties[position].upgrades || []).forEach((level) => {
        const idx = DISTRICT_LEVELS.indexOf(level);
        if (idx > best) best = idx;
      });
    });
    return best;
  };

  const available = PROJECTS.filter((project) => {
    if (!project.positions.some(ownsPosition)) return false;
    if (
      project.scienceGate &&
      member.finishedScienceProjects?.includes(project.scienceGate)
    ) {
      return false;
    }
    return true;
  });

  const effectiveSelected =
    selected && available.some((p) => p.type === selected)
      ? selected
      : (available[0]?.type ?? null);

  const renderEffect = (project) => {
    const levelIndex = Math.max(districtLevelIndex(project.positions), 0);
    const level = DISTRICT_LEVELS[levelIndex];

    switch (project.type) {
      case 'HARBOR_SHIPPING':
        return (
          <p className="project-desc">
            Earns
            <span className="event-stat-value">
              <img src={goldImg} className="event-stat-icon" alt="gold" />
              {gameConfig.projectEffects.HARBOR_SHIPPING[level]}
            </span>
          </p>
        );
      case 'ENCAMPMENT_TRAINING':
        return (
          <p className="project-desc">
            Trains
            <span className="event-stat-value">
              <img
                src={strengthImg}
                className="event-stat-icon"
                alt="strength"
              />
              {gameConfig.projectEffects.ENCAMPMENT_TRAINING[level]}
            </span>
          </p>
        );
      case 'THEATER_SQUARE_PERFORMANCES':
        return (
          <p className="project-desc">
            Creates masterpieces for
            <span className="event-stat-value">
              <img src={tourismImg} className="event-stat-icon" alt="tourism" />
              {gameConfig.projectEffects.THEATER_SQUARE_PERFORMANCES[level]}
            </span>
          </p>
        );
      case 'COMMERCIAL_HUB_INVESTMENT':
        return (
          <p className="project-desc">
            Adds
            <span className="event-stat-value">
              <img src={goldPerTurnImg} className="event-stat-icon" alt="gpt" />
              {
                gameConfig.additionalGoldPerTurn[
                  `COMMERCIAL_HUB_INVESTMENT_${levelIndex + 1}`
                ]
              }
            </span>
            for 10 turns
          </p>
        );
      case 'CAMPUS_RESEARCH_GRANTS':
        return (
          <p className="project-desc">
            Grants research progress in your campus.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="projects-choose">
      <h2 className="project-title">Choose your project</h2>
      {available.map((project) => (
        <div
          key={project.type}
          onClick={() => setSelected(project.type)}
          className={`event-card project-card ${effectiveSelected === project.type ? 'project-card-selected' : ''}`}
        >
          <div className="event-card-header">{project.title}</div>
          <div className="event-card-body">
            <div className="event-card-grid">
              <div className="event-card-img-div">
                <img
                  src={project.img}
                  className="event-card-img"
                  alt={project.title}
                />
              </div>
              <div className="event-card-stats">{renderEffect(project)}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="event-card-buttons">
        <button
          disabled={!effectiveSelected}
          onClick={() => onChoose(effectiveSelected)}
          className="event-btn event-btn-buy"
        >
          accept
        </button>
      </div>
    </div>
  );
};

export default Projects;
