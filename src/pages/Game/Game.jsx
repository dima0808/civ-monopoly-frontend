import './Game.scss';

import Board from '../../components/game/board/Board.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertiesConfig } from '../../store/slices/configSlice.js';
import { useParams } from 'react-router-dom';
import MemberList from '../../components/game/members/MemberList.jsx';
import { getRoom } from '../../store/slices/gameSlice.js';

const Game = () => {
  const dispatch = useDispatch();
  const { reference } = useParams();
  const { room } = useSelector((state) => state.game);

  useEffect(() => {
    dispatch(getPropertiesConfig());
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
    </div>
  );
};

export default Game;
