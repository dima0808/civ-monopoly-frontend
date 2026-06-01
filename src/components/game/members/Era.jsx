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

  if (!gameConfig) return null;

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
  let rangeStart = 0;
  let rangeEnd = eras.length > 0 ? eras[0][1] - 1 : 0;

  for (let i = 0; i < eras.length; i++) {
    const [era, startTurn] = eras[i];
    if (turn < startTurn) break;
    currentEra = era;
    rangeStart = startTurn;
    rangeEnd = i < eras.length - 1 ? eras[i + 1][1] - 1 : startTurn;
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
          {rangeStart === rangeEnd
            ? `${rangeStart}+`
            : `${rangeStart}-${rangeEnd}`}
        </p>
      </div>
    </div>
  );
};

export default Era;
