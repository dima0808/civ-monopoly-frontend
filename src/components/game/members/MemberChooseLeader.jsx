import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllCivilizations } from '../../../http/requests/game.js';
import LeaderOption from './LeaderOption.jsx';
import { Scrollbars } from 'react-custom-scrollbars';
import { displayError, displayLoading } from '../../../utils/component.jsx';

const MemberChooseLeader = ({ member }) => {
  const { room } = useSelector((state) => state.game);

  const [civilizations, setCivilizations] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllCivilizations()
      .then((data) => setCivilizations(data.civilizations))
      .catch((e) => setError(e.message));
  }, []);

  const displayCivilizations = () => {
    return civilizations.map((civ, index) => (
      <LeaderOption
        key={index}
        isChosen={member.civilization === civ}
        isTaken={room.members.some((m) => m.civilization === civ)}
        civilization={civ}
      />
    ));
  };

  return (
    <div className="member-setup--leader-div">
      <h1 className="member-setup--h1">Choose your leader</h1>

      <div className="member-setup--list">
        <Scrollbars className="member-setup--scroll">
          {civilizations == null && !error && displayLoading()}
          {error && displayError(error)}

          {civilizations && displayCivilizations()}
        </Scrollbars>
      </div>
    </div>
  );
};

export default MemberChooseLeader;
