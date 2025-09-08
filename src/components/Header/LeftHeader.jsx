import { Link } from 'react-router-dom';
import civkaLogoImg from '../../images/civka-logo.png';
import { useTranslation } from 'react-i18next';

const LeftHeader = () => {
  const { t } = useTranslation();

  return (
    <ul className="header__ul">
      <li>
        <Link to="/home" className="header__anchor-img li__logo">
          <img src={civkaLogoImg} alt="civ-logo" className="header-img" />
        </Link>
      </li>
      <li>
        <Link to="/rules" className="header__anchor">
          {t('nav.rules')}
        </Link>
      </li>
    </ul>
  );
};

export default LeftHeader;
