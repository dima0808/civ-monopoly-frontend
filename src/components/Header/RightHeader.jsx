import flagEng from '../../images/language_eng.jpg';
import flagUa from '../../images/language_ukr.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice.js';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const RightHeader = () => {
  const { user } = useSelector((state) => state.auth);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLanguageChange = () => {
    const newLang = i18n.language === 'en' ? 'ua' : 'en';
    const newPath = location.pathname.replace(
      `/${i18n.language}`,
      `/${newLang}`,
    );
    i18n.changeLanguage(newLang).then(() => navigate(newPath));
  };

  return (
    <ul className="header__ul">
      <li className="li__button">
        <button
          title={t('nav.language')}
          onClick={() => handleLanguageChange()}
          className="header-localization"
        >
          <img
            src={i18n.language === 'en' ? flagEng : flagUa}
            alt={i18n.language === 'en' ? 'English flag' : 'Ukrainian flag'}
            className="language-icon"
          />
        </button>
      </li>
      {!user && (
        <li>
          <Link to="/signin" className="header__anchor">
            {t('nav.login')}
          </Link>
        </li>
      )}
      {user && <li>{user.username}</li>}
      {user && (
        <li>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </li>
      )}
    </ul>
  );
};

export default RightHeader;
