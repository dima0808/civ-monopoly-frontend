import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import RulesPage from './pages/RulesPage/RulesPage.jsx';
import SignInPage from './pages/authentication/SignInPage.jsx';
import SignUpPage from './pages/authentication/SignUpPage.jsx';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LANGUAGE, LANGUAGES } from './constants/lang.js';
import { useEffect, useState } from 'react';
import { getMe } from './store/slices/authSlice.js';
import { useDispatch } from 'react-redux';
import {
  connectWebSocket,
  disconnectWebSocket,
} from './store/slices/wsSlice.js';

const App = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());

    dispatch(connectWebSocket());
    return () => {
      dispatch(disconnectWebSocket());
    };
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={`/${i18n.language}/home`} replace />}
      />

      <Route path="/:lang" element={<LanguageValidator />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="rules" element={<RulesPage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="*" element={<div>404 Not Found</div>} /> // TODO: 404 page
      </Route>
    </Routes>
  );
};

const LanguageValidator = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  const [isLegalLang, setIsLegalLang] = useState(true);
  const isInternalLangValid = LANGUAGES.includes(i18n.language);

  useEffect(() => {
    if (!isInternalLangValid) {
      setIsLegalLang(false);
      i18n.changeLanguage(DEFAULT_LANGUAGE).then(() => {
        setIsLegalLang(true);
      });
    }
  }, [i18n.language]);

  if (!isLegalLang) {
    return <div>Loading...</div>; // TODO: better loading component
  }

  if (!LANGUAGES.includes(segments[0])) {
    return (
      <Navigate
        to={`/${!isInternalLangValid ? DEFAULT_LANGUAGE : i18n.language}/${segments.join('/')}`}
        replace
      />
    );
  }

  if (i18n.language !== segments[0]) {
    return (
      <Navigate
        to={`/${!isInternalLangValid ? DEFAULT_LANGUAGE : i18n.language}/${segments.slice(1).join('/')}`}
        replace
      />
    );
  }

  return <Outlet />;
};

export default App;
