import './Game.scss';

import Board from '../../components/game/board/Board.jsx';
import { useCallback, useEffect } from 'react';
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

const Game = () => {
  const dispatch = useDispatch();
  const { reference } = useParams();
  const { room } = useSelector((state) => state.room);
  const wsConnected = useSelector((state) => state.ws.connected);

  const onGameMessageReceived = useCallback(
    (wsMessage) => {
      const { room: updatedRoom, type } = JSON.parse(wsMessage.body);
      switch (type) {
        case 'START':
          dispatch(setRoom(updatedRoom));
          break;
        case 'END_TURN':
        case 'FORCE_END_TURN':
        case 'ROLL_DICE':
        case 'FORCE_ROLL_DICE':
          dispatch(setRoom(updatedRoom));
          break;
      }
    },
    [dispatch],
  );

  useEffect(() => {
    const client = getStompClient();
    if (!client || !wsConnected) return;

    const subscription = client.subscribe(
      '/topic/games/' + reference,
      onGameMessageReceived,
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [onGameMessageReceived, reference, wsConnected]);

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
      <Board />
      <Actions />
    </div>
  );
};

export default Game;
