import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CELL_IMAGES } from '../../../../constants/game.js';
import bermudaImg from '../../../../images/corner_bermuda_triangle.png';
import {
  setSelectedTab,
  setManagementTab,
  setSelectedProperty,
} from '../../../../store/slices/gameSlice.js';

const LEVEL_ORDER = [
  'LEVEL_1',
  'LEVEL_2',
  'LEVEL_3',
  'LEVEL_4',
  'LEVEL_4_1',
  'LEVEL_4_2',
  'LEVEL_4_3',
];

const Teleport = ({
  options,
  propertiesConfig,
  ownedProperties,
  onTeleport,
}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);

  const handleSelect = (position) => {
    setSelected(position);
  };

  const handleInfo = (e, position) => {
    e.stopPropagation();
    dispatch(setSelectedProperty(position));
    dispatch(setManagementTab('PROPERTY'));
    dispatch(setSelectedTab('MANAGEMENT'));
  };

  return (
    <div
      className="teleport-card"
      style={{ backgroundImage: `url(${bermudaImg})` }}
    >
      <h2 className="project-title teleport-title">Teleport</h2>
      <p className="teleport-subtitle">Choose position to teleport</p>
      <div className="teleport-options">
        {options.map((position) => {
          const config = propertiesConfig[position];
          if (!config) return null;
          const ownedProperty = ownedProperties[position];
          const ownerColor = ownedProperty?.member?.color;
          const ownedUpgrades = ownedProperty?.upgrades || [];
          const highestLevel =
            LEVEL_ORDER.filter((l) => ownedUpgrades.includes(l)).at(-1) ||
            'LEVEL_1';
          const image = CELL_IMAGES[config.name]?.[highestLevel];
          const colorClass = ownerColor
            ? `color-${ownerColor.toLowerCase()}-g`
            : '';
          const isSelected = selected === position;

          return (
            <div
              key={position}
              onClick={() => handleSelect(position)}
              className={`teleport-icon ${colorClass} ${isSelected ? 'teleport-icon-selected' : ''}`}
            >
              <button
                className="teleport-info-btn"
                onClick={(e) => handleInfo(e, position)}
              >
                i
              </button>
              {image && (
                <img src={image} className="teleport-img" alt={config.name} />
              )}
            </div>
          );
        })}
      </div>
      <div className="event-card-buttons">
        <button
          disabled={selected == null}
          onClick={() => onTeleport(selected)}
          className="event-btn event-btn-buy"
        >
          accept
        </button>
      </div>
    </div>
  );
};

export default Teleport;
