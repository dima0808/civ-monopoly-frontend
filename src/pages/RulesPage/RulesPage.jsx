import './RulesPage.scss';

import rules21Img from '../../images/rules21.png';
import rules22Img from '../../images/rules22.png';
import rules24Img from '../../images/rules24.png';
import rules25Img from '../../images/rules25.png';
import rules26Img from '../../images/rules26.png';
import Header from '../../components/header/Header.jsx';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';

const RulesPage = () => {
  const { t } = useTranslation();
  return (
    <Scrollbars style={{ height: '100vh' }}>
      <Header />
      <main>
        <div className=" ">
          <div className="section-rules">
            <div className="basics">
              <h1 className="rules-h1"> {t('rulesPage.mainRulesH')}</h1>

              <p className="rules-p">{t('rulesPage.mainRulesP1')}</p>
              <p className="rules-p">{t('rulesPage.mainRulesP2')}</p>

              <p className="rules-p">{t('rulesPage.mainRulesP3')}</p>
              <div className="float-right light-yellow-div">
                <img
                  src={rules21Img}
                  className="img21 no-select-img"
                  alt="goldPerTurn"
                />
              </div>
              <div className="float-right">
                <img
                  src={rules22Img}
                  className="img22 no-select-img"
                  alt="goldPerTurn"
                />
              </div>
              <p className="rules-p">{t('rulesPage.mainRulesP4')}</p>
              <p className="rules-p">{t('rulesPage.mainRulesP5')}</p>
              <div className="margin-mid-div">
                <img
                  src={rules24Img}
                  className="img24 no-select-img"
                  alt="goldPerTurn"
                />
              </div>

              <p className="rules-p">{t('rulesPage.mainRulesP6')}</p>
              <p className="rules-p">{t('rulesPage.mainRulesP7')}</p>
              <p className="rules-p"></p>
            </div>
            <div className="rules-details">
              <h1 className="rules-h1">{t('rulesPage.rulesDetailsH')}</h1>
              <div className="float-right">
                <img
                  src={rules25Img}
                  className="img25 no-select-img"
                  alt="goldPerTurn"
                />
              </div>
              <p className="rules-p">
                <span>{t('rulesPage.cell')}</span>{' '}
                {t('rulesPage.rulesDetailsP1')}
              </p>
              <p className="rules-p">{t('rulesPage.rulesDetailsP2')}</p>
              <div className="float-right">
                <img
                  src={rules26Img}
                  className="img26 no-select-img"
                  alt="goldPerTurn"
                />
              </div>
              <p className="rules-p">{t('rulesPage.rulesDetailsP3')}</p>
              <p className="rules-p pt-4">{t('rulesPage.rulesDetailsP4')}</p>
              <p className="rules-p">{t('rulesPage.rulesDetailsP5')}</p>
              <p className="rules-p">{t('rulesPage.rulesDetailsP6')}</p>
              <div className="float-right">
                <img
                  src={rules22Img}
                  className="img22-war no-select-img"
                  alt="goldPerTurn"
                />
              </div>
              <p className="rules-p">
                <span>{t('rulesPage.war')}</span>{' '}
                {t('rulesPage.rulesDetailsP7')}
              </p>
              <p className="rules-p">{t('rulesPage.rulesDetailsP8')}</p>
              <p className="rules-p">{t('rulesPage.rulesDetailsP9')}</p>
              <p className="rules-p">
                <span>{t('rulesPage.union')}</span>{' '}
                {t('rulesPage.rulesDetailsP10')}
              </p>
              <div className="float-right ">
                <img
                  src={rules21Img}
                  className="img21-gpt no-select-img"
                  alt="goldPerTurn"
                />
              </div>
              <p className="rules-p">
                <span>{t('rulesPage.goldPerTurn')}</span>{' '}
                {t('rulesPage.rulesDetailsP11')}
              </p>
            </div>
          </div>
        </div>
      </main>
    </Scrollbars>
  );
};

export default RulesPage;
