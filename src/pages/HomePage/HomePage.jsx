import './HomePage.scss';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Header from '../../components/header/Header.jsx';
import Chat from '../../components/Chat/public/Chat.jsx';
import dog from '../../images/icon_unit_scout.png';
import { useTranslation } from 'react-i18next';
import LobbyList from '../../components/lobby/LobbyList.jsx';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <Scrollbars style={{ height: '100vh' }}>
      <Header />
      <main>
        <div className="home__padding__top">
          <section className="section__preview">
            <div className="contrasting__element">
              <h1 className="section__preview-h1">Civ Monopoly</h1>
              <p className="section__preview-p">{t('homePage.aboutGame')}</p>
            </div>
            <div className="dog__div">
              <img className="dog__design" src={dog} alt="dog" />
            </div>
          </section>
        </div>

        <section className="section section-grid">
          <LobbyList />
          <Chat />
        </section>
      </main>
    </Scrollbars>
  );
};

export default HomePage;
