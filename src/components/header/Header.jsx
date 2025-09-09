import './Header.scss';
import LeftHeader from './LeftHeader.jsx';
import RightHeader from './RightHeader.jsx';
import { useState, useEffect } from 'react';
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const closeMenu = () => {
    setClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setClosing(false);
    }, 350);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [menuOpen]);

  return (
    <header className={`header${menuOpen ? ' mobile-open' : ''}`}>
      <div className="header--flex">
        <div className={`opened-menu${closing ? ' closing' : ''}`}>
          <LeftHeader />
          <RightHeader />
        </div>
        {!menuOpen && (
          <button
            className="burger-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Відкрити меню"
          >
            <span />
            <span />
            <span />
          </button>
        )}
        {menuOpen && (
          <button
            className="close-btn"
            onClick={closeMenu}
            aria-label="Закрити меню"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="close-btn-svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
