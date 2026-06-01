import './Actions.scss';

import TopPanel from './TopPanel.jsx';
import { useDispatch, useSelector } from 'react-redux';
import Events from './events/Events.jsx';
import Empire from './empire/Empire.jsx';
import { setSelectedTab } from '../../../store/slices/gameSlice.js';

const Actions = ({ events, ownedProperties, propertyRequirements }) => {
  const dispatch = useDispatch();
  const { selectedTab } = useSelector((state) => state.game);
  const { room } = useSelector((state) => state.room);
  const { user } = useSelector((state) => state.auth);
  const propertiesConfig = useSelector((state) => state.config.properties);

  const currentMember = room?.members?.find(
    (m) => m.username === user?.username,
  );
  const isUserTurn =
    room?.members?.at(room.turnIndex)?.username === user?.username;

  const hasAvailableUpgrade =
    isUserTurn &&
    currentMember &&
    propertiesConfig &&
    Object.values(ownedProperties).some((prop) => {
      if (prop.member?.username !== user?.username) return false;
      if (prop.mortgage !== -1) return false;
      const reqData = propertyRequirements[prop.position];
      if (!reqData?.requirements) return false;
      if (!Object.values(reqData.requirements).every(Boolean)) return false;
      const config = propertiesConfig[prop.position];
      if (!config) return false;
      const nextUpgrade = config.upgrades[reqData.nextUpgrade];
      return nextUpgrade && currentMember.gold >= nextUpgrade.price;
    });

  return (
    <section className="actions">
      {/* <SettingsDialog /> */}
      {/*<GamePauseDialog />*/}
      {/*<GameWinnerDialog />*/}

      <TopPanel
        hasAvailableUpgrade={hasAvailableUpgrade}
        ownedProperties={ownedProperties}
      />

      <div className="not-static-choises">
        <div className="not-static-choises-checkbox">
          <button
            onClick={() => dispatch(setSelectedTab('EVENTS'))}
            className={`not-static-btn ${selectedTab === 'EVENTS' ? 'selected-static-btn' : ''}`}
          >
            Events
          </button>
          <button
            onClick={() => dispatch(setSelectedTab('MANAGEMENT'))}
            className={`not-static-btn ${selectedTab === 'MANAGEMENT' ? 'selected-static-btn' : ''}`}
          >
            Management
          </button>
        </div>

        <div className="chousen-div">
          <div className="chousen-div-white">
            {selectedTab === 'EVENTS' ? (
              <Events
                events={events}
                propertyRequirements={propertyRequirements}
                ownedProperties={ownedProperties}
              />
            ) : (
              <Empire
                ownedProperties={ownedProperties}
                propertyRequirements={propertyRequirements}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Actions;
