import '../styles.css';
import { Link } from 'react-router-dom';

export default function Message({ nickname, children }) {
  return (
    <p className="chat__element">
      <Link
        to={`/profile/${nickname}`}
        className="chat__element chat__element-username"
      >
        {nickname}:
      </Link>
      {children}
    </p>
  );
}
