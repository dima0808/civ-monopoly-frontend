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
import { getRoom, setRoom } from '../../store/slices/roomSlice.js';
import { getStompClient } from '../../store/slices/wsSlice.js';
import Actions from '../../components/game/actions/Actions.jsx';
import Dice from '../../components/game/board/dice/Dice.jsx';
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

  const onGameMessageReceived = useCallback(
    (wsMessage) => {
      const { room: updatedRoom, type } = JSON.parse(wsMessage.body);
      switch (type) {
        case 'START':
          dispatch(setRoom(updatedRoom));
          break;
        case 'END_TURN':
        case 'FORCE_END_TURN':
          dispatch(setRoom(updatedRoom));
          break;
        case 'ROLL_DICE':
        case 'FORCE_ROLL_DICE': {
          dispatch(setRoom(updatedRoom));
          const diceResult = updatedRoom.ext.diceResult;
          setDice({
            firstRoll: diceResult.firstRoll,
            secondRoll: diceResult.secondRoll,
          });
          diceRollAudio.currentTime = 0;
          diceRollAudio.play().catch(() => {});
          break;
        }
      }
    },
    [dispatch],
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
      <MemberList />
      <Board dice={dice} />
      <Actions events={events} />
    </div>
  );
};

export default Game;
