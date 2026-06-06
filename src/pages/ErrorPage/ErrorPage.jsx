import './ErrorPage.scss';
import Header from '../../components/header/Header.jsx';
import { Scrollbars } from 'react-custom-scrollbars-2';
const ErrorPage = () => {
  return (
    <Scrollbars style={{ height: '100vh' }}>
      <Header />
      <main>
        <div className="flex-center not-found-div">
          <h1>404</h1>
          <p>"Landing on the wrong page"</p>
          {/*<h1>403</h1>*/}
          {/*<p>You don't have permission to access this resource</p>*/}
        </div>
      </main>
    </Scrollbars>
  );
};

export default ErrorPage;
