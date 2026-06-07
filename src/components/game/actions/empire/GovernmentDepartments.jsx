import { useState } from 'react';
import goldImg from '../../../../images/icon-gold.png';
import goldPerTurnImg from '../../../../images/icon-gold-per-turn.png';
import tourismImg from '../../../../images/icon-tourism.png';
import { REQUIREMENT_DESCRIPTIONS } from '../../../../constants/game.js';
import scienceDepartmentImg from '../../../../images/building_government_build3-1_icon_gov_science.png';
import warDepartmentImg from '../../../../images/building_government_build3-3_icon_gov_military.png';
import cultureDepartmentImg from '../../../../images/building_government_build3-2_icon_gov_culture.png';

const DEPARTMENTS = [
  { level: 'LEVEL_4_1', label: 'Science', icon: scienceDepartmentImg },
  { level: 'LEVEL_4_2', label: 'War', icon: warDepartmentImg },
  { level: 'LEVEL_4_3', label: 'Culture', icon: cultureDepartmentImg },
];

const isComplete = (requirements) =>
  !requirements || Object.values(requirements).every(Boolean);

const GovernmentDepartments = ({
  config,
  property,
  reqData,
  currentMember,
  isUserTurn,
  onUpgrade,
  onDemote,
}) => {
  const [selected, setSelected] = useState('LEVEL_4_1');

  const ownedDepartment = DEPARTMENTS.find((d) =>
    property.upgrades.includes(d.level),
  );
  const branchRequirements = reqData?.branchRequirements ?? {};

  const activeLevel = ownedDepartment ? ownedDepartment.level : selected;
  const department = DEPARTMENTS.find((d) => d.level === activeLevel);
  const upgrade = config.upgrades[activeLevel];
  const activeRequirements = ownedDepartment
    ? null
    : branchRequirements[activeLevel];
  const canBuild =
    !ownedDepartment &&
    isComplete(activeRequirements) &&
    property.mortgage === -1;

  return (
    <div className="gov-departments">
      {!ownedDepartment && (
        <>
          <h3 className="gov-departments-title">Choose your building</h3>
          <div className="gov-departments-icons">
            {DEPARTMENTS.map((d) => {
              const complete =
                isComplete(branchRequirements[d.level]) &&
                property.mortgage === -1;
              return (
                <div
                  key={d.level}
                  onClick={() => setSelected(d.level)}
                  className={`gov-dept-icon ${selected === d.level ? 'gov-dept-icon-selected' : ''} ${complete ? 'gov-dept-icon-complete' : ''}`}
                >
                  <img
                    src={d.icon}
                    className="gov-dept-icon-img"
                    alt={d.label}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}

      <div
        className={`empire-level ${ownedDepartment ? 'empire-level-owned' : canBuild ? 'empire-level-next' : ''}`}
      >
        <h3 className="empire-level-h3">{upgrade.name}</h3>
        <div className="empire-level-grid">
          <div className="empire-level-img-div">
            <img
              src={department.icon}
              className="empire-level-img"
              alt={upgrade.name}
            />
          </div>
          <div className="empire-level-requirements">
            {upgrade.requirements?.map((req) => (
              <p
                key={req}
                className={`empire-level-req-text ${!ownedDepartment && activeRequirements?.[req] === false ? 'empire-level-req-unmet' : ''}`}
              >
                {REQUIREMENT_DESCRIPTIONS[req] || req}
              </p>
            ))}
          </div>
          <div className="empire-level-stats">
            <div className="empire-stat-row">
              <span className="empire-stat-label">cost</span>
              <span className="empire-stat-value">
                <img src={goldImg} className="empire-stat-icon" alt="gold" />
                {upgrade.price}
              </span>
            </div>
            {upgrade.gos > 0 && (
              <div className="empire-stat-row">
                <span className="empire-stat-label">g.o.s</span>
                <span className="empire-stat-value">
                  <img src={goldImg} className="empire-stat-icon" alt="gos" />
                  {upgrade.gos}
                </span>
              </div>
            )}
            {upgrade.tourism > 0 && (
              <div className="empire-stat-row">
                <span className="empire-stat-label">t.o.s</span>
                <span className="empire-stat-value">
                  <img
                    src={tourismImg}
                    className="empire-stat-icon"
                    alt="tourism"
                  />
                  {upgrade.tourism}
                </span>
              </div>
            )}
            {upgrade.gpt > 0 && (
              <div className="empire-stat-row">
                <span className="empire-stat-label">g.p.t</span>
                <span className="empire-stat-value">
                  <img
                    src={goldPerTurnImg}
                    className="empire-stat-icon"
                    alt="gpt"
                  />
                  {upgrade.gpt}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="event-card-buttons">
        {!ownedDepartment && (
          <button
            disabled={
              !isUserTurn || !canBuild || currentMember.gold < upgrade.price
            }
            onClick={() => onUpgrade(property.position, activeLevel)}
            className="event-btn event-btn-buy"
          >
            upgrade:
            <img src={goldImg} className="event-stat-icon" alt="gold" />
            {upgrade.price}
          </button>
        )}
        {property.mortgage === -1 && (
          <button
            disabled={!isUserTurn}
            onClick={() => onDemote(property.position)}
            className="event-btn event-btn-skip"
          >
            demote
          </button>
        )}
      </div>
    </div>
  );
};

export default GovernmentDepartments;
