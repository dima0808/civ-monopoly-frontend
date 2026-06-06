import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getAllCivilizations } from '../../../http/requests/game.js';
import LeaderOption from './LeaderOption.jsx';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { DisplayError, DisplayLoading } from '../../../utils/component.jsx';
import { useTranslation } from 'react-i18next';

const MemberChooseLeader = ({ member }) => {
  const { t } = useTranslation();
  const { room } = useSelector((state) => state.room);

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
      <h1 className="member-setup--h1">
        {t('game.leaderChoose.chooseLeader')}
      </h1>
      <div className="member-setup--list">
        <Scrollbars className="member-setup--scroll">
          {civilizations == null && !error && <DisplayLoading />}
          {error && <DisplayError error={error} />}

          {civilizations && displayCivilizations()}
        </Scrollbars>
      </div>
    </div>
  );
};

export default MemberChooseLeader;
