import './Lobby.scss';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getAllRooms } from '../../http/requests/room.js';
import Lobby from './Lobby.jsx';
import CreateLobbyDialog from './CreateLobbyDialog.jsx';
import { getStompClient } from '../../store/slices/wsSlice.js';
import { useSelector } from 'react-redux';

const LobbyList = () => {
  const { t } = useTranslation();

  const wsConnected = useSelector((state) => state.ws.connected);

  const [rooms, setRooms] = useState(null);
  const [error, setError] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const onRoomMessageReceived = (wsMessage) => {
    const { room, type } = JSON.parse(wsMessage.body);
    switch (type) {
      case 'CREATE':
        setRooms((prevRooms) => [...prevRooms, room]);
        break;
      case 'JOIN':
      case 'LEAVE':
      case 'KICK':
        setRooms((prevRooms) =>
          prevRooms.map((r) => (r.reference === room.reference ? room : r)),
        );
        break;
      case 'DELETE':
        setRooms((prevRooms) =>
          prevRooms.filter((r) => r.reference !== room.reference),
        );
        break;
    }
  };

  useEffect(() => {
    getAllRooms()
      .then((data) => setRooms(data.rooms))
      .catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    const client = getStompClient();
    if (!client || !wsConnected) return;

    const subscription = client.subscribe(
      '/topic/rooms',
      onRoomMessageReceived,
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [wsConnected]);

  const openCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const displayLoading = () => {
    return (
      <>
        <div className="lobby__room lobby__room-load"></div>
        <div className="lobby__room lobby__room-load"></div>
      </>
    );
  };

  const displayNoRooms = () => {
    return (
      <div className="loading loading-home">
        <p className="loading--message">No rooms</p>
      </div>
    );
  };

  const displayError = () => {
    return (
      <div className="loading loading-home">
        <p className="loading--message">{error}</p>
      </div>
    );
  };

  const displayLobbies = () => {
    return rooms.map((room) => <Lobby key={room.reference} room={room} />);
  };

  return (
    <section className="lobby">
      <CreateLobbyDialog
        isOpened={isCreateDialogOpen}
        setIsOpened={setIsCreateDialogOpen}
      />
      <div className="lobby__title title-box">
        <p className="title-box__p">{t('lobby.lobbies')}</p>
        <button onClick={openCreateDialog} className="create-btn">
          {t('lobby.create')}
        </button>
      </div>
      <div className="lobby__area scroll">
        {rooms == null && !error && displayLoading()}
        {rooms && rooms.length === 0 && displayNoRooms()}
        {error && displayError()}

        {rooms && rooms.length > 0 && displayLobbies()}
      </div>
    </section>
  );
};
export default LobbyList;
