import './SignInUp.scss';
import { Link, useNavigate } from 'react-router-dom';
import SimpleHeader from '../../components/header/SimpleHeader.jsx';
import { useRef, useState } from 'react';
import { registerUser } from '../../http/requests/auth.js';
import Cookies from 'js-cookie';
import { getMe } from '../../store/slices/authSlice.js';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars-2';

const SignUpPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [error, setError] = useState(null);

  const onSignUp = async (event) => {
    event.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError('Passwords do not match');
      return;
    }

    registerUser({
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
            <h1 className="authentication-h1">{t('authentication.signUp')}</h1>
            <form className="authentication-form">
              <input
                ref={usernameRef}
                type="text"
                placeholder={t('authentication.userName')}
                className="authentication-input"
                autoComplete="new-password"
              />
              <input
                ref={passwordRef}
                type="password"
                placeholder={t('authentication.password')}
                className="authentication-input"
                autoComplete="new-password"
              />
              <input
                ref={confirmPasswordRef}
                type="password"
                placeholder={t('authentication.confirmPassword')}
                className="authentication-input"
                autoComplete="new-password"
              />
              {error && <p>{error}</p>} {/* TODO: better error display */}
              <button
                onClick={onSignUp}
                className="authentication-btn continue-button"
              >
                🠚
              </button>
              <Link to="/signin" className="authentication-link">
                {t('authentication.alreadyHave')}
              </Link>
            </form>
          </div>
        </div>
      </main>
    </Scrollbars>
  );
};

export default SignUpPage;
