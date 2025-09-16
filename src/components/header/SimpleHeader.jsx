import './Header.scss';
import { Link } from 'react-router-dom';
import civkaLogoImg from '../../images/civka-logo.png';
const SimpleHeader = () => {
  return (
    <header className={`header header--simple`}>
      <div className="header--flex">
        <ul className="header__ul">
          <li>
            <Link to="/home" className="header__anchor-img li__logo">
              <img src={civkaLogoImg} alt="civ-logo" className="header-img" />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default SimpleHeader;
