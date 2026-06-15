import './Game.scss';

import Board from '../../components/game/board/Board.jsx';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getGameConfig,
  getPropertiesConfig,
} from '../../store/slices/configSlice.js';
import { useParams } from 'react-router-dom';
import MemberList from '../../components/game/members/MemberList.jsx';
import {
  getRoom,
  setRoom,
  updateMembers,
} from '../../store/slices/roomSlice.js';
import { getStompClient } from '../../store/slices/wsSlice.js';
import Actions from '../../components/game/actions/Actions.jsx';
import GameWinnerDialog from '../../components/game/GameWinnerDialog.jsx';
import Dice from '../../components/game/board/dice/Dice.jsx';
import {
  getPropertiesByRoom,
  getPropertyRequirements,
} from '../../http/requests/property.js';
import { getMyEvents } from '../../http/requests/event.js';
import diceRollSound from '../../sounds/dice-rolling.mp3';
import Cookies from 'js-cookie';

const diceRollAudio = new Audio(diceRollSound);
diceRollAudio.volume = 0.05;

const Game = () => {
  const dispatch = useDispatch();
  const { reference } = useParams();
  const { room } = useSelector((state) => state.room);
  const { user } = useSelector((state) => state.auth);
  const wsConnected = useSelector((state) => state.ws.connected);
  const [dice, setDice] = useState({ firstRoll: null, secondRoll: null });
  const [events, setEvents] = useState([]);
  const [ownedProperties, setOwnedProperties] = useState({});
  const [propertyRequirements, setPropertyRequirements] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerPhase, setTimerPhase] = useState(null);

  const fetchRequirements = useCallback(() => {
    getPropertyRequirements()
      .then(setPropertyRequirements)
      .catch(() => {});
  }, []);

  const onGameMessageReceived = useCallback(
    (wsMessage) => {
      const message = JSON.parse(wsMessage.body);
      const { type } = message;
      switch (type) {
        case 'TIMER_DICE_UPDATE':
          setTimeLeft(message.timeLeft);
          setTimerPhase('dice');
          break;
        case 'TIMER_TURN_UPDATE':
          setTimeLeft(message.timeLeft);
          setTimerPhase('turn');
          break;
        case 'START':
          dispatch(setRoom(message.room));
          break;
        case 'END_TURN':
        case 'FORCE_END_TURN':
          dispatch(setRoom(message.room));
          fetchRequirements();
          break;
        case 'ROLL_DICE':
        case 'FORCE_ROLL_DICE': {
          console.log(message.room);
          dispatch(setRoom(message.room));
          const diceResult = message.room.ext.diceResult;
          setDice({
            firstRoll: diceResult.firstRoll,
            secondRoll: diceResult.secondRoll,
          });
          diceRollAudio.currentTime = 0;
          diceRollAudio.play().catch(() => {});
          fetchRequirements();
          break;
        }
        case 'NEW_TURN':
          setOwnedProperties((prev) => {
            const updated = {};
            for (const [pos, prop] of Object.entries(prev)) {
              if (prop.mortgage !== -1) {
                const newMortgage = prop.mortgage - 1;
                if (newMortgage <= 0) continue;
                updated[pos] = { ...prop, mortgage: newMortgage };
              } else {
                updated[pos] = prop;
              }
            }
            return updated;
          });
          break;
        case 'GAME_OVER':
          dispatch(setRoom(message.room));
          break;
        case 'TELEPORT':
        case 'CHEAT':
          dispatch(setRoom(message.room));
          fetchRequirements();
          break;
        case 'PROPERTY_BUY':
        case 'PROPERTY_UPGRADE':
        case 'PROPERTY_MORTGAGE':
        case 'PROPERTY_DEMOTE':
        case 'PROPERTY_BUYBACK':
        case 'RENT_PAY': {
          const { property, bonusUpdates, members } = message;
          if (members && members.length > 0) {
            dispatch(updateMembers(members));
          }
          setOwnedProperties((prev) => {
            const updated = property
              ? { ...prev, [property.position]: property }
              : { ...prev };
            if (bonusUpdates) {
              for (const p of bonusUpdates) {
                updated[p.position] = p;
              }
            }
            return updated;
          });
          fetchRequirements();
          break;
        }
        case 'PROJECT_CHOICE':
        case 'SCIENCE_PROJECT':
        case 'CONCERT': {
          const { members } = message;
          if (members && members.length > 0) {
            dispatch(updateMembers(members));
          }
          break;
        }
      }
    },
    [dispatch, fetchRequirements],
  );

  const onEventMessageReceived = useCallback((wsMessage) => {
    const { event, type } = JSON.parse(wsMessage.body);
    switch (type) {
      case 'ADD_EVENT':
        setEvents((prev) => [...prev, event]);
        break;
      case 'DELETE_EVENT':
        setEvents((prev) => prev.filter((e) => e.type !== event.type));
        break;
      case 'DELETE_ALL_EVENTS':
        setEvents([]);
        break;
    }
  }, []);

  useEffect(() => {
    const client = getStompClient();
    if (!client || !wsConnected) return;
    const subscriptions = [];

    const gameSubscription = client.subscribe(
      '/topic/games/' + reference,
      onGameMessageReceived,
    );
    subscriptions.push(gameSubscription);

    if (user) {
      const eventSubscription = client.subscribe(
        `/user/${user.username}/events`,
        onEventMessageReceived,
        {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      );
      subscriptions.push(eventSubscription);
    }

    return () => {
      subscriptions.forEach((sub) => sub.unsubscribe());
    };
  }, [
    onGameMessageReceived,
    onEventMessageReceived,
    reference,
    user,
    wsConnected,
  ]);

  useEffect(() => {
    dispatch(getPropertiesConfig());
    dispatch(getGameConfig());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRoom(reference));
  }, [dispatch, reference]);

  useEffect(() => {
    getPropertiesByRoom(reference).then((properties) => {
      const map = {};
      properties.forEach((p) => {
        map[p.position] = p;
      });
      setOwnedProperties(map);
    });
    fetchRequirements();
  }, [reference, fetchRequirements]);

  useEffect(() => {
    getMyEvents().then((fetchedEvents) => {
      setEvents(fetchedEvents);
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('game-html');
    return () => {
      document.documentElement.classList.remove('game-html');
    };
  }, []);

  if (!room) {
    return (
      <div className="loading">
        <p className="loading--message">Loading...</p>
      </div>
    ); // TODO: make translation
  }

  return (
    <div className="grid-3">
      <MemberList timeLeft={timeLeft} timerPhase={timerPhase} />
      <Board dice={dice} ownedProperties={ownedProperties} />
      <Actions
        events={events}
        ownedProperties={ownedProperties}
        propertyRequirements={propertyRequirements}
        timeLeft={timeLeft}
      />
      {room?.winner && (
        <GameWinnerDialog
          winner={room.winner}
          victoryType={room.victoryType}
          members={room.members}
        />
      )}
    </div>
  );
};

export default Game;
