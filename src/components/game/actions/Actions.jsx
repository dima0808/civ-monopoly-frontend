import './Actions.scss';

import TopPanel from './TopPanel.jsx';
import { useDispatch, useSelector } from 'react-redux';
import Events from './events/Events.jsx';
import { setSelectedTab } from '../../../store/slices/gameSlice.js';

const Actions = () => {
  const dispatch = useDispatch();
  const { selectedTab } = useSelector((state) => state.game);

  return (
    <section className="actions">
      {/* <SettingsDialog /> */}
      {/*<GamePauseDialog />*/}
      {/*<GameWinnerDialog />*/}

      <TopPanel />

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
            {selectedTab === 'EVENTS' ? <Events /> : <div></div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Actions;
