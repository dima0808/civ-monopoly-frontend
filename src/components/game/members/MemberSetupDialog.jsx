import './MemberList.scss';

import MemberChooseColor from './MemberChooseColor.jsx';
import LeaderInformation from './LeaderInformation.jsx';
import { createPortal } from 'react-dom';
import MemberChooseLeader from './MemberChooseLeader.jsx';

const MemberSetupDialog = ({ member, setIsOpened }) => {
  return createPortal(
    <dialog open className="member-setup">
      <MemberChooseLeader member={member} />

      <div className="member-setup--div">
        <button
          onClick={() => setIsOpened(false)}
          className="member-setup--btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="kick-svg2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <MemberChooseColor member={member} />
        <LeaderInformation />
      </div>
    </dialog>,
    document.getElementById('modal'),
  );
};

export default MemberSetupDialog;
