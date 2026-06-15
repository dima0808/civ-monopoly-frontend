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
import satelliteImg from '../../../../images/icon_project_launch_earth_satellite.png';
import moonImg from '../../../../images/icon_project_launch_moon_landing.png';
import marsImg from '../../../../images/icon_project_launch_mars_base.png';
import exoplanetImg from '../../../../images/icon_project_exoplanet_expedition.png';
import laserImg from '../../../../images/icon_project_terrestrial_laser_station.png';

const DISTRICT_LEVELS = ['LEVEL_1', 'LEVEL_2', 'LEVEL_3', 'LEVEL_4'];

const SPACEPORT_POSITION = 47;
const CAMPUS_POSITIONS = [15, 45];

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

// The next space launch becomes selectable on the corner once a player can space,
// letting them advance science without waiting for the timed science event.
const SCIENCE_LAUNCHES = [
  {
    type: 'LAUNCH_EARTH_SATELLITE',
    title: 'Launch Earth Satellite',
    img: satelliteImg,
    gate: 'SATELLITE',
    desc: 'Launch the earth satellite.',
  },
  {
    type: 'LAUNCH_MOON_LANDING',
    title: 'Launch Moon Landing',
    img: moonImg,
    requires: 'SATELLITE',
    gate: 'MOON',
    desc: 'Land on the moon.',
  },
  {
    type: 'LAUNCH_MARS_COLONY',
    title: 'Launch Mars Colony',
    img: marsImg,
    requires: 'MOON',
    gate: 'MARS',
    desc: 'Establish a Mars colony.',
  },
  {
    type: 'EXOPLANET_EXPEDITION',
    title: 'Exoplanet Expedition',
    img: exoplanetImg,
    requires: 'MARS',
    gate: 'EXOPLANET',
    desc: 'Begin the exoplanet expedition.',
  },
  {
    type: 'TERRESTRIAL_LASER_STATION',
    title: 'Terrestrial Laser Station',
    img: laserImg,
    requires: 'EXOPLANET',
    gate: 'LASER',
    desc: 'Speed up the exoplanet expedition.',
  },
];

const getNextLaunch = (finished) => {
  for (const launch of SCIENCE_LAUNCHES) {
    if (finished.includes(launch.gate)) continue;
    if (launch.requires && !finished.includes(launch.requires)) return null;
    return launch;
  }
  return null;
};

const Projects = ({
  ownedProperties,
  member,
  gameConfig,
  currentTurn,
  onChoose,
  onSkip,
}) => {
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

  const isModernEra = currentTurn >= (gameConfig.eras?.MODERN ?? Infinity);

  const availableDistricts = PROJECTS.filter((project) => {
    if (!project.positions.some(ownsPosition)) return false;
    if (
      project.scienceGate &&
      member.finishedScienceProjects?.includes(project.scienceGate)
    ) {
      return false;
    }
    return true;
  });

  const finished = member.finishedScienceProjects ?? [];
  const ableToSpace =
    ownsPosition(SPACEPORT_POSITION) ||
    districtLevelIndex(CAMPUS_POSITIONS) >= DISTRICT_LEVELS.indexOf('LEVEL_4');
  const nextLaunch =
    ableToSpace && finished.includes('CAMPUS') ? getNextLaunch(finished) : null;

  const renderDistrictEffect = (project) => {
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

  const options = [
    ...availableDistricts.map((project) => {
      const eraLocked =
        project.type === 'CAMPUS_RESEARCH_GRANTS' && !isModernEra;
      return {
        type: project.type,
        title: project.title,
        img: project.img,
        disabled: eraLocked,
        content: eraLocked ? (
          <p className="project-desc project-desc-locked">
            Available after Modern era (turn {gameConfig.eras?.MODERN})
          </p>
        ) : (
          renderDistrictEffect(project)
        ),
      };
    }),
    ...(nextLaunch
      ? [
          {
            type: nextLaunch.type,
            title: nextLaunch.title,
            img: nextLaunch.img,
            content: <p className="project-desc">{nextLaunch.desc}</p>,
          },
        ]
      : []),
  ];

  const selectableOptions = options.filter((o) => !o.disabled);
  const effectiveSelected =
    selected && selectableOptions.some((o) => o.type === selected)
      ? selected
      : (selectableOptions[0]?.type ?? null);

  return (
    <div className="projects-choose">
      <h2 className="project-title">Choose your project</h2>
      {options.map((option) => (
        <div
          key={option.type}
          onClick={() => !option.disabled && setSelected(option.type)}
          className={`event-card project-card ${effectiveSelected === option.type ? 'project-card-selected' : ''} ${option.disabled ? 'project-card-disabled' : ''}`}
        >
          <div className="event-card-header">{option.title}</div>
          <div className="event-card-body">
            <div className="event-card-grid">
              <div className="event-card-img-div">
                <img
                  src={option.img}
                  className="event-card-img"
                  alt={option.title}
                />
              </div>
              <div className="event-card-stats">{option.content}</div>
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
        <button onClick={onSkip} className="event-btn event-btn-skip">
          skip
        </button>
      </div>
    </div>
  );
};

export default Projects;
