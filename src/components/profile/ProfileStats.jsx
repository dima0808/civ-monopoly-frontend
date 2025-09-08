import './styles.css';
import rankIron from '../../images/Rank_Iron.png';
import viewImg from '../../images/view-icon.png';
import { Link } from 'react-router-dom';

const ProfileStats = () => {
  return (
    <div className="profile-right-top">
      <div className="profile-right-top-flex">
        <div className="profile-statuses">
          <h1 className="profile-right-top-h1">Nickname</h1>

          <div className="in-game-div">
            <p className="in-game-p">In game</p>
            <Link to="/game/sample-game" className="view-img-btn">
              <img src={viewImg} alt="viewImg" className="view-img" />
            </Link>
          </div>

          <div className="flex-ranked">
            <img src={rankIron} className="ranked-img" alt="unkownImg" />
            <p className="flex-ranked-p">1200</p>
          </div>
        </div>

        <div className="profile-right-top-flex-btns">
          <button className="update-profile-btn profile-btn">
            Write a Message
          </button>
          <div className="profile-right-top-btns">
            <div className="profile-statistic">
              <p className="profile-statistic-circle">50</p>
              <p className="profile-statistic-p">Matches</p>
            </div>
            <div className="profile-statistic">
              <p className="profile-statistic-circle">30</p>
              <p className="profile-statistic-p">Wins</p>
            </div>
            <div className="profile-statistic">
              <p className="profile-statistic-circle">2.5</p>
              <p className="profile-statistic-p">Average</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileStats;
