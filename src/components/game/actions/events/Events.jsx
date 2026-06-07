import './Events.scss';
import { useDispatch, useSelector } from 'react-redux';
import { endTurn, rollDice } from '../../../../http/requests/game.js';
import { buyProperty, payRent } from '../../../../http/requests/property.js';
import { skipEvent } from '../../../../http/requests/event.js';
import {
  chooseProject,
  doScienceProject,
  doConcert,
} from '../../../../http/requests/project.js';
import { pushNotification } from '../../../../store/slices/notificationSlice.js';
import { NOTIFICATION_ERROR } from '../../../../constants/notification.js';
import BuyProperty from './BuyProperty.jsx';
import ForeignProperty from './ForeignProperty.jsx';
import Projects from './Projects.jsx';
import ScienceProjects from './ScienceProjects.jsx';
import GiveConcert from './GiveConcert.jsx';

const Events = ({ events, propertyRequirements, ownedProperties }) => {
  const dispatch = useDispatch();
  const { room } = useSelector((state) => state.room);
  const { user } = useSelector((state) => state.auth);
  const propertiesConfig = useSelector((state) => state.config.properties);
  const gameConfig = useSelector((state) => state.config.game);
  const { armySpendingIndex } = useSelector((state) => state.game);

  const isUserTurn =
    room.members.at(room.turnIndex)?.username === user?.username;

  const currentMember = room.members.find((m) => m.username === user?.username);

  const onEndTurn = () => {
    endTurn(armySpendingIndex)
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

  const onChooseProject = (projectType) => {
    chooseProject(projectType).catch((e) => {
      dispatch(
        pushNotification({ type: NOTIFICATION_ERROR, error: e.message }),
      );
    });
  };

  const onScienceProject = () => {
    doScienceProject().catch((e) => {
      dispatch(
        pushNotification({ type: NOTIFICATION_ERROR, error: e.message }),
      );
    });
  };

  const onConcert = () => {
    doConcert().catch((e) => {
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
              requirements={propertyRequirements[position]}
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
              ownedProperty={ownedProperties[position]}
              roll={event.ext?.roll || 0}
              member={currentMember}
              onPay={onPayRent}
            />
          );
        case 'PROJECTS_EDGE':
          if (!gameConfig) return null;
          return (
            <Projects
              key={event.reference}
              ownedProperties={ownedProperties}
              member={currentMember}
              gameConfig={gameConfig}
              onChoose={onChooseProject}
            />
          );
        case 'PROJECTS_SCIENCE':
          if (!gameConfig) return null;
          return (
            <ScienceProjects
              key={event.reference}
              member={currentMember}
              price={gameConfig.science.cost}
              onConfirm={onScienceProject}
              onSkip={() => onSkipEvent('PROJECTS_SCIENCE')}
            />
          );
        case 'PROJECTS_CULTURE':
          if (!gameConfig) return null;
          return (
            <GiveConcert
              key={event.reference}
              member={currentMember}
              price={gameConfig.concert.cost}
              lowerBound={gameConfig.concert.tourismLowerBound}
              upperBound={gameConfig.concert.tourismUpperBound}
              onConfirm={onConcert}
              onSkip={() => onSkipEvent('PROJECTS_CULTURE')}
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
