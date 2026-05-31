import './Events.scss';
import { useDispatch, useSelector } from 'react-redux';
import { endTurn, rollDice } from '../../../../http/requests/game.js';
import { buyProperty, payRent } from '../../../../http/requests/property.js';
import { skipEvent } from '../../../../http/requests/event.js';
import { pushNotification } from '../../../../store/slices/notificationSlice.js';
import { NOTIFICATION_ERROR } from '../../../../constants/notification.js';
import BuyProperty from './BuyProperty.jsx';
import ForeignProperty from './ForeignProperty.jsx';

const Events = ({ events }) => {
  const dispatch = useDispatch();
  const { room } = useSelector((state) => state.room);
  const { user } = useSelector((state) => state.auth);
  const propertiesConfig = useSelector((state) => state.config.properties);

  const isUserTurn =
    room.members.at(room.turnIndex)?.username === user?.username;

  const currentMember = room.members.find((m) => m.username === user?.username);

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

  const onBuyProperty = () => {
    if (!currentMember) return;
    buyProperty(currentMember.position).catch((e) => {
      dispatch(
        pushNotification({ type: NOTIFICATION_ERROR, error: e.message }),
      );
    });
  };

  const onSkipEvent = (type) => {
    skipEvent(type).catch((e) => {
      dispatch(
        pushNotification({ type: NOTIFICATION_ERROR, error: e.message }),
      );
    });
  };

  const onPayRent = () => {
    if (!currentMember) return;
    payRent(currentMember.position).catch((e) => {
      dispatch(
        pushNotification({ type: NOTIFICATION_ERROR, error: e.message }),
      );
    });
  };

  const renderEvents = () => {
    if (!events || !propertiesConfig || !currentMember) return null;

    const position = currentMember.position;
    const propertyConfig = propertiesConfig[position];

    return events.map((event) => {
      switch (event.type) {
        case 'BUY_PROPERTY':
          if (!propertyConfig) return null;
          return (
            <BuyProperty
              key={event.reference}
              propertyConfig={propertyConfig}
              member={currentMember}
              onBuy={onBuyProperty}
              onSkip={() => onSkipEvent('BUY_PROPERTY')}
            />
          );
        case 'FOREIGN_PROPERTY':
          if (!propertyConfig) return null;
          return (
            <ForeignProperty
              key={event.reference}
              propertyConfig={propertyConfig}
              roll={event.ext?.roll || 0}
              member={currentMember}
              onPay={onPayRent}
            />
          );
        default:
          return null;
      }
    });
  };

  return (
    <div>
      <div className="events-hole scrollable-div">{renderEvents()}</div>

      {room.isStarted && isUserTurn && (
        <div className="div-btn-turn-and-roll ">
          {room.isDiceRolled ? (
            <button
              onClick={onEndTurn}
              disabled={events.length > 0}
              className="btn-turn-and-roll"
            >
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
