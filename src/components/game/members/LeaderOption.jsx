import { LEADERS } from '../../../constants/game.js';
import { changeCivilization } from '../../../http/requests/game.js';
import { pushNotification } from '../../../store/slices/notificationSlice.js';
import { NOTIFICATION_ERROR } from '../../../constants/notification.js';
import { useDispatch } from 'react-redux';

const LeaderOption = ({ isChosen, isTaken, civilization }) => {
  const dispatch = useDispatch();

  const onChangeCivilization = () => {
    if (isChosen || isTaken) return;

    changeCivilization(civilization)
      .then()
      .catch((e) => {
        dispatch(
          pushNotification({ type: NOTIFICATION_ERROR, error: e.message }),
        );
      });
  };

  return (
    <div
      onClick={onChangeCivilization}
      className={`member-setup--list--item ${isChosen ? 'member-setup--list--item--selected' : ''} ${!isChosen && isTaken ? 'member-setup--list--item--disabled' : ''}`}
    >
      <img
        src={LEADERS[civilization].src}
        className="member-setup--list--item--img"
        alt="leader"
      />
      <div className="member-setup--list--item--div">
        <h3 className="member-setup--list--h3">{LEADERS[civilization].name}</h3>
        <p className="member-setup--list--p">
          Leader of {LEADERS[civilization].civilization}
        </p>
      </div>
    </div>
  );
};
export default LeaderOption;
