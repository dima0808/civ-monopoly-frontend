import '../Chat.scss';
import { createPortal } from 'react-dom';
import Chat from './Chat.jsx';
import ContactList from './ContactList.jsx';
import { useState } from 'react';

const PrivateChatDialog = () => {
  const [openedChat, setOpenedChat] = useState(null);

  return createPortal(
    <dialog open className="chat-dialog">
      <ContactList openedChat={openedChat} setOpenedChat={setOpenedChat} />
      <Chat openedContact={openedChat} />
    </dialog>,
    document.getElementById('modal'),
  );
};

export default PrivateChatDialog;
