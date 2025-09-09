import flagEng from '../../images/language_eng.jpg';
import flagUa from '../../images/language_ukr.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice.js';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toggleChat } from '../../store/slices/chatSlice.js';

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
          <button
            className="header__anchor li__logo-2 close-btn-leave"
            onClick={() => dispatch(logout())}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="header-svg-exit"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
          </button>
        </li>
      )}
      {user && (
        <li>
          <button onClick={() => dispatch(toggleChat())}>chat</button>
        </li>
      )}
    </ul>
  );
};

export default RightHeader;
