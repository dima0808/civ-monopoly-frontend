import './MemberList.scss';

import ancientEraImg from '../../../images/back-ancient-era.jpg';
import classicalEraImg from '../../../images/back-classical-era.png';
import medievalEraImg from '../../../images/back-medieval-era.png';
import renaissanceEraImg from '../../../images/back-renaissance-era.png';
import industrialEraImg from '../../../images/back-industrial-era.png';
import modernEraImg from '../../../images/back-modern-era.png';
import atomicEraImg from '../../../images/back-atomic-era.png';
import informationEraImg from '../../../images/back-information-era.png';
import { useSelector } from 'react-redux';

const Era = ({ turn }) => {
  const gameConfig = useSelector((state) => state.config.game);

  const eraImages = {
    ANCIENT: ancientEraImg,
    CLASSICAL: classicalEraImg,
    MEDIEVAL: medievalEraImg,
    RENAISSANCE: renaissanceEraImg,
    INDUSTRIAL: industrialEraImg,
    MODERN: modernEraImg,
    ATOMIC: atomicEraImg,
    INFORMATION: informationEraImg,
  };

  const eras = Object.entries(gameConfig.eras);
  let currentEra = 'ANCIENT';
  let previousMax = 1;
  let maxTurn = 0;

  for (const [era, max] of eras) {
    previousMax = maxTurn;
    maxTurn = max;
    currentEra = era;
    if (turn <= max) {
      break;
    }
  }

  return (
    <div className="turn">
      <img
        src={eraImages[currentEra]}
        className="age-img"
        alt={`${currentEra.toLowerCase()} era`}
      />
      <div className="turn-div epoch-div">
        <p>
          {currentEra.at(0) + currentEra.slice(1).toLowerCase()} era:{' '}
          {previousMax + 1}-{maxTurn}
        </p>
      </div>
    </div>
  );
};

export default Era;
