import './Header.scss';
import LeftHeader from './LeftHeader.jsx';
import RightHeader from './RightHeader.jsx';

const Header = () => {
  return (
    <header className="header">
      <div className="header-flex">
        <div className="opened-menu">
          <LeftHeader />
          <RightHeader />
        </div>
      </div>
    </header>
  );
};

export default Header;
