import './SignInUp.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { registerUser } from '../../http/requests/auth.js';
import Cookies from 'js-cookie';
import { getMe } from '../../store/slices/authSlice.js';
import { useDispatch } from 'react-redux';

export default function SignUpPage() {
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
      .catch((e) => setError(e.message));
  };

  return (
    <main>
      <div className="authentication-section-fon gradiant-violet">
        <div className="authentication-section">
          <h1 className="authentication-h1">Sign Up</h1>
          <form className="authentication-form">
            <input
              ref={usernameRef}
              type="text"
              placeholder="Username"
              className="authentication-input"
              autoComplete="new-password"
            />
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="authentication-input"
              autoComplete="new-password"
            />
            <input
              ref={confirmPasswordRef}
              type="password"
              placeholder="Confirm Password"
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
              Already have an account? Sign In
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
}
