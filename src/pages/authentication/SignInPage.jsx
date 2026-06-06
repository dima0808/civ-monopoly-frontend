import { Link, useNavigate } from 'react-router-dom';
import './SignInUp.scss';
import SimpleHeader from '../../components/header/SimpleHeader.jsx';
import { useTranslation } from 'react-i18next';
import { loginUser } from '../../http/requests/auth.js';
import { useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { getMe } from '../../store/slices/authSlice.js';
import { useDispatch } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars-2';

const SignInPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [error, setError] = useState(null);

  const onSignIn = async (event) => {
    event.preventDefault();
    loginUser({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    })
      .then((data) => {
        Cookies.set('token', data.token);
        dispatch(getMe());
        navigate('/home');
      })
      .catch((e) =>
        setError(<p className="error-message-sign">{e.message}</p>),
      );
  };

  return (
    <Scrollbars style={{ height: '100vh' }}>
      <SimpleHeader />
      <main>
        <div className="authentication-section-fon gradiant-violet">
          <div className="authentication-section">
            <h1 className="authentication-h1">{t('authentication.signIn')}</h1>
            <form className="authentication-form">
              <input
                ref={usernameRef}
                type="text"
                placeholder={t('authentication.userName')}
                className="authentication-input"
              />
              <input
                ref={passwordRef}
                type="password"
                placeholder={t('authentication.password')}
                className="authentication-input"
              />
              {error && <p>{error}</p>} {/* TODO: better error display */}
              <button
                onClick={onSignIn}
                className="authentication-btn continue-button"
              >
                🠚
              </button>
              <Link to="/signup/" className="authentication-link">
                {t('authentication.alreadyHave')}
              </Link>
            </form>
          </div>
        </div>
      </main>
    </Scrollbars>
  );
};
export default SignInPage;
