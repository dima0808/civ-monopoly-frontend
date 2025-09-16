import './Events.scss';
import { useDispatch, useSelector } from 'react-redux';
import { endTurn, rollDice } from '../../../../http/requests/game.js';
import { pushNotification } from '../../../../store/slices/notificationSlice.js';
import { NOTIFICATION_ERROR } from '../../../../constants/notification.js';

const Events = () => {
  const dispatch = useDispatch();
  const { room } = useSelector((state) => state.room);
  const { user } = useSelector((state) => state.auth);

  const isUserTurn =
    room.members.at(room.turnIndex)?.username === user?.username;

  const onEndTurn = () => {
    endTurn()
      .then()
      .catch((e) => {
        dispatch(
          pushNotification({ type: NOTIFICATION_ERROR, error: e.message }),
        );
      });
  };

  const onRollDice = () => {
    rollDice()
      .then()
      .catch((e) => {
        dispatch(
          pushNotification({ type: NOTIFICATION_ERROR, error: e.message }),
        );
      });
  };

  return (
    <div>
      <div className="events-hole scrollable-div">{/* SOME EVENTS */}</div>

      {room.isStarted && isUserTurn && (
        <div className="div-btn-turn-and-roll ">
          {room.isDiceRolled ? (
            <button onClick={onEndTurn} className="btn-turn-and-roll">
              End Turn
            </button>
          ) : (
            <button onClick={onRollDice} className="btn-turn-and-roll">
              Roll Dice
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;
