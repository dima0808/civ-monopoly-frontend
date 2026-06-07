import goldImg from '../../../../images/icon-gold.png';
import satelliteImg from '../../../../images/icon_project_launch_earth_satellite.png';
import moonImg from '../../../../images/icon_project_launch_moon_landing.png';
import marsImg from '../../../../images/icon_project_launch_mars_base.png';
import exoplanetImg from '../../../../images/icon_project_exoplanet_expedition.png';
import laserImg from '../../../../images/icon_project_terrestrial_laser_station.png';

const STEPS = {
  SATELLITE: {
    title: 'Launch Earth Satellite',
    img: satelliteImg,
    desc: 'Launch the earth satellite from a research lab (campus lvl4) or spaceport.',
  },
  MOON: {
    title: 'Launch Moon Landing',
    img: moonImg,
    desc: 'Land on the moon from a research lab (campus lvl4) or spaceport.',
  },
  MARS: {
    title: 'Launch Mars Colony',
    img: marsImg,
    desc: 'Establish a Mars colony from a research lab (campus lvl4) or spaceport.',
  },
  EXOPLANET: {
    title: 'Exoplanet Expedition',
    img: exoplanetImg,
    desc: 'Begin the exoplanet expedition from a research lab (campus lvl4) or spaceport.',
  },
  LASER: {
    title: 'Terrestrial Laser Station',
    img: laserImg,
    desc: 'Speed up the exoplanet expedition by one light year.',
  },
};

const getNextStep = (finished) => {
  if (!finished.includes('SATELLITE')) return STEPS.SATELLITE;
  if (!finished.includes('MOON')) return STEPS.MOON;
  if (!finished.includes('MARS')) return STEPS.MARS;
  if (!finished.includes('EXOPLANET')) return STEPS.EXOPLANET;
  return STEPS.LASER;
};

const ScienceProjects = ({ member, price, onConfirm, onSkip }) => {
  const step = getNextStep(member.finishedScienceProjects ?? []);

  return (
    <div className="event-card project-card">
      <div className="event-card-header">{step.title}</div>
      <div className="event-card-body">
        <div className="event-card-grid">
          <div className="event-card-img-div">
            <img src={step.img} className="event-card-img" alt={step.title} />
          </div>
          <div className="event-card-stats">
            <p className="project-desc">{step.desc}</p>
          </div>
        </div>
        <div className="event-card-buttons">
          <button
            disabled={member.gold < price}
            onClick={onConfirm}
            className="event-btn event-btn-buy"
          >
            buy:
            <img src={goldImg} className="event-stat-icon" alt="gold" />
            {price}
          </button>
          <button onClick={onSkip} className="event-btn event-btn-skip">
            skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScienceProjects;
