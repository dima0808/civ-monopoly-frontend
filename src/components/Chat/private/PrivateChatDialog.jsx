import '../Chat.scss';
import { createPortal } from 'react-dom';
import Chat from './Chat.jsx';
import ContactList from './ContactList.jsx';

const PrivateChatDialog = () => {
  return createPortal(
    <dialog open className="chat-dialog">
      <ContactList />
      <Chat />
    </dialog>,
    document.getElementById('modal'),
  );
};

export default PrivateChatDialog;
